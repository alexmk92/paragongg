<?php

namespace App\Http\Controllers;

use App\News;
use App\Http\Requests;
use Illuminate\Support\Facades\Storage;
use Parsedown;
use TOC;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    // Create
    public function index()
    {
        return view('news.index');
    }

    // Create
    public function create()
    {
        return view('news.create');
    }

    // Store
    public function store(Requests\News\CreateNewsRequest $request)
    {
        $storage = Storage::disk('s3');

        $news = new News();
        $news->user_id = auth()->user()->id;
        $news->title  = $request->title;
        $news->slug   = $request->slug;
        $news->type   = $request->type;
        $news->header = $request->title;
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

        $news->save();

        session()->flash('notification', 'success|News saved.');
        return view('news.create');
    }

    // Read
    public function show(Request $request, $slug)
    {
        $news = News::where('slug', $slug)->firstOrFail();
        $thread = findOrCreateThread($request->path());
        $comments = $thread->comments;

        $articleBody = (new Parsedown())->text($news->body);
        $articleBody = (new TOC\MarkupFixer())->fix($articleBody);
        $articleTOC  = (new TOC\TocGenerator())->getHtmlMenu($articleBody,2);

        $recent  = News::where('slug', '!=', $slug)->take('10')->get();
        return view('news.show')->with('news', $news)
            ->with('articleBody', $articleBody)
            ->with('articleTOC', $articleTOC)
            ->with('recent', $recent)
            ->with('comments', $comments);
    }

    // Edit
    public function edit($id)
    {
        $news = News::findOrFail($id);
        return view('news.edit')->with('news', $news);
    }

    // Update
    public function update($id)
    {
        $news = News::findOrFail($id);
        return view('news.edit')->with('news', $news);
    }

    // Delete
    public function delete($id)
    {
        $news = News::findOrFail($id);
        $news->delete();
        return view('home');
    }
}
