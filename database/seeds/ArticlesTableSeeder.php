<?php

use App\Article;
use Illuminate\Database\Seeder;

class ArticlesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $news = new Article();
        $news->type     = 'news';
        $news->user_id  = 1;
        $news->status   = 'published';
        $news->title    = 'Iggy &amp; Scorch Release Date Announced';
        $news->slug     = 'iggy-and-scorch-release-date-announced';
        $news->body     = "The release date for Iggy & Scorch was just announced. Turns out it's already out and I've just been pretty lazy making the ParagonGG website.";
        $news->save();
    }
}
