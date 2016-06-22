<div id="comment-feed"></div>
<script>
    var csrf = '{{ csrf_token() }}';
    @if(Auth::check())
        var AUTHED = true;
        var USER = {
            username : '{{ Auth::user()->username }}'
        }
    @else
        var AUTHED = false;
        var USER = {
            username : "guest"
        }
    @endif;

    var THREAD_ID = Number('{{ $threadId }}');
    var COMMENTS  = {!! json_encode($comments) !!};

</script>
