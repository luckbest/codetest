<?php
class AuthController extends BaseController
{

    /*
    |--------------------------------------------------------------------------
    | Default Home Controller
    |--------------------------------------------------------------------------
    |
    | You may wish to use controllers instead of, or in addition to, Closure
    | based routes. That's great! Here is an example controller method to
    | get you started. To route to this controller, just add the route:
    |
    |   Route::get('/', 'HomeController@showWelcome');
    |
    */

    /**
     * Login action
     *
     * @return Response
     */
    public function login() {

        $user = Sentry::getUser();

        $token = $user->tokens()->where('client', BrowserDetect::toString())->first();

        return Response::json(array('token' => $token->toArray()));
    }

    /**
     * Logout
     *
     * @return Response
     */
    public function logout() {
        $user = Sentry::logout();
        return Response::json(array($user));
    }
}
