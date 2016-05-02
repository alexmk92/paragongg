<nav>
    <a href="/">
    <div class="logo">
        <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTcgNzAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU3IDcwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6I0ZGNjYwMDt9PC9zdHlsZT48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjU3LDcgNTcsMCAwLDAgMCwzMC40IDAsMzguNCAwLDU0IDM2LDU0IDM2LDQ2IDgsNDYgOCwzOCA0OSwzOCA0OSw2MiAwLDYyIDAsNzAgNTcsNzAgNTcsMzguNCA1NywzMC40IDU3LDE1IDIxLDE1IDIxLDIzIDQ5LDIzIDQ5LDMwIDgsMzAgOCw3ICIvPjwvc3ZnPg==" />
    </div>
    </a>
    <div class="wrapper">
        <ul class="links">
            <li><a href="/" {{ Request::is( '/') ? 'class=active' : '' }}>Home</a></li>
            <li><a href="/news" {{ Request::is( 'news*') ? 'class=active' : '' }}>News</a></li>
            <li><a href="/guides" {{ Request::is( 'guides*') ? 'class=active' : '' }}>Guides</a></li>
            <li><a href="/decks" {{ Request::is( 'decks*') ? 'class=active' : '' }}>Decks</a></li>
            {{-- <li><a href="/stats" {{ Request::is( 'stats*') ? 'class=active' : '' }}>Stats</a></li> --}}
            <li><a href="/cards" {{ Request::is( 'cards*') ? 'class=active' : '' }}>Cards</a></li>
            {{-- <li><a href="/heroes" {{ Request::is( 'heroes*') ? 'class=active' : '' }}>Heroes</a></li> --}}
            {{-- <li><a href="/community" {{ Request::is( 'community*') ? 'class=active' : '' }}>Community</a></li> --}}
        </ul>
        @if(Auth::user())
        <div id="account-nav" @if(Auth::check()) data-username="{{ Auth::user()->username }}" data-amber="{{ Auth::user()->amber }}" @endif></div>
        @else
        <div id="account-noauth">
            <a href="/login" class="login">Login</a>
            <a href="/register" class="register">Sign up</a>
        </div>
        @endif
    </div>
</nav>
