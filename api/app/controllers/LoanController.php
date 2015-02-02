<?php
class LoanController extends \BaseController
{

    /**
     * Display a listing of the resource.
     * GET /loan
     *
     * @return Response
     */
    public function index() {

        $credential = array('password' => 'admin', 'email' => "admin@lupr.pl");
        Auth::attempt($credential);
        $user = Auth::user();
        var_dump($user->loans());
        return Response::json($user->loans());
    }

    /**
     * Show the form for creating a new resource.
     * GET /loan/create
     *
     * @return Response
     */
    public function create() {

        //


    }

    /**
     * Store a newly created resource in storage.
     * POST /loan
     *
     * @return Response
     */
    public function store() {
        $validator = Validator::make($data = Input::all(), Loan::$rules);
        if ($validator->fails()) {
            return Response::json([], 422);
        }
        if(!Auth::check()){
            var_dump(Session::all());
            return Response::json(array('dupa'));
        }
        $user = Auth::user();
        $test = $user->id;
        Loan::create(array('amount' => Input::get('amount'), 'user_id' => $user->id));

        return Response::json();
    }

    /**
     * Display the specified resource.
     * GET /loan/{id}
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {

        //


    }

    /**
     * Show the form for editing the specified resource.
     * GET /loan/{id}/edit
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id) {

        //


    }

    /**
     * Update the specified resource in storage.
     * PUT /loan/{id}
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id) {

        //


    }

    /**
     * Remove the specified resource from storage.
     * DELETE /loan/{id}
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {

        //


    }
}
