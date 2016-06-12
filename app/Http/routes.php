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

//Route::get('/home', 'HomeController@index');
Route::get('/auth', 'Auth\OauthController@accountLink')->middleware('auth');;

/* STATIC */
Route::get('/terms',   function(){ return view('static.terms');   });
Route::get('/privacy', function(){ return view('static.privacy'); });

/* NEWS */
Route::get('/news', 'NewsController@index');
Route::get('/news/create', 'NewsController@create')->middleware('mod');
Route::post('/news/create', 'NewsController@store')->middleware('mod');
Route::get('/news/edit/{id}', 'NewsController@edit')->middleware('mod');
Route::post('/news/edit/{id}', 'NewsController@update')->middleware('mod');
Route::get('/news/delete/{id}', 'NewsController@delete')->middleware('mod');
Route::get('/news/{slug}', 'NewsController@show');

/* USERS */
Route::get('/users/{username}', 'UserController@show');

/* PLAYERS */
Route::get('/players', 'PlayerController@index');
Route::get('/players/top', 'PlayerController@top');
Route::get('/players/{username}', 'PlayerController@show');

/* GAMES */
Route::get('/games', 'GameController@index');
Route::get('/games/id', 'GameController@show');

/* CARDS */
Route::get('/cards', 'CardController@index');
Route::get('/cards/edit/{slug}', 'CardController@edit');
Route::post('/cards/edit/{slug}', 'CardController@update');
Route::get('/cards/delete/{slug}', 'CardController@delete');
Route::get('/cards/{slug}', 'CardController@show');

/* HEROES */
Route::get('/heroes', 'HeroController@index');
Route::get('/heroes/{slug}', 'HeroController@show');

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

/* Account */
Route::group(['prefix' => 'account', 'middleware' => 'auth'], function () {
    Route::get('/', 'AccountController@index');
    Route::get('/profile', 'AccountController@editProfile');
    Route::get('/link', 'AccountController@linkAccount');
    Route::post('/profile', 'AccountController@updateProfile');
    Route::get('/password', 'AccountController@editPassword');
    Route::post('/password', 'AccountController@updatePassword');
    Route::get('/guides', 'AccountController@guides');
    Route::get('/decks', 'AccountController@decks');
});

/* Moderation */
Route::group(['prefix' => 'moderation', 'namespace' => 'Moderation', 'middleware' => ['auth', 'mod']], function () {
    Route::get('/', 'ModerationController@index');
    Route::get('/news', 'ModerationController@news');
    Route::get('/cards', 'ModerationController@cards');
    Route::get('/reports', 'ModerationController@reports');
});

/* Administration */
Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => ['auth', 'admin', 'cors']], function () {
    Route::get('/', 'AdminController@index');
    Route::get('/jobs', 'AdminController@jobs');
    Route::get('/maintenance', 'MaintenanceController@index');
    Route::get('/maintenance/update-cards', 'MaintenanceController@updateCards');
    Route::get('/maintenance/update-heroes', 'MaintenanceController@updateHeroes');

    Route::get('/api/jobs', 'AdminController@getJobs');
});

/* API */
Route::group(['prefix' => 'api', 'namespace' => 'API', 'middleware' => 'cors'], function () {
    Route::get('/v1/comments/thread/{id}', 'CommentController@thread');
    Route::post('/v1/comments/store', 'CommentController@store');
    Route::get('/v1/cards/find/{id}', 'CardController@show');
    Route::get('/v1/heroes/find/{id}', 'HeroController@show');
    Route::get('/v1/news', 'NewsController@index');
});
