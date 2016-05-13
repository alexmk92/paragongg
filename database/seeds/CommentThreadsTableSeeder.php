<?php

use Illuminate\Database\Seeder;

use App\User;

class CommentThreadsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $thread = new \App\CommentThread();
        $thread->uri      = 'news/iggy-and-scorch-release-date-announced';
        $thread->save();
    }
}
