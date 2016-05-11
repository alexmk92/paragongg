<?php

namespace App\Http\Controllers;

use App\Article;
use App\Http\Requests;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    // Create
    public function index()
    {
        $articles = Article::all();

        return view('articles.index')->with('articles', $articles);
    }

    // Create
    public function create()
    {
        return view('articles.create');
    }

    // Store
    public function store()
    {
        // Store item
        return view('articles.create');
    }

    // Read
    public function show(Request $request, $slug)
    {
        $article = Article::where('slug', $slug)->firstOrFail();

        $thread = findOrCreateThread($request->path());
        $comments = $thread->comments;

        $recent  = Article::where('slug', '!=', $slug)->take('10')->get();
        return view('articles.show')->with('article', $article)->with('recent', $recent)->with('comments', $comments);
    }

    // Edit
    public function edit($id)
    {
        $article = Article::findOrFail($id);
        return view('articles.edit')->with('article', $article);
    }

    // Update
    public function update($id)
    {
        $article = Article::findOrFail($id);
        return view('articles.edit')->with('article', $article);
    }

    // Delete
    public function delete($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        return view('home');
    }
}
