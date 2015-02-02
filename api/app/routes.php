<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/
Route::get('/', function() {
    return View::make('index');
});

Route::group(array('prefix' => 'api',), function () {
    Route::post('login', 'AuthController@login');
    Route::get('logout', 'AuthController@logout');

    Route::get('loan', 'LoanController@index');
    Route::post('loan', 'LoanController@store');
});
