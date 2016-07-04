<div id="sidebar" class="small align-left">
    <div class="sidebox navigation cf">
        <ul>
            <li><a href="/moderation" {{ Request::is( 'moderation') ? 'class=active' : '' }}>Dashboard</a></li>
            <li><a href="/moderation/news" {{ Request::is( 'moderation/news') ? 'class=active' : '' }}>News</a></li>
            <li><a href="/moderation/guides" {{ Request::is( 'moderation/guides') ? 'class=active' : '' }}>Guides</a></li>
            <li><a href="/moderation/decks" {{ Request::is( 'moderation/decks') ? 'class=active' : '' }}>Decks</a></li>
            <li><a href="/moderation/cards" {{ Request::is( 'moderation/cards') ? 'class=active' : '' }}>Cards</a></li>
            <li><a href="/moderation/heroes" {{ Request::is( 'moderation/heroes') ? 'class=active' : '' }}>Heroes</a></li>
            <li><a href="/moderation/reports" {{ Request::is( 'moderation/reports') ? 'class=active' : '' }}>Reports</a></li>
            <li><a href="/moderation/patch" {{ Request::is( 'moderation/patch') ? 'class=active' : '' }}>Patch</a></li>
        </ul>
    </div>
</div>