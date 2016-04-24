<?php

use Illuminate\Database\Seeder;

use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name     = 'Jamie Shepherd';
        $user->username = 'jamieshepherd';
        $user->email    = 'hello@jamie.sh';
        $user->role     = 'owner';
        $user->password = bcrypt('secret');
        $user->save();

        $user = new User();
        $user->name     = 'Test Account';
        $user->username = 'tester';
        $user->email    = 'tester@tester.com';
        $user->role     = 'user';
        $user->password = bcrypt('tester');
        $user->save();
    }
}
