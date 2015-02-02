<?php
class Loan extends \Eloquent
{
    protected $fillable = array('id', 'user_id', 'amount');

    public static $rules = ['amount' => 'required', ];

    public function user() {
        return $this->belongsTo('User');
    }
}
