<?php

namespace App\Http\Controllers\API;

use App\Guide;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class GuideController extends Controller
{
    // Get
    public function index()
    {
        $skip = 0;
        $take = 1;

        if(isset($_GET['skip'])) $skip = $_GET['skip'];
        if(isset($_GET['take'])) $take = $_GET['take'];

        $guides = Guide::where('status', 'published')
            ->join('users', 'users.id', '=', 'guides.user_id')
            ->select('guides.id', 'guides.type', 'guides.title', 'user_id', 'guides.created_at', 'guides.updated_at', 'guides.views', 'guides.votes', 'hero_code', 'guides.slug', 'guides.featured', 'users.username');

        if(isset($_GET['hero'])) {
            $guides->where('hero', $_GET['hero']);
        }
        if(isset($_GET['filter'])) {
            switch($_GET['filter']) {
                case 'featured':
                    $guides = $guides->where('featured', true);
                    break;
                case 'updated':
                    $guides = $guides->orderBy('updated_at', 'DESC');
                    break;
                case 'rated':
                    $guides = $guides->orderBy('votes', 'DESC');
                    break;
                case 'views':
                    $guides = $guides->orderBy('views', 'DESC');
                    break;
                case 'newest':
                    $guides = $guides->orderBy('created_at', 'DESC');
                    break;
            }
        }

        $guides = $guides->skip($skip)
            ->take($take)
            ->get();

        return response()->json($guides);
    }
}
