<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group.
|
*/

Route::post('login', 'API\PassportController@login');
Route::post('register', 'API\PassportController@register');

Route::middleware('auth:api')->group(function () {

    // If a get request is sent to user, it will link to the Passport API and call the user function
    Route::get('user', 'API\PassportController@user');
    Route::get('logout', 'API\PassportController@logout');

    // Below create the link from the vue components to the API which manipulates the data
    Route::resource('courses', 'API\CourseController')->except([
        'create', 'edit'
    ]);
    Route::resource('students', 'API\StudentController')->except([
        'create', 'edit'
    ]);
    Route::resource('enrolments', 'API\EnrolmentController')->except([
        'create', 'edit'
    ]);
});
