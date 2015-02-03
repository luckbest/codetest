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
Route::get('/', function () {
    return View::make('hello');
});

Route::group(array('prefix' => 'api'), function () {

    // Auth
    Route::post('login', array('before' => 'auth.token', 'uses' => 'AuthController@login'));
    Route::get('logout', array('before' => 'auth.token', 'uses' => 'AuthController@logout'));
    // Route::resource('loan', 'LoanController');
    // Loan
    Route::get('loan', array('before' => 'auth.token', 'uses' => 'LoanController@index'));
    Route::post('loan', array('before' => 'auth.token', 'uses' => 'LoanController@store'));
    Route::get('loan/{id}', array('before' => 'auth.token', 'uses' => 'LoanController@show'));
    Route::get('loan/{id}', array('before' => 'auth.token', 'uses' => 'LoanController@show'));
    Route::post('loan/{id}', array('before' => 'auth.token', 'uses' => 'LoanController@show'));
    Route::delete('loan/{id}', array('before' => 'auth.token', 'uses' => 'LoanController@destroy'));
    Route::put('loan/{id}', array('before' => 'auth.token', 'uses' => 'LoanController@update'));

});

