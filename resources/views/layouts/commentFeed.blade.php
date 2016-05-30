<div id="comment-feed"></div>
<script>
    var csrf = '{{ csrf_token() }}';
            @if(Auth::check())
    var AUTHED = true;
            @else
    var AUTHED = false;
            @endif;
</script>
