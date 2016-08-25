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

use App\Jobs\CreatePlayers;

Route::get('/', 'HomeController@index');
Route::auth();
Route::get('/auth', 'Auth\OAuthController@linkAccount')->middleware('auth');

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
Route::get('/news/{id}/{slug?}', 'NewsController@show');

/* USERS */
Route::get('/users/{username}', 'UserController@show');

/* PLAYERS */
Route::get('/players/{username}', 'PlayerController@show')->middleware('admin');
Route::get('/players/psn/{username}', 'PlayerController@showPSN')->middleware('admin');
//Route::get('/players', 'PlayerController@index');
//Route::post('/players/search', 'PlayerController@search');
//Route::get('/players/top', 'PlayerController@top');
//Route::get('/players/{username}', 'PlayerController@show');

/* MATCHES */
Route::get('/tmatches/{id}', 'MatchController@show')->middleware('admin');

/* GAMES */
//Route::get('/games', 'GameController@index');
//Route::get('/games/id', 'GameController@show');

/* CARDS */
Route::get('/cards', 'CardController@index');
Route::get('/cards/edit/{slug}', 'CardController@edit')->middleware('admin');
Route::post('/cards/edit/{slug}', 'CardController@update')->middleware('admin');
Route::get('/cards/delete/{slug}', 'CardController@delete')->middleware('admin');
Route::get('/cards/{slug}', 'CardController@show');

/* HEROES */
Route::get('/heroes', 'HeroController@index');
Route::get('/heroes/edit/{slug}', 'HeroController@edit')->middleware('admin');
Route::post('/heroes/edit/{slug}', 'HeroController@update')->middleware('admin');
Route::get('/heroes/delete/{slug}', 'HeroController@delete')->middleware('admin');
Route::get('/heroes/{slug}', 'HeroController@show');

/* DECKS */
Route::get('/decks', 'DeckController@index');
Route::get('/decks/hero/{hero}', 'DeckController@index');
Route::get('/decks/create', 'DeckController@create');
Route::post('/decks/create', 'DeckController@store');
Route::get('/decks/success', 'DeckController@success');
Route::get('/decks/edit/{id}', 'DeckController@edit')->middleware('auth');
Route::post('/decks/edit/{id}', 'DeckController@update')->middleware('auth');
Route::get('/decks/delete/{id}', 'DeckController@delete')->middleware('auth');
Route::get('/decks/export/{id}', 'DeckController@export')->middleware('auth');
Route::get('/decks/export/{id}/save/{slot}', 'DeckController@exportSave')->middleware('auth');
Route::get('/decks/{id}/{slug?}', 'DeckController@show');

/* GUIDES */
Route::get('/guides', 'GuideController@index');
Route::get('/guides/gameplay', 'GuideController@indexGameplay');
Route::get('/guides/create', 'GuideController@create')->middleware('auth');
Route::post('/guides/create', 'GuideController@store')->middleware('auth');
Route::get('/guides/edit/{id}', 'GuideController@edit')->middleware('auth');
Route::post('/guides/edit/{id}', 'GuideController@update')->middleware('auth');
Route::get('/guides/delete/{id}', 'GuideController@delete')->middleware('auth');
Route::get('/guides/hero/{hero}', 'GuideController@index');
Route::get('/guides/publish/{id}', 'GuideController@publish');
Route::get('/guides/unpublish/{id}', 'GuideController@unpublish');
Route::get('/guides/{id}/{slug?}', 'GuideController@show');

/* COMMUNITY */
//Route::get('/community', 'CommunityController@index');

/* DISCUSSION */
//Route::get('/discussion', 'DiscussionController@index');
//Route::get('/discussion/category/{category}', 'DiscussionController@category');
//Route::get('/discussion/create', 'DiscussionController@create')->middleware('auth');
//Route::post('/discussion/create', 'DiscussionController@store')->middleware('auth');
//Route::get('/discussion/edit/{id}', 'DiscussionController@edit')->middleware('auth');
//Route::post('/discussion/edit/{id}', 'DiscussionController@update')->middleware('auth');
//Route::get('/discussion/delete/{id}', 'DiscussionController@delete')->middleware('auth');
//Route::get('/discussion/{id}/best-answer/{rid}', 'DiscussionController@bestAnswer')->middleware('auth');
//Route::post('/discussion/{id}/reply', 'DiscussionController@reply')->middleware('auth');
//Route::get('/discussion/{id}/{slug?}', 'DiscussionController@show');
//Route::post('/discussion/{id}/{slug?}/reply', 'DiscussionController@reply')->middleware('auth');

/* MISC */
Route::get('/report/{id}', 'ReportController@store');
Route::get('/vote', 'VoteController@store');
Route::get('/strategy/{slug}', 'GuideController@strategy');

/* Account */
Route::group(['prefix' => 'account', 'middleware' => 'auth'], function () {
    Route::get('/', 'AccountController@index');
    Route::get('/profile', 'AccountController@editProfile');
    Route::get('/link', 'AccountController@linkAccount');
    Route::get('/unlink', 'Auth\OAuthController@unlinkAccount');
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
    Route::get('/news/frontpage/{id}', 'ModerationController@newsFrontpage');
    Route::get('/news/feature/{id}', 'ModerationController@newsPromote');
    Route::get('/news/unfeature/{id}', 'ModerationController@newsDemote');
    Route::get('/guides', 'ModerationController@guides');
    Route::get('/guides/feature/{id}', 'ModerationController@guidesFeature');
    Route::get('/guides/unfeature/{id}', 'ModerationController@guidesUnfeature');
    Route::get('/decks', 'ModerationController@decks');
    Route::get('/decks/feature/{id}', 'ModerationController@decksFeature');
    Route::get('/decks/unfeature/{id}', 'ModerationController@decksUnfeature');
    Route::get('/cards', 'ModerationController@cards');
    Route::get('/cards/feature/{id}', 'ModerationController@cardsFeature');
    Route::get('/heroes', 'ModerationController@heroes');
    Route::get('/heroes/feature/{id}', 'ModerationController@heroesFeature');
    Route::get('/reports', 'ModerationController@reports');
    Route::get('/patch', 'ModerationController@getPatch');
    Route::post('/patch', 'ModerationController@setPatch');
});

/* Administration */
Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => ['auth', 'admin', 'cors']], function () {
    Route::get('/', 'AdminController@index');
    Route::get('/jobs', 'AdminController@jobs');
    Route::get('/cards', 'AdminController@cards');
    Route::get('/heroes', 'AdminController@heroes');
    Route::get('/moderation', 'AdminController@moderation');
    Route::post('/moderation/mod', 'AdminController@mod');
    Route::get('/moderation/demod/{id}', 'AdminController@demod');
    Route::get('/maintenance', 'MaintenanceController@index');
    Route::get('/maintenance/update-cards', '\App\Http\Controllers\CardController@pullCards');
    Route::get('/maintenance/update-card-images', '\App\Http\Controllers\CardController@pullCardImages');
    Route::get('/maintenance/update-heroes', '\App\Http\Controllers\HeroController@pullHeroes');
    Route::get('/maintenance/update-hero-images', '\App\Http\Controllers\HeroController@pullHeroImages');
    Route::get('/api/jobs', 'AdminController@getJobs');
    Route::get('/settings', 'AdminController@getSettings');
    Route::post('/settings', 'AdminController@setSettings');

    //Route::get('/migrate', 'MigrateDatabaseController@run');
    //Route::get('/convertGuides', 'MigrateDatabaseController@convertGuides');
    //Route::get('/decksReset', 'MigrateDatabaseController@decksReset');
    //Route::get('/heroVideos', 'AdminController@heroVideos');

});

/* API */
Route::group(['prefix' => 'api', 'namespace' => 'API', 'middleware' => 'cors'], function () {
    Route::get('/v1/comments/thread/{id}', 'CommentController@thread');
    Route::post('/v1/comments/upvote/{id}', 'CommentController@upvote');
    Route::get('/v1/comments/delete/{id}', 'CommentController@delete');
    Route::post('/v1/comments/store', 'CommentController@store');

    Route::get('/v1/decks', 'DeckController@index');
    Route::get('/v1/decks/find/{id}', 'DeckController@show');
    Route::get('/v1/guides', 'GuideController@index');
    Route::get('/v1/cards', 'CardController@index');
    Route::get('/v1/cards/find/{id}', 'CardController@show');
    Route::get('/v1/cards/search/{string}', 'CardController@search');
    Route::get('/v1/heroes', 'HeroController@index');
    Route::get('/v1/heroes/find/{id}', 'HeroController@show');
    Route::get('/v1/news', 'NewsController@index');
    Route::post('/v1/report', 'ReportController@store');
    Route::post('/v1/vote', 'VoteController@store');
    Route::get('/v1/matches/find/{id}', 'MatchController@show')->middleware('admin');
    Route::get('/v1/matches/player/{id}', 'MatchController@player')->middleware('admin');

    Route::post('/v1/parser/getPlayersElo', 'MatchController@getPlayersElo');
    Route::get('/v1/parser/endMatch/{id}', 'MatchController@end');
});

/* SHORTCODE */
Route::get('/{code}', 'ShortcodeController@redirect');
