<?php

namespace App\Http\Controllers\API;

use App\Guide;
use App\Http\Requests;
use App\Http\Controllers\Controller;

/**
 * Class GuideController
 * @package App\Http\Controllers\API
 */
class GuideController extends Controller
{
    // Get
    /**
     * @return mixed
     */
    public function index()
    {
        $skip = 0;
        $take = 0;
        $type = 'hero';

        if(isset($_GET['skip'])) $skip = $_GET['skip'];
        if(isset($_GET['take'])) $take = $_GET['take'];
        if(isset($_GET['type'])) $type = $_GET['type'];

        $guides = Guide::where('status', 'published')->where('type', $type)
            ->join('users', 'users.id', '=', 'guides.user_id')
            ->select('guides.id', 'guides.type', 'guides.title', 'user_id', 'guides.created_at', 'guides.updated_at', 'guides.views', 'guides.votes', 'hero_code', 'guides.slug', 'guides.featured', 'users.username');

        if(isset($_GET['hero'])) {
            $guides->where('hero_code', $_GET['hero']);
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
                default:
                    $guides = $guides->orderBy('updated_at', 'DESC');
                    break;
            }
        }

        $guides = $guides->skip($skip)
            ->take($take)
            ->get();

        return response()->json($guides);
    }


}
