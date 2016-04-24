<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('home');
});

Route::auth();

Route::get('/home', 'HomeController@index');

/* NEWS */

Route::get('/news', 'ArticleController@index');
Route::get('/news/create', 'ArticleController@create'); // Admin
Route::post('/news/create', 'ArticleController@store'); // Admin
Route::get('/news/edit/{id}', 'ArticleController@edit'); // Admin
Route::post('/news/edit/{id}', 'ArticleController@update'); // Admin
Route::get('/news/delete/{id}', 'ArticleController@delete'); // Admin
Route::get('/news/{slug}', 'ArticleController@show');

/* USERS */

Route::get('/users/{username}', 'UserController@show');

/* PLAYERS */

Route::get('/players', 'PlayerController@index');
Route::get('/players/top', 'PlayerController@top');
Route::get('/players/{username}', 'PlayerController@show');

/* GAMES */

Route::get('/games', 'GameController@index');
Route::get('/games/id', 'GameController@show');

/* DECKS */

Route::get('/decks', 'DeckController@index');
Route::post('/decks/create', 'DeckController@store');
Route::get('/decks/edit/{id}', 'DeckController@edit');
Route::post('/decks/edit/{id}', 'DeckController@update');
Route::get('/decks/delete/{id}', 'DeckController@delete');
Route::get('/decks/{slug}', 'DeckController@index');

/* GUIDES */

Route::get('/guides', 'GuideController@index');
Route::post('/guides/create', 'GuideController@store');
Route::get('/guides/edit/{id}', 'GuideController@edit');
Route::post('/guides/edit/{id}', 'GuideController@update');
Route::get('/guides/delete/{id}', 'GuideController@delete');
Route::get('/guides/{slug}', 'GuideController@index');