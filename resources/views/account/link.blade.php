@extends('layouts/app')
@section('body')
    @include('account.nav')
    <div class="wrapper">
        <h3>Link your Epic Games account</h3>
        <div class="content-wrapper">
            <p>You currently have not linked your Epic Games account to your Paragon.GG account. To do this, please click the link below. This will open a link to the Epic Games authentication servers and is completely secure.</p>
            <p><a class="btn" href="https://accounts.epicgames.com/login/index?state=/account&client_id=8483bd1714c44d33ab64277635d68464&loginSubheading=Paragon.GG+Account+Link"><i class="fa fa-lock" aria-hidden="true"></i> Link Epic account</a></p>
        </div>
    </div>
@endsection
