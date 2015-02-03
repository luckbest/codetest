<?php

use Carbon\Carbon;

/*
|--------------------------------------------------------------------------
| Application & Route Filters
|--------------------------------------------------------------------------
|
| Below you will find the "before" and "after" events for the application
| which may be used to do any work before or after a request into your
| application. Here you may also register your custom route filters.
|
*/
App::before(function($request)
{
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT,DELETE,GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
    header('Access-Control-Allow-Credentials: true');
});


App::after(function($request, $response)
{
	//
});

/*
|--------------------------------------------------------------------------
| Authentication Filters
|--------------------------------------------------------------------------
|
| The following filters are used to verify that the user of the current
| session is logged into this application. The "basic" filter easily
| integrates HTTP Basic authentication for quick, simple checking.
|
*/

Route::filter('auth', function()
{
	if (Auth::guest())
	{
		if (Request::ajax())
		{
			return Response::make('Unauthorized', 401);
		}
		else
		{
			return Redirect::guest('login');
		}
	}
});


Route::filter('auth.basic', function()
{
	return Auth::basic();
});

/*
|--------------------------------------------------------------------------
| Guest Filter
|--------------------------------------------------------------------------
|
| The "guest" filter is the counterpart of the authentication filters as
| it simply checks that the current user is not logged in. A redirect
| response will be issued if they are, which you may freely change.
|
*/

Route::filter('guest', function()
{
	if (Auth::check()) return Redirect::to('/');
});

/*
|--------------------------------------------------------------------------
| CSRF Protection Filter
|--------------------------------------------------------------------------
|
| The CSRF filter is responsible for protecting your application against
| cross-site request forgery attacks. If this special token in a user
| session does not match the one given in this request, we'll bail.
|
*/

Route::filter('csrf', function()
{
	if (Session::token() != Input::get('_token'))
	{
		throw new Illuminate\Session\TokenMismatchException;
	}
});


Route::filter('auth.token', function($route, $request)
{
	$authenticated = false;

	$data = [];
	if($email = Input::get('email') && $password = Input::get('password'))
	{
		$credentials = array('email' => Input::get('email'), 'password' => Input::get('password'));

		$auth = App::make('auth');

		if(Auth::once($credentials))
		{
			$authenticated = true;

			if(!Auth::user()->tokens()->where('client',BrowserDetect::toString())->first())
			{
				$token = [];

				$token['api_token'] = hash('sha256',Str::random(10),false);
				$token['client'] = BrowserDetect::toString();
				$token['expires_on'] = Carbon::now()->addMonth()->toDateTimeString();

				Auth::user()->tokens()->save(new Token($token));
			}

		}
	}

	if($payload = $request->header('Authorization'))
	{
		$userModel = Sentry::getUserProvider()->createModel();

		$token = Token::valid()->where('api_token',$payload)
						->where('client',BrowserDetect::toString())
						->first();


		if($token)
		{
			Sentry::login($token->user);
			$authenticated = true;
		}

	}

	if($authenticated && !Sentry::check())
	{
		Sentry::login(Auth::user());
	}

	if(!$authenticated)
	{
		$response = Response::json([
	            'error' => true,
	            'message' => 'Not authenticated',
	            'code' => 401],401
	        );

		$response->header('Content-Type', 'application/json');

	    return $response;
	}


});
