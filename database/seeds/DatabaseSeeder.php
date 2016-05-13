<?php

use App\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Check if this is the first seed
        $users = User::all();
        if($users->count() == 0) {
            $this->call(UsersTableSeeder::class);
            $this->call(ArticlesTableSeeder::class);
            $this->call(CommentThreadsTableSeeder::class);
            $this->call(CommentThreadCommentsTableSeeder::class);
        }

    }
}
