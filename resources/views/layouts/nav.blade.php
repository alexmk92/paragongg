<nav>
    <a href="/">
    <div class="logo">
        <img src="/assets/images/logo.svg" />
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
        <div id="account-nav"></div>
        @else
        <div id="account-noauth">
            <a href="/login" class="login">Login</a>
            <a href="/register" class="register">Sign up</a>
        </div>
        @endif
    </div>
</nav>
