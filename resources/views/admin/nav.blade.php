<div id="sidebar" class="small align-left">
    <div class="sidebox navigation cf">
        <ul>
            <li><a href="/admin" {{ Request::is( 'admin') ? 'class=active' : '' }}>Dashboard</a></li>
            <li><a href="/admin/maintenance" {{ Request::is( 'admin/maintenance') ? 'class=active' : '' }}>Maintenance</a></li>
            <li><a href="/admin/jobs" {{ Request::is( 'admin/jobs') ? 'class=active' : '' }}>Queued jobs</a></li>
        </ul>
    </div>
</div>