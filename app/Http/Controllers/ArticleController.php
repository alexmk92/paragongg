<?php

namespace App\Http\Controllers;

use App\Article;
use App\Http\Requests;

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
    public function show($slug)
    {
        $article = Article::where('slug', $slug)->firstOrFail();
        return view('articles.show')->with('article', $article);
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
