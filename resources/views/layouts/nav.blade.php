<nav>
    <div class="logo">
        <img src="/assets/images/logo.svg" />
    </div>
    <div class="wrapper">
        <ul class="links">
            <li><a href="/" {{ Request::is( '/') ? 'class=active' : '' }}>Home</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="/guides">Guides</a></li>
            <li><a href="/stats">Stats</a></li>
            <li><a href="/cards">Cards</a></li>
            <li><a href="/heroes">Heroes</a></li>
            <li><a href="/community">Community</a></li>
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
