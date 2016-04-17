<!DOCTYPE html>
<html lang="en-US">
<head>
    <!-- Title -->
    <title>
        @yield('title')
        Paragon.gg - News, strategy, information
    </title>

    <!-- Meta tags -->
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    @yield('meta_description')
    <meta name="keywords" content="
        @yield('meta_keywords', 'paragon,news,strategy,guides,database,data,cards,moba,livestream,livestreams')
            "/>
    @yield('meta_thumbnail')

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Styles -->
    {{-- Should probably be handled by Webpack --}}
    <link media="all" type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

    {{--<script src="https://use.typekit.net/lpk6pfi.js"></script>--}}
    {{--<script>try{Typekit.load({ async: true });}catch(e){}</script>--}}

    <!-- Scripts -->
    @yield('libraries')
    {{--<script type="text/javascript" src="{{ url('/js/vendor/jquery-2.2.0.min.js') }}"></script>--}}
    {{--<script type="text/javascript" src="{{ url('/js/vendor/jquery.tooltipster.min.js') }}"></script>--}}
    {{--<script type="text/javascript" src="{{ url('/js/vendor/venobox.min.js') }}"></script>--}}
    {{--<script type="text/javascript" src="{{ url('/js/vendor/jquery.timeago.js') }}"></script>--}}

    <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>
<body>

{{-- Yield navigation content --}}
@include('layouts.nav')
{{-- Yield the main page content --}}
<div id="page">
    @yield('body')
</div>

@if(Session::has('notification'))
    <div class="notification">
        <i class="fa fa-info-circle"></i> {{ Session::get('notification') }}
    </div>
@endif

@if(Session::has('alert'))
    <div class="notification alert">
        <i class="fa fa-exclamation-circle"></i> {{ Session::get('alert') }}
    </div>
@endif

<footer>
    <p><a href="/">News</a> | <a href="/articles">Articles</a> | <a href="/strategy">Strategy</a> | <a href="/cards">Cards</a> | <a href="/account">Account</a> | <a href="/terms">Terms</a> | <a href="/privacy">Privacy</a></p>

    <p>Paragon.gg is built and maintained by &copy; <a href="https://jamie.sh">Jamie Shepherd</a> 2015-<?php echo date("Y"); ?>.<br/>
        Paragon, Unreal, Unreal Engine 4, UE4, and their respective logos are trademarks or registered trademarks of <a href="http://epicgames.com">Epic Games, Inc.</a></p>
</footer>

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

{{-- Should probably be handled by Webpack --}}
<script type="text/javascript" src="/js/bundle.min.js"></script>
@yield('scripts')

</body>
</html>
