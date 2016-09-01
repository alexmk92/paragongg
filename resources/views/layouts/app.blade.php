<!DOCTYPE html>
<html lang="en-US">
<head>
    <!-- Title -->
    <title>@yield('title') Paragon.gg - News, strategy, information</title>

    <!-- Meta tags -->
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
    <meta name="keywords" content="@yield('meta_keywords', 'paragon,news,decks,stats,guides,strategy,statistics,cards,moba,database,data,livestream,livestreams')"/>
    @yield('meta_tags')

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

    @if(!isset($hideAnalytics))
        <!-- Google Analytics -->
        <script type="text/javascript">
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-32129070-1']);
            _gaq.push(['_setSampleRate', '10']);
            _gaq.push(['_trackPageview']);

            _gaq.push(['_setAccount', 'UA-32132943-1']);
            _gaq.push(['_setSampleRate', '100']);
            _gaq.push(['_trackPageview']);

            (function() {
                var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();
        </script>
        <!-- Quantcast -->
        <script type="text/javascript">
            var _qevents = _qevents || [];

            (function() {
                var elem = document.createElement('script');
                elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
                elem.async = true;
                elem.type = "text/javascript";
                var scpt = document.getElementsByTagName('script')[0];
                scpt.parentNode.insertBefore(elem, scpt);
            })();

            _qevents.push({
                qacct:"p-8bG6eLqkH6Avk"
            });
        </script>
        <noscript>
            <div style="display:none;">
                <img src="//pixel.quantserve.com/pixel/p-8bG6eLqkH6Avk.gif" border="0" height="1" width="1" alt="Quantcast"/>
            </div>
        </noscript>
        <!-- comScore -->
        <script type="text/javascript">
            var _comscore = _comscore || [];
            _comscore.push({ c1: "2", c2: "6177433",
                options: {
                    url_append: "comscorekw=wikiacsid_games"
                }
            });

            (function() {
                var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
                s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
                el.parentNode.insertBefore(s, el);
            })();
        </script>
        <noscript>
            <img src="http://b.scorecardresearch.com/p?c1=2&c2=6177433&c3=&c4=&c5=&c6=&c7=http%3A%2F%2Fwww.wikia.com%2FWikia%3Fcomscorekw%3Dwikiacsid_lifestyle&c15=&cv=2.0&cj=1" />
        </noscript>
    @endif

</head>
<body @if(isset($customBackground)) style="background-image: none;" @endif>
@if(isset($customBackground))
    <div class="custom-background" style="background-image:url({{ $customBackground }});"></div>
@endif
{{-- Yield navigation content --}}
@include('layouts.nav')

{{-- Yield the main page content --}}
<div id="page" class="cf">
    @if(!isset($hideGlobalNotification) || !$hideGlobalNotification)
    {!! globalNotification() !!}
    @endif
    @yield('body')
</div>

{{-- Flash notifications --}}
<div class="notification-panel">
{!! displayNotification() !!}
</div>

@if(auth()->user()->epicAccountLinked())
    <h1>Account linked</h1>
@endif

@if(session()->has('impersonate'))
    <div class="impersonate-enabled"><i class="fa fa-user-secret" aria-hidden="true"></i> You are currently impersonating another account: <strong>{{ auth()->user()->username }}</strong>. <a href="/admin/users/impersonate/stop">Click here to stop.</a></div>
@endif

{{-- Include footer --}}
@include('layouts.footer')

{{-- Scripts --}}
@yield('scripts')
<script type="text/javascript" src="/build/js/vendor.min.js"></script>
<script type="text/javascript" src="/build/js/app.min.js"></script>

<div class="beta-notification">V2.6 BETA</div>

</body>
</html>
