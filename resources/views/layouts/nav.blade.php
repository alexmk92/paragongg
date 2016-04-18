<nav>
    <div class="logo">
        <img src="/assets/logo-temp.png" />
    </div>
    <div class="wrapper">
        <ul class="links">
            <li><a href="/" {{ Request::is( '/') ? 'class=active' : '' }}>Home</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="/articles">Articles</a></li>
            <li><a href="/guides">Guides</a></li>
            <li><a href="/stats">Stats</a></li>
            <li><a href="/cards">Cards</a></li>
            <li><a href="/heroes">Heroes</a></li>
        </ul>
        <div id="account-nav">

        </div>

        {{--

        <a href="/account">
                <img class="account-avatar" src="https://www.gravatar.com/avatar/d5d3310834b43c6f96e200339734c949?s=20&amp;d=https%3A%2F%2Fparagon.gg%2Fimages%2Fdefault-avatar.png" alt="Your avatar">
                Jamie
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </a>

        --}}
    </div>
</nav>
