<!DOCTYPE html>
<html lang="en-US">
<head>
    <!-- Title -->
    <title>@yield('title') Paragon.gg - News, strategy, information</title>

    <!-- Meta tags -->
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
    <meta name="keywords" content="@yield('meta_keywords', 'paragon,news,strategy,guides,database,data,cards,moba,livestream,livestreams')"/>
    @yield('meta_description')
    @yield('meta_thumbnail')

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.3.15/slick.css" />


    <!-- Favicon -->
    <link rel="shortcut icon" href="/assets/images/favicon.ico" />

    <!-- Styles -->
    <link media="all" type="text/css" rel="stylesheet" href="/build/css/app.min.css">

    <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-shim.min.js"></script>
    @yield('libraries')

</head>
<body @if(isset($customBackground)) style="background-image: none;" @endif>
@if(isset($customBackground))
    <div class="custom-background" style="background-image:url({{ $customBackground }});"></div>
@endif
{{-- Yield navigation content --}}
@include('layouts.nav')

{{-- Yield the main page content --}}
<div id="page" class="cf">
    {!! globalNotification() !!}
    @yield('body')
</div>

{{-- Flash notifications --}}
<div class="notification-panel">
{!! displayNotification() !!}
</div>

{{-- Include footer --}}
@include('layouts.footer')

{{-- Webpack --}}
@yield('scripts')
<script type="text/javascript" src="/build/js/vendor.min.js"></script>
<script type="text/javascript" src="/build/js/app.min.js"></script>

@if(!isset($hideAnalytics))

     <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-52110087-4', 'auto');
        ga('send', 'pageview');
    </script>

@endif

<div class="beta-notification">V2.0 BETA</div>

</body>
</html>
