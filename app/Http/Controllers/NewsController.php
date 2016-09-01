<?php

namespace App\Http\Controllers;

use App\Http\Traits\GeneratesShortcodes;
use App\News;
use App\Http\Requests;
use App\Shortcode;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;
use Parsedown;
use TOC;
use Illuminate\Http\Request;

/**
 * Class NewsController
 * @package App\Http\Controllers
 */
class NewsController extends Controller
{
    use GeneratesShortcodes;

    /**
     * @return mixed
     */
    public function index()
    {
        //$featured = News::where('type', 'feature')->take(3)->get();
        $featured = News::take(3)->where('featured', true)->get();
        return view('news.index', compact('featured'));
    }

    /**
     * @return mixed
     */
    public function feed()
    {
        // create new feed
        $feed = App::make("feed");

        $feed->setCache(60, 'feedNewsKey');

        // check if there is cached feed and build new only if is not
        if (!$feed->isCached())
        {
            // creating rss feed with our most recent 20 records in news table
            $news = News::orderBy('created_at', 'desc')->take(30)->get();

            // set your feed's title, description, link, pubdate and language
            $feed->title = 'Paragon.gg News Feed';
            $feed->description = 'All of the latest news directly from Paragon.gg';
            $feed->logo = 'https://pbs.twimg.com/profile_images/755362733990764545/bTF9fM2R.jpg';
            $feed->link = url('news/feed');
            $feed->setDateFormat('datetime'); // 'datetime', 'timestamp' or 'carbon'
            $feed->pubdate = $news->first()->created_at; // date of latest news
            $feed->lang = 'en';
            $feed->setShortening(true); // true or false
            $feed->setTextLimit(100); // maximum length of description text

            foreach ($news as $n)
            {
                // set item's title, author, url, pubdate, description and content
                $feed->add($n->title, $n->author->username, url($n->slug), $n->created_at, substr($n->body,0,100), $n->body);
            }

        }

        // return your feed ('atom' or 'rss' format)
        if(isset($_GET['type'])) {
            if($_GET['type'] == 'atom') {
                return $feed->render('atom');
            }

            if($_GET['type'] == 'rss') {
                return $feed->render('rss');
            }
        }
        return $feed->render('rss');

    }

    /**
     * @return mixed
     */
    public function create()
    {
        return view('news.create');
    }

    /**
     * @param Requests\News\CreateNewsRequest $request
     * @return mixed
     */
    public function store(Requests\News\CreateNewsRequest $request)
    {
        $storage = Storage::disk('s3');

        $news = new News();
        $news->user_id = auth()->user()->id;
        $news->title  = $request->title;
        if($request->has('slug')) {
            $news->slug   = $request->slug;
        } else {
            $news->slug   = createSlug($news->title);
        }
        if($request->has('source')) {
            $news->source = $request->source;
        }
        $news->type   = $request->type;
        $news->body   = $request->body;
        if(isset($_POST['draft'])) {
            $news->status = 'draft';
        }

        // HEADER TO S3
        $image = $request->file('header');
        $filename = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
        $path = uniqid(base64_encode($filename).'-',false).'.'.$image->getClientOriginalExtension();
        $storage->getDriver()->put('images/news/headers/'.$path, fopen($image, 'r+'));
        $news->header = $path;

        // THUMBNAIL TO S3
        $image = $request->file('thumbnail');
        $filename = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
        $path = uniqid(base64_encode($filename).'-',false).'.'.$image->getClientOriginalExtension();
        $storage->getDriver()->put('images/news/thumbnails/'.$path, fopen($image, 'r+'));
        $news->thumbnail = $path;

        // IMPACT TO S3
        if($request->hasFile('impact')) {
            $image = $request->file('impact');
            $filename = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
            $path = uniqid(base64_encode($filename).'-',false).'.'.$image->getClientOriginalExtension();
            $storage->getDriver()->put('images/news/impact/'.$path, fopen($image, 'r+'));
            $news->impact = $path;
        }

        $news->save();

        $this->generate('/news/'.$news->id.'/'.$news->slug, 'news', $news->id);

        session()->flash('notification', 'success|News saved.');
        return redirect('/news/'.$news->id.'/'.$news->slug);
    }

    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function show(Request $request, $id)
    {
        $article = News::findOrFail($id);
        $thread = findOrCreateThread($request->path());

        $articleBody = (new Parsedown())->text($article->body);
        $articleBody = (new TOC\MarkupFixer())->fix($articleBody);
        $articleTOC  = (new TOC\TocGenerator())->getHtmlMenu($articleBody,2);

        $recent  = News::where('id', '!=', $id)->take('10')->get();

        $shortcode = Shortcode::where('resource_type', 'news')->where('resource_id', $id)->first();

        return view('news.show', compact('article', 'articleBody', 'articleTOC', 'recent', 'thread', 'shortcode'));
    }

    /**
     * @param $id
     * @return mixed
     */
    public function edit($id)
    {
        $news = News::findOrFail($id);
        return view('news.edit', compact('news'));
    }

    /**
     * @param $id
     * @param Requests\News\UpdateNewsRequest $request
     * @return mixed
     */
    public function update($id, Requests\News\UpdateNewsRequest $request)
    {
        $storage = Storage::disk('s3');

        $news = News::findOrFail($id);
        $news->title  = $request->title;
        $news->slug   = $request->slug;
        $news->type   = $request->type;
        $news->body   = $request->body;
        if(isset($_POST['draft'])) {
            $news->status = 'draft';
        } else {
            $news->status = 'published';
        }

        if($request->has('header')) {
            // HEADER TO S3
            $image = $request->file('header');
            $filename = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
            $path = uniqid(base64_encode($filename).'-',false).'.'.$image->getClientOriginalExtension();
            $storage->getDriver()->put('images/news/headers/'.$path, fopen($image, 'r+'));
            $news->header = $path;
        }

        if($request->has('thumbnail')) {
            // THUMBNAIL TO S3
            $image = $request->file('thumbnail');
            $filename = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
            $path = uniqid(base64_encode($filename) . '-', false) . '.' . $image->getClientOriginalExtension();
            $storage->getDriver()->put('images/news/thumbnails/' . $path, fopen($image, 'r+'));
            $news->thumbnail = $path;
        }

        if($request->hasFile('impact')) {
            // IMPACT TO S3
            $image = $request->file('impact');
            $filename = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
            $path = uniqid(base64_encode($filename).'-',false).'.'.$image->getClientOriginalExtension();
            $storage->getDriver()->put('images/news/impact/'.$path, fopen($image, 'r+'));
            $news->impact = $path;
        }

        if($request->has('source')) {
            $news->source = $request->source;
        }

        $news->save();

        session()->flash('notification', 'success|News updated.');
        return view('news.edit', compact('news'));
    }

    /**
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        $news = News::findOrFail($id);
        $news->delete();
        session()->flash('notification', 'success|Post deleted successfully.');
        return redirect()->back();
    }
}
