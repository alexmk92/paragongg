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

        $news = new Article();
        $news->type     = 'news';
        $news->user_id  = 1;
        $news->status   = 'published';
        $news->title    = 'Iggy &amp; Scorch Release Date Announced';
        $news->slug     = 'iggy-and-scorch-release-date-announced2';
        $news->body     = "The release date for Iggy & Scorch was just announced. Turns out it's already out and I've just been pretty lazy making the ParagonGG website.";
        $news->save();

        $news = new Article();
        $news->type     = 'news';
        $news->user_id  = 1;
        $news->status   = 'published';
        $news->title    = 'Another 1';
        $news->slug     = 'another1';
        $news->body     = "The release date for Iggy & Scorch was just announced. Turns out it's already out and I've just been pretty lazy making the ParagonGG website. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet commodi cumque eligendi iure labore neque non quasi qui quibusdam. Alias asperiores deserunt dolores exercitationem minus, optio tempore velit voluptas. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet commodi cumque eligendi iure labore neque non quasi qui quibusdam. Alias asperiores deserunt dolores exercitationem minus, optio tempore velit voluptas. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet commodi cumque eligendi iure labore neque non quasi qui quibusdam. Alias asperiores deserunt dolores exercitationem minus, optio tempore velit voluptas.";
        $news->save();

        $news = new Article();
        $news->type     = 'news';
        $news->user_id  = 1;
        $news->status   = 'published';
        $news->title    = 'Another 2';
        $news->slug     = 'another2';
        $news->body     = "The release date for Iggy & Scorch was just announced. Turns out it's already out and I've just been pretty lazy making the ParagonGG website.";
        $news->save();

        $news = new Article();
        $news->type     = 'news';
        $news->user_id  = 1;
        $news->status   = 'published';
        $news->title    = 'Another 3';
        $news->slug     = 'another3';
        $news->body     = "The release date for Iggy & Scorch was just announced. Turns out it's already out and I've just been pretty lazy making the ParagonGG website. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet commodi cumque eligendi iure labore neque non quasi qui quibusdam. Alias asperiores deserunt dolores exercitationem minus, optio tempore velit voluptas.";
        $news->save();

        //

        $news = new Article();
        $news->type     = 'news';
        $news->user_id  = 1;
        $news->status   = 'published';
        $news->title    = 'Iggy &amp; Scorch Release Date Announced4';
        $news->slug     = 'iggy-and-scorch-release-date-announced4';
        $news->body     = "The release date for Iggy & Scorch was just announced. Turns out it's already out and I've just been pretty lazy making the ParagonGG website.";
        $news->save();

        $news = new Article();
        $news->type     = 'news';
        $news->user_id  = 1;
        $news->status   = 'published';
        $news->title    = 'Iggy &amp; Scorch Release Date Announced';
        $news->slug     = 'iggy-and-scorch-release-date-announced5';
        $news->body     = "The release date for Iggy & Scorch was just announced. Turns out it's already out and I've just been pretty lazy making the ParagonGG website.";
        $news->save();

        $news = new Article();
        $news->type     = 'news';
        $news->user_id  = 1;
        $news->status   = 'published';
        $news->title    = 'Another 5';
        $news->slug     = 'another5';
        $news->body     = "The release date for Iggy & Scorch was just announced. Turns out it's already out and I've just been pretty lazy making the ParagonGG website. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet commodi cumque eligendi iure labore neque non quasi qui quibusdam. Alias asperiores deserunt dolores exercitationem minus, optio tempore velit voluptas. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet commodi cumque eligendi iure labore neque non quasi qui quibusdam. Alias asperiores deserunt dolores exercitationem minus, optio tempore velit voluptas. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet commodi cumque eligendi iure labore neque non quasi qui quibusdam. Alias asperiores deserunt dolores exercitationem minus, optio tempore velit voluptas.";
        $news->save();

        $news = new Article();
        $news->type     = 'news';
        $news->user_id  = 1;
        $news->status   = 'published';
        $news->title    = 'Another 6';
        $news->slug     = 'another6';
        $news->body     = "The release date for Iggy & Scorch was just announced. Turns out it's already out and I've just been pretty lazy making the ParagonGG website.";
        $news->save();

        $news = new Article();
        $news->type     = 'news';
        $news->user_id  = 1;
        $news->status   = 'published';
        $news->title    = 'Another 7';
        $news->slug     = 'another7';
        $news->body     = "The release date for Iggy & Scorch was just announced. Turns out it's already out and I've just been pretty lazy making the ParagonGG website. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet commodi cumque eligendi iure labore neque non quasi qui quibusdam. Alias asperiores deserunt dolores exercitationem minus, optio tempore velit voluptas.";
        $news->save();
    }
}
