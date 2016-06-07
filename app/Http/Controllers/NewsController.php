<?php

namespace App\Http\Controllers;

use App\Article;
use App\Http\Requests;
use Parsedown;
use TOC;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    // Create
    public function index()
    {
        $articles = Article::all();

        return view('news.index')->with('news', $articles);
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
        $article = Article::where('slug', $slug)->firstOrFail();
        $thread = findOrCreateThread($request->path());
        $comments = $thread->comments;


        $articleBody = (new Parsedown())->text($article->body);
        $articleBody = (new TOC\MarkupFixer())->fix($articleBody);
        $articleTOC  = (new TOC\TocGenerator())->getHtmlMenu($articleBody,2);

        $recent  = Article::where('slug', '!=', $slug)->take('10')->get();
        return view('news.show')->with('article', $article)
            ->with('articleBody', $articleBody)
            ->with('articleTOC', $articleTOC)
            ->with('recent', $recent)
            ->with('comments', $comments);
    }

    // Edit
    public function edit($id)
    {
        $article = Article::findOrFail($id);
        return view('news.edit')->with('article', $article);
    }

    // Update
    public function update($id)
    {
        $article = Article::findOrFail($id);
        return view('news.edit')->with('article', $article);
    }

    // Delete
    public function delete($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        return view('home');
    }
}
