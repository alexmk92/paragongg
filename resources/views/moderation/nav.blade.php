<div id="sidebar" class="small align-left">
    <div class="sidebox navigation cf">
        <ul>
            <li><a href="/moderation" {{ Request::is( 'moderation') ? 'class=active' : '' }}>Dashboard</a></li>
            <li><a href="/moderation/news" {{ Request::is( 'moderation/news') ? 'class=active' : '' }}>News</a></li>
            <li><a href="/moderation/reports" {{ Request::is( 'moderation/reports') ? 'class=active' : '' }}>Reports</a></li>
        </ul>
    </div>
</div>