<div id="comment-feed"></div>
<script>
    var csrf = '{{ csrf_token() }}';
    @if(Auth::check())
        var AUTHED = true;
        var USER = {
            id : '{{ Auth::user()->id }}',
            username : '{{ Auth::user()->username }}',
            avatar : '{{ Auth::user()->avatar }}'
        };
    @else
        var AUTHED = false;
        var USER = {
            id : null,
            username : "guest"
        }
    @endif;

    var THREAD_ID = Number('{{ $thread->id }}');
    var COMMENTS  = {!! json_encode($thread->comments) !!};

</script>
