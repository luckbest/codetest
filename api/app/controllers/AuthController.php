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

        // var_dump($credential);die;
        if (Auth::attempt($credential)) {
            $user = Auth::user();
            return Response::json($user);
        } else {
            return Response::json(array('msg' => 'Invalid user'), 401);
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
