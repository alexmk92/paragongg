<?php

namespace App\Http\Controllers\Admin;

use App\Card;
use App\Deck;
use App\Guide;
use App\Hero;
use App\Http\Traits\UpdatesSettings;
use App\Job;
use App\Setting;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Collection;

class AdminController extends Controller
{
    use UpdatesSettings;

    public function index()
    {
        $stats = new Collection();
        $stats->users  = User::count();
        $stats->guides = Guide::count();
        $stats->decks  = Deck::count();
        return view('admin.index', compact('stats'));
    }

    public function jobs()
    {
        return view('admin.jobs');
    }

    public function getJobs()
    {
        $jobs = Job::orderByRaw("FIELD(queue, 'high', 'default', 'low')")
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json($jobs);
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
}
