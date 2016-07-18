<?php

namespace App\Http\Controllers\Admin;

use App\Deck;
use App\Guide;
use App\Hero;
use App\Http\Controllers\Controller;
use App\Http\Traits\GeneratesShortcodes;
use App\Http\Traits\UpdatesSettings;
use App\Setting;
use App\User;
use Illuminate\Support\Facades\File;

class MigrateDatabaseController extends Controller
{
    use UpdatesSettings, GeneratesShortcodes;

    // Entry point for migration
    public function run()
    {
        $this->updateSettings('migrationCompleted', false);
        $completed = Setting::where('key', 'migrationCompleted')->first();

        // If this has already been migrated, abort
        if($completed && $completed->value == true) abort(404);

        // Begin the migration
        $this->migrateUsers();
        $this->migrateGuides();
        $this->migrateDecks();

        // Set migrationCompleted to true
        $this->updateSettings('migrationCompleted', true);
        session()->flash('notification', 'success|Migration has completed successfully.');
        return redirect('/admin');
    }

    protected function migrateUsers()
    {
        $json = File::get("../database/seeds/json/users.json");
        $users = json_decode($json);

        foreach($users as $user) {
            if($user->username != 'jamieshepherd' && $user->username != 'tester') {
                $newUser = new User();
                $newUser->role       = 'user';
                $newUser->email      = $user->email;
                $newUser->password   = $user->password;
                $newUser->username   = $user->username;
                $newUser->name       = $user->name;
                $newUser->created_at = $user->created_at;
                $newUser->updated_at = $user->created_at;
                $newUser->bio        = $user->bio;
                $newUser->website    = $user->website;
                $newUser->twitch_tv  = $user->twitchtv;
                $newUser->save();
            }
        }

        //File::delete("../database/seeds/json/users.json");
    }

    protected function migrateGuides()
    {
        $json = File::get("../database/seeds/json/guides.json");
        $guides = json_decode($json);

        foreach($guides as $guide) {
            $newGuide           = new Guide();
            $newGuide->user_id  = User::where('username', $guide->username)->first()->id;
            $newGuide->title    = $guide->title;
            $newGuide->slug     = createSlug($guide->title);
            $newGuide->status   = $guide->status;
            $newGuide->body     = $guide->content;
            $newGuide->type     = $guide->type;
            $newGuide->views    = $guide->views;
            $newGuide->featured = $guide->featured;
            if($guide->type == 'hero') {
                $newGuide->hero_code = Hero::where('slug', $guide->hero)->first()->code;
                $newGuide->abilities = $guide->ability_order;
            }
            $newGuide->created_at = $guide->created_at;
            $newGuide->updated_at = $guide->updated_at;
            $newGuide->save();

            $this->generate('/guides/'.$newGuide->id.'/'.$newGuide->slug, 'guide', $newGuide->id);
        }

        //File::delete("../database/seeds/json/guides.json");
    }

    protected function migrateDecks()
    {
        $json = File::get("../database/seeds/json/decks.json");
        $decks = json_decode($json);

        foreach($decks as $deck) {
            if(empty($deck->cards)) continue;
            $newDeck              = new Deck();
            if($deck->username) {
                $newDeck->author_id   = User::where('username', $deck->username)->first()->id;
            }
            $newDeck->title       = $deck->title;
            $newDeck->builds      = [];
            $newDeck->slug        = createSlug($deck->title);
            $newDeck->description = $deck->description;
            $newDeck->cards       = $deck->cards;
            $newDeck->hero        = Hero::where('slug', $deck->hero)->first()->toArray();
            $newDeck->views       = 0;
            $newDeck->votes       = 0;
            $newDeck->created_at  = $deck->created_at;
            $newDeck->updated_at  = $deck->updated_at;
            $newDeck->save();

            $this->generate('/decks/'.$newDeck->id.'/'.$newDeck->slug, 'deck', $newDeck->id);
        }

        //File::delete("../database/seeds/json/decks.json");
    }
}
