<?php

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
        DB::table('roles')->insert(
            [
                [
                    'id' => "1",
                    'name' => "admin",
                    'permissions' => '{}'
                ],
                [
                    'id' => "2",
                    'name' => "operator",
                    'permissions' => '{}'
                ],
                [
                    'id' => "3",
                    'name' => "owner",
                    'permissions' => '{}'
                ],
                [
                    'id' => "4",
                    'name' => "dispatcher",
                    'permissions' => '{}'
                ],
                [
                    'id' => "5",
                    'name' => "driver",
                    'permissions' => '{}'
                ],
            ]
        );

        DB::table('users')->insert(
            [
                [
                    'name' => "admin",
                    'email' => "admin@mail.com",
                    'password' => Hash::make('admin'),
                    'role_id' => '1',
                ],
                [
                    'name' => "operator",
                    'email' => "operator@mail.com",
                    'password' => Hash::make('operator'),
                    'role_id' => '2',
                ],
            ]
        );

        DB::table('cities')->insert(
            [
                [
                    'id' => "1",
                    'name' => "Тернопіль",
                    'center_point' => '{"lat":49,"lng":25}'
                ],
                [
                    'id' => "2",
                    'name' => "Чернівці",
                    'center_point' => '{"lat":29,"lng":45}'
                ]
            ]
        );
    }
}
