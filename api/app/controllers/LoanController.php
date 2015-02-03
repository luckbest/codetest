<?php
class LoanController extends BaseController
{

    /**
     * Display a listing of loans
     *
     * @return Response
     */
    public function index() {

        $user = Sentry::getUser();
        $loans = Loan::where('user_id', '=', $user->id)->get();
        return Response::json($loans);
    }

    /**
     * Store a newly created lost in storage.
     *
     * @return Response
     */
    public function store() {

        $user = Sentry::getUser();
        $loan = Loan::create(array('amount' => Input::get('amount'), 'user_id' => $user->id));
        return Response::json($loan);
    }

    /**
     * Display the specified loan.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        $loan = Loan::findOrFail($id);
        return Response::json($loan);
    }

    /**
     * Remove the specified loan from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        Loan::destroy($id);
        return Response::json($id);
    }

    /**
     * Update the specified loan in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id) {
        $loan = Loan::findOrFail($id);

        $validator = Validator::make($data = Input::all(), Loan::$rules);

        if ($validator->fails()) {
            return Response::json(array(),424);
        }

        $loan->update($data);

        return Response::json(Input::all());
    }
}
