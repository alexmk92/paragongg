<div id="sidebar" class="small align-left">
    <div class="sidebox navigation cf">
        <ul>
            <li><a href="/account/profile" {{ Request::is( 'account/profile') ? 'class=active' : '' }}>Edit profile</a></li>
            <li><a href="/account/guides" {{ Request::is( 'account/guides') ? 'class=active' : '' }}>Guides</a></li>
            <li><a href="/account/decks" {{ Request::is( 'account/decks') ? 'class=active' : '' }}>Decks</a></li>
            <li><a href="/account/link" {{ Request::is( 'account/link') ? 'class=active' : '' }}>Link Epic account</a></li>
            <li><a href="/account/password" {{ Request::is( 'account/password') ? 'class=active' : '' }}>Change password</a></li>
            <li><a href="/logout">Sign out</a></li>
        </ul>
    </div>
</div>