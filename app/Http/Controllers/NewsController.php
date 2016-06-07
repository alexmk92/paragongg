<?php

namespace App\Http\Controllers;

use App\News;
use App\Http\Requests;
use Parsedown;
use TOC;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    // Create
    public function index()
    {
        $news = News::all();

        return view('news.index')->with('news', $news);
    }

    // Create
    public function create()
    {
        return view('news.create');
    }

    // Store
    public function store()
    {
        // Store item
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

        $recent  = Article::where('slug', '!=', $slug)->take('10')->get();
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
