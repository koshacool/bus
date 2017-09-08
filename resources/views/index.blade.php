<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="UTF-8">
        <title>Notes</title>
        <!-- Import Google Icon Font -->
        <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

        <!-- Import materialize.css -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">

        <!-- Import manual styles -->
        <link href='{{ asset('css/style.css') }}' rel='stylesheet' type='text/css'>
    </head>
    <body>
        {{--Point to mount react components--}}
        <div id='mount-point'></div>

        <!-- Import jQuery before materialize.js -->
        <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>

        {{--<!-- Load google maps -->--}}
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnV1rYA3NJ_yMNCUdyHZDWvbjbGyIB5jU&libraries=drawing" id="googleMap"></script>

        {{--Load builded js script--}}
        <script type="text/javascript" src="{{ asset('js/build/bundle.js') }}"></script>
    </body>
</html>
