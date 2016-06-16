<div id="comment-feed"></div>
<script>
    var csrf = '{{ csrf_token() }}';
            @if(Auth::check())
    var AUTHED = true;
            @else
    var AUTHED = false;
            @endif;

    var THREAD_ID = Number('{{ $threadId }}');
    var COMMENTS  = {!! json_encode($comments) !!};

</script>
