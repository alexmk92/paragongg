<!DOCTYPE html>
<html lang="en-US">
<head>
    <!-- Title -->
    <title>@yield('title') Paragon.gg - News, strategy, information</title>

    <!-- Meta tags -->
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="@yield('meta_keywords', 'paragon,news,strategy,guides,database,data,cards,moba,livestream,livestreams')"/>
    @yield('meta_description')
    @yield('meta_thumbnail')

    <!-- Favicon -->
    <link rel="shortcut icon" href="/assets/images/favicon.ico" />

    <!-- Styles -->
    <link media="all" type="text/css" rel="stylesheet" href="/build/css/app.css">

    <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Scripts -->
    <script src="https://use.typekit.net/lpk6pfi.js"></script>
    <script>try{Typekit.load({ async: false });}catch(e){}</script>
    @yield('libraries')
    {{--<script type="text/javascript" src="{{ url('/js/vendor/jquery-2.2.0.min.js') }}"></script>--}}
    {{--<script type="text/javascript" src="{{ url('/js/vendor/jquery.tooltipster.min.js') }}"></script>--}}
    {{--<script type="text/javascript" src="{{ url('/js/vendor/venobox.min.js') }}"></script>--}}
    {{--<script type="text/javascript" src="{{ url('/js/vendor/jquery.timeago.js') }}"></script>--}}

</head>
<body>
{{-- Yield navigation content --}}
@include('layouts.nav')

{{-- Yield the main page content --}}
<div id="page" class="cf">
    @yield('body')
</div>

{{-- Flash notifications --}}
@if(Session::has('notification'))
    <div class="notification">
        <i class="fa fa-info-circle"></i> {{ Session::get('notification') }}
    </div>
@endif

{{-- Flash errors (merge?) --}}
@if(Session::has('alert'))
    <div class="notification alert">
        <i class="fa fa-exclamation-circle"></i> {{ Session::get('alert') }}
    </div>
@endif

{{-- Include footer --}}
@include('layouts.footer')

{{-- Webpack --}}
<script type="text/javascript" src="/build/js/app.min.js"></script>
@yield('scripts')
@if(!isset($hideAnalytics))
    {{--
     <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-52110087-4', 'auto');
        ga('send', 'pageview');
    </script>
    --}}
@endif

</body>
</html>