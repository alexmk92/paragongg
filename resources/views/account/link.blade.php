@extends('layouts/app')
@section('body')
    @include('account.nav')
    <div class="wrapper">
        <h3><i class="fa fa-link" aria-hidden="true"></i> Link your Epic Games account</h3>
        <div class="content-wrapper">
        <p>We're just doing some maintenance on this part of the site, and hope to be back shortly. Thanks for bearing with us!</p>
            </div>
        {{--@if($user->epic_account_id)--}}
            {{--<h3><i class="fa fa-check-circle" aria-hidden="true"></i> Your account is linked</h3>--}}
            {{--<div class="content-wrapper">--}}
                {{--<img src="/assets/images/heroes/steel-cutout.png" class="linked-success" />--}}
                {{--<p><strong>Awesome!</strong> Your Epic account is linked to your Paragon.gg account! You can now enjoy all of the extra features this provides.</p>--}}
                {{--<ul class="default">--}}
                    {{--<li>See which cards you own, and which you still need to collect</li>--}}
                    {{--<li>Import and export your decks directly to the game</li>--}}
                    {{--<li>Much more, very soon!</li>--}}
                {{--</ul>--}}
                {{--<p>Please note you can unlink your account at any time, by clicking the <em>"Unlink Epic Account"</em> button below. Doing so does mean that you will lose out on the extra features having a linked account gives you.</p>--}}
                {{--<p><a class="btn btn-faded btn-warning-hover" href="/account/unlink"><i class="fa fa-chain-broken" aria-hidden="true"></i> Unlink Epic account</a></p>--}}
            {{--</div>--}}
        {{--@else--}}
            {{--<h3><i class="fa fa-link" aria-hidden="true"></i> Link your Epic Games account</h3>--}}
            {{--<div class="content-wrapper">--}}
                {{--<p><strong>Linking your Epic account on Paragon.gg allows you to:</strong></p>--}}
                {{--<ul class="default">--}}
                    {{--<li>See which cards you own, and which you still need to collect</li>--}}
                    {{--<li>Import and export your decks directly to the game</li>--}}
                    {{--<li>Much more, very soon!</li>--}}
                {{--</ul>--}}
                {{--<p>You have not yet linked your Epic Games account to your Paragon.GG account. To do this, please click the link below. This will open a link to the Epic Games authentication servers and is completely secure. You are not required to enter your Epic account details on our website.</p>--}}
                {{--<p><a class="btn" href="https://accounts.epicgames.com/login/index?state=/account&client_id=8483bd1714c44d33ab64277635d68464&loginSubheading=Paragon.GG+Account+Link"><i class="fa fa-link" aria-hidden="true"></i> Link Epic account</a></p>--}}
            {{--</div>--}}
        {{--@endif--}}
    </div>
@endsection
