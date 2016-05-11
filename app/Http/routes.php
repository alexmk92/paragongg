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
Route::get('/auth', 'Auth\OauthController@accountLink');
Route::get('/updateCards', 'CardController@updateCards');
Route::get('/apikey', function(){ return APIToken(); });

/* STATIC */
Route::get('/terms',   function(){ return view('static.terms');   });
Route::get('/privacy', function(){ return view('static.privacy'); });

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
Route::get('/cards', 'CardController@index');
Route::get('/cards/create', 'CardController@create');
Route::post('/cards/create', 'CardController@store');
Route::get('/cards/edit/{id}', 'CardController@edit');
Route::post('/cards/edit/{id}', 'CardController@update');
Route::get('/cards/delete/{id}', 'CardController@delete');
Route::get('/cards/{slug}', 'CardController@show');

/* DECKS */
Route::get('/decks', 'DeckController@index');
Route::get('/decks/create', 'DeckController@create');
Route::post('/decks/create', 'DeckController@store');
Route::get('/decks/edit/{id}', 'DeckController@edit');
Route::post('/decks/edit/{id}', 'DeckController@update');
Route::get('/decks/delete/{id}', 'DeckController@delete');
Route::get('/decks/{slug}', 'DeckController@show');

/* GUIDES */
Route::get('/guides', 'GuideController@index');
Route::get('/guides/create', 'GuideController@create');
Route::post('/guides/create', 'GuideController@store');
Route::get('/guides/edit/{id}', 'GuideController@edit');
Route::post('/guides/edit/{id}', 'GuideController@update');
Route::get('/guides/delete/{id}', 'GuideController@delete');
Route::get('/guides/{slug}', 'GuideController@show');


/* GUIDES */
Route::get('/account', 'AccountController@index');
Route::get('/account/profile', 'AccountController@editProfile');
Route::get('/account/link', 'AccountController@linkAccount');
Route::post('/account/profile', 'AccountController@updateProfile');
Route::get('/account/password', 'AccountController@editPassword');
Route::post('/account/password', 'AccountController@updatePassword');
Route::get('/account/guides', 'AccountController@guides');
Route::get('/account/decks', 'AccountController@decks');

/* API */
Route::group(['prefix' => 'api', 'namespace' => 'API', 'middleware' => 'cors'], function () {
    Route::post('/v1/comments/store', 'CommentController@store');
    Route::get('/v1/cards/find/{id}', 'CardController@show');
});
