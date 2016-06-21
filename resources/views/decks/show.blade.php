@extends('layouts/app')
@section('body')
    <h2>{{ $deck->title }}</h2>
    <div id="sidebar">
        <div class="sidebox panel cf">
            <div class="title-wrapper">
                <h3>DECK</h3>
                <span class="subtext">{{ $deck->totalCards }}/40 CARDS</span>
            </div>
            <span class="subtext">PRIME HELIX</span>
            <ul class="deck-list">
                @if(count($deck->cards["prime"]) == 0)
                    <li>
                        <div class="wrapper">
                            <span>No cards of this type have been added.</span>
                        </div>
                    </li>
                @else
                    @foreach ($deck->cards["prime"] as $card)
                        <li style="background-image: url('{{ $card["images"]["large"] }}')">
                            <div class="wrapper">
                                <span class="count">{{ $card["quantity"] }}x</span>
                                <span class="name">{{ $card["name"] }}</span>
                                <span class="cost">{{ $card["cost"] }}CP</span>
                            </div>
                        </li>
                    @endforeach
                @endif
            </ul>
            <span class="subtext">EQUIPMENT</span>
            <ul class="deck-list">
                @if(count($deck->cards["equipment"]) == 0)
                    <li>
                        <div class="wrapper">
                            <span>No cards of this type have been added.</span>
                        </div>
                    </li>
                @else
                    @foreach ($deck->cards["equipment"] as $card)
                        <li style="background-image: url('{{ $card["images"]["large"] }}')">
                            <div class="wrapper">
                                <span class="count">{{ $card["quantity"] }}x</span>
                                <span class="name">{{ $card["name"] }}</span>
                                <span class="cost">{{ $card["cost"] }}CP</span>
                            </div>
                        </li>
                    @endforeach
                @endif
            </ul>
            <span class="subtext">UPGRADE</span>
            <ul class="deck-list">
                @if(count($deck->cards["upgrades"]) == 0)
                    <li>
                        <div class="wrapper">
                            <span>No cards of this type have been added.</span>
                        </div>
                    </li>
                @else
                    @foreach ($deck->cards["upgrades"] as $card)
                        <li style="background-image: url('{{ $card["images"]["large"] }}')">
                            <div class="wrapper">
                                <span class="count">{{ $card["quantity"] }}x</span>
                                <span class="name">{{ $card["name"] }}</span>
                                <span class="cost">{{ $card["cost"] }}CP</span>
                            </div>
                        </li>
                    @endforeach
                @endif
            </ul>
        </div>
    </div>
@endsection
<script>
    var DECK = {!! json_encode($deck) !!};
    console.log(DECK);
</script>