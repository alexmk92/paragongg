<nav>
    <div class="logo">
        <img src="/assets/logo-temp.png" />
    </div>
    <div class="links">
    <ul>
        <li><a href="/" {{ Request::is( '/') ? 'class=active' : '' }}>Home</a></li>
        <li><a href="/news">News</a></li>
        <li><a href="/articles">Articles</a></li>
        <li><a href="/guides">Guides</a></li>
        <li><a href="/stats">Stats</a></li>
        <li><a href="/cards">Cards</a></li>
        <li><a href="/heroes">Heroes</a></li>
    </ul>
    </div>
</nav>
