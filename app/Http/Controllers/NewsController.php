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
    // Index
    public function index()
    {
        //$featured = News::where('type', 'feature')->take(3)->get();
        $featured = News::take(3)->get();
        return view('news.index')->with('featured', $featured);
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

        session()->flash('notification', 'success|News saved.');
        return view('news.create');
    }

    // Read
    public function show(Request $request, $id)
    {
        $news = News::findOrFail($id);
        $thread = findOrCreateThread($request->path());
        $comments = $thread->comments;

        $articleBody = (new Parsedown())->text($news->body);
        $articleBody = (new TOC\MarkupFixer())->fix($articleBody);
        $articleTOC  = (new TOC\TocGenerator())->getHtmlMenu($articleBody,2);

        $recent  = News::where('id', '!=', $id)->take('10')->get();
        return view('news.show')->with('news', $news)
            ->with('articleBody', $articleBody)
            ->with('articleTOC', $articleTOC)
            ->with('recent', $recent)
            ->with('comments', $comments)
            ->with('threadId', $thread->id);
    }

    // Edit
    public function edit($id)
    {
        $news = News::findOrFail($id);
        return view('news.edit')->with('news', $news);
    }

    // Update
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

        $news->save();

        session()->flash('notification', 'success|News updated.');
        return view('news.edit')->with('news', $news);
    }

    // Delete
    public function delete($id)
    {
        $news = News::findOrFail($id);
        $news->delete();
        session()->flash('notification', 'success|Post deleted successfully.');
        return redirect()->back();
    }
}
