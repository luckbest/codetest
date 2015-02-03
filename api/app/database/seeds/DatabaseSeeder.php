<?php
class DatabaseSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        Eloquent::unguard();

        $this->call('UserTableSeeder');
    }
}

class UserTableSeeder extends Seeder
{

    public function run() {
        DB::table('users')->delete();

        Sentry::createUser(array(
                           'email' => 'admin@admin.com',
                           'password' => 'password',
                           'activated' => true));
      Sentry::createUser(array(
                           'email' => 'lupr@admin.com',
                           'password' => 'password',
                           'activated' => true));

    }
}
