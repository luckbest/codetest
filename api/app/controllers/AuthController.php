<?php
class AuthController extends \BaseController
{

    /**
     * Login
     *
     * @return Response
     */
    public function login() {

        $credential = Input::all();
        if (Auth::attempt($credential, true)) {
            $user = Auth::user();
            return Response::json($user);
        } else {
            return Response::json($credential, 401);
        }
    }

    /**
     * Logout
     *
     * @return Response
     */
    public function logout() {

        Auth::logout();
        return Response::json(array('succes' => true, 'msg' => "Success logout"));
    }
}
