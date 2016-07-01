@extends('layouts/app')
@section('body')
    @include('account.nav')
    <div class="wrapper">
        @if($user->epic_account_id)
            <h3><i class="fa fa-check-circle" aria-hidden="true"></i> Your account is linked</h3>
            <div class="content-wrapper">
                <p>Your Epic account is linked to your Paragon.gg account! You can now enjoy all of the extra features this provides.</p>
                {{--<p><a class="btn" href="https://accounts.epicgames.com/logout?client_id=8483bd1714c44d33ab64277635d68464&loginSubheading=Unlink+Paragon.GG+Account"><i class="fa fa-times" aria-hidden="true"></i> Unlink Epic account</a></p>--}}
                <p><a class="btn btn-faded btn-warning-hover" href="/account/unlink"><i class="fa fa-link" aria-hidden="true"></i> Unlink Epic account</a></p>
            </div>
        @else
            <h3>Link your Epic Games account</h3>
            <div class="content-wrapper">
                <p>You have not yet linked your Epic Games account to your Paragon.GG account. To do this, please click the link below. This will open a link to the Epic Games authentication servers and is completely secure.</p>
                <p><a class="btn" href="https://accounts.epicgames.com/login/index?state=/account&client_id=8483bd1714c44d33ab64277635d68464&loginSubheading=Paragon.GG+Account+Link"><i class="fa fa-link" aria-hidden="true"></i> Link Epic account</a></p>
            </div>
        @endif
    </div>
@endsection
