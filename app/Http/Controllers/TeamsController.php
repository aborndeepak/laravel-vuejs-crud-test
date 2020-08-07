<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;
class TeamsController extends Controller
{
    public function index() {
        $teams = DB::select('select * from teams');
        return view('teams/teams-view',['teams'=>$teams]);
    }
}
