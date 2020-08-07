<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class,10);
        $this->call(TeamSeeder::class,10);
        $this->call(PlayerSeeder::class,10);
    }
}
