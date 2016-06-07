<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\News;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class NewsController extends Controller
{
    public function index()
    {
        $skip = 0;
        if(isset($_GET['skip'])) {
            $skip = $_GET['skip'];
        }
        $news = News::where('status', 'published')
            ->orderBy('created_at', 'DESC')
            ->skip($skip)->take(12)
            ->get();

        return response()->json($news);
    }
}
