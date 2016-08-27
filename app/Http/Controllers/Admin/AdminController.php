<?php

namespace App\Http\Controllers\Admin;

use App\Card;
use App\Deck;
use App\FailedJob;
use App\Guide;
use App\Hero;
use App\Http\Traits\UpdatesSettings;
use App\Job;
use App\Match;
use App\Player;
use App\Setting;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class AdminController extends Controller
{
    use UpdatesSettings;

    public function index()
    {
        $stats = new Collection();
        $expires = Carbon::now()->addMinutes(60);

        // Count of all users in database
        if(!Cache::has('adminStats.usersCount')) {
            Cache::put('adminStats.usersCount', User::count(), $expires);
        }
        $stats->users = Cache::get('adminStats.usersCount');

        // Count of all users who have linked their accounts with Epic
        if(!Cache::has('adminStats.linkedUsers')) {
            Cache::put('adminStats.linkedUsers', User::whereNotNull('epic_account_id')->count(), $expires);
        }
        $stats->linkedUsers = Cache::get('adminStats.linkedUsers');

        // Count of all guides in the database
        if(!Cache::has('adminStats.guidesCount')) {
            Cache::put('adminStats.guidesCount', Guide::count(), $expires);
        }
        $stats->guides       = Cache::get('adminStats.guidesCount');

        // Count of all guides in the database
        if(!Cache::has('adminStats.decksCount')) {
            Cache::put('adminStats.decksCount', Deck::count(), $expires);
        }
        $stats->decks        = Cache::get('adminStats.decksCount');

        // Count of all matches in the database
        if(!Cache::has('adminStats.matchesCount')) {
            Cache::put('adminStats.matchesCount', Match::count(), $expires);
        }
        $stats->matches = Cache::get('adminStats.matchesCount');

        // Count of all players in database
        if(!Cache::has('adminStats.playersCount')) {
            Cache::put('adminStats.playersCount', Player::count(), $expires);
        }
        $stats->players = Cache::get('adminStats.playersCount');

        return view('admin.index', compact('stats'));
    }

    public function jobs()
    {
        return view('admin.jobs');
    }

    public function failedJobs()
    {
        return view('admin.failedjobs');
    }

    public function getJobs()
    {
        $jobs = Job::orderByRaw("FIELD(queue, 'high', 'default', 'low')")
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json($jobs);
    }

    public function getFailedJobs()
    {
        $failedJobs = FailedJob::orderBy('failed_at', 'DESC')
            ->get();

        return response()->json($failedJobs);
    }

    public function cards()
    {
        $cards = Card::orderBy('name', 'ASC')
            ->paginate(50);
        return view('admin.cards', compact('cards'));
    }

    public function heroes()
    {
        $heroes = Hero::orderBy('name', 'ASC')
            ->paginate(50);
        return view('admin.heroes', compact('heroes'));
    }

    public function getSettings()
    {
        $settings = Setting::all();


        $settings['globalNotification'] = $settings->where('key', 'globalNotification')->first();

        return view('admin.settings', compact('settings'));
    }

    public function setSettings(Request $request)
    {
        $this->updateSettings('globalNotification', $request->global_notification);

        session()->flash('notification', 'success|Settings updated.');
        return redirect()->back();
    }

    public function moderation()
    {
        $users = User::where('role', 'moderator')->get();
        return view('admin.moderation', compact('users'));
    }

    public function mod(Request $request)
    {
        $user = User::where('username', $request->username)->firstOrFail();
        $user->role = "moderator";
        $user->save();
        session()->flash('notification', 'success|Moderator status applied.');
        return redirect('admin/moderation');
    }

    public function demod($id)
    {
        $user = User::findOrFail($id);
        $user->role = "user";
        $user->save();
        session()->flash('notification', 'success|Moderator status removed.');
        return redirect('admin/moderation');
    }

    public function upgradeDecks()
    {
        $decks = Deck::where('affinities', 'exists', false)->get();

        foreach($decks as $deck) {
            $affinities = [
                'universal' => 0,
                'fury' => 0,
                'intellect' => 0,
                'growth' => 0,
                'order' => 0,
                'corruption' => 0,
            ];
            foreach($deck->cards as $card) {
                $card = Card::where('code', $card)->first();
                if(isset($card->affinity)) {
                    $affinities[strtolower($card->affinity)]++;
                }
            }
            $deck->timestamps = false;
            $deck->affinities = $affinities;
            $deck->save();
        }

        session()->flash('notification', 'success|Upgrade finished.');
        return redirect('/decks');
    }
}
