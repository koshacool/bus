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

        {{--Load builded js script--}}
        <script type="text/javascript" src="{{ asset('js/build/bundle.js') }}"></script>
    </body>
</html>
