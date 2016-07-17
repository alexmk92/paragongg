<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Traits\UpdatesSettings;
use App\Setting;
use App\User;
use Illuminate\Support\Facades\File;

class MigrateDatabaseController extends Controller
{
    use UpdatesSettings;

    // Entry point for migration
    public function run()
    {
        $completed = Setting::where('key', 'migrationCompleted')->first();

        if($completed) abort(404);

        // Load users
        $this->migrateUsers();

        $this->updateSettings('migrationCompleted', true);

        session()->flash('notification', 'success|Migration has completed successfully.');
        return redirect('/admin');
    }

    protected function migrateUsers()
    {
        $json = File::get("../database/seeds/json/users.json");
        $users = json_decode($json);

        foreach($users as $user) {
            if($user->username != 'jamieshepherd' && $user->username != 'fromp' && $user->username != 'alexmk92' && $user->username != 'tester') {
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

        File::delete("../database/seeds/json/users.json");
    }
}
