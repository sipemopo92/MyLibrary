<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UsersController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $res = [
            'data' => '',
            'success' => true,
            'message' => ''
        ];
        try {
            $res['data'] = User::all();
        } catch (\Exception $e) {
            $res['success'] = false;
            $res['message'] = $e->getMessage();
        }
        return $res;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $req = $request->only(['email', 'name', 'password', 'lastname']);
        $res = [
            'data' => '',
            'success' => true,
            'message' => ''
        ];
        try {
            $user = new User();
            $user->name = $req['name'];
            $user->lastname = $req['lastname'];
            $user->email = $req['email'];
            $user->password = \Hash::make($req['password']);
            $user->email_verified_at = now();
            $user->remember_token = Str::random(10);
            $user->save();
            $res['data'] = $user;
        } catch (\Exception $e) {
            $res['success'] = false;
            $res['message'] = $e->getMessage();
        }
        return $res;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $res = [
            'data' => '',
            'success' => true,
            'message' => ''
        ];
        try {
            $res['data'] = User::findOrFail($id);
        } catch (\Exception $e) {
            $res['success'] = false;
            $res['message'] = $e->getMessage();
        }
        return $res;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $req = $request->only(['email', 'name', 'password']);
        $res = [
            'data' => '',
            'success' => true,
            'message' => ''
        ];
        try {
            $user = User::findOrFail($id);
            $user->update($req);
            $res['data'] = $user;
        } catch (\Exception $e) {
            $res['success'] = false;
            $res['message'] = $e->getMessage();
        }
        return $res;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $res = [
            'data' => '',
            'success' => true,
            'message' => ''
        ];
        try {
            $user = User::findOrFail($id);
            $res['data'] = $user;
            $user->delete();
        } catch (\Exception $e) {
            $res['success'] = false;
            $res['message'] = $e->getMessage();
        }
        return $res;
    }
}
