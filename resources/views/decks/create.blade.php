@extends('layouts/app')
@section('body')
    <div id="sidebar">
        <div class="sidebox panel cf">
            <h3>Current Deck</h3>
            <ul class="deck-list">
                <div class="deck-list-actions">
                    <a class="btn btn-primary"><i class="fa fa-plus" aria-hidden="true"></i> Add card to deck</a>
                    <span class="deck-total">39/40 Cards</span>
                </div>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_S_U_02/icon.png);">
                    <div class="wrapper">
                        <span class="count">1x</span>
                        <span class="name">The Archmagus</span>
                        <span class="cost"></span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_S_U_06/icon.png);">
                    <div class="wrapper">
                        <span class="count">1x</span>
                        <span class="name">Health Potion</span>
                        <span class="cost">1CP</span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_F_02/icon.png);">
                    <div class="wrapper">
                        <span class="count">1x</span>
                        <span class="name">Madstone Gem</span>
                        <span class="cost">2CP</span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_24/icon.png);">
                    <div class="wrapper">
                        <span class="count">1x</span>
                        <span class="name">Agoran Scepter</span>
                        <span class="cost">3CP</span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_F_13/icon.png);">
                    <div class="wrapper">
                        <span class="count">1x</span>
                        <span class="name">Brand of the Ironeater</span>
                        <span class="cost">3CP</span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_F_04/icon.png);">
                    <div class="wrapper">
                        <span class="count">1x</span>
                        <span class="name">Meltdown</span>
                        <span class="cost">3CP</span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_F_06/icon.png);">
                    <div class="wrapper">
                        <span class="count">1x</span>
                        <span class="name">Micro-Nuke</span>
                        <span class="cost">3CP</span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_02/icon.png);">
                    <div class="wrapper">
                        <span class="count">3x</span>
                        <span class="name">Riftmagus Scepter</span>
                        <span class="cost">3CP</span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_29/icon.png);">
                    <div class="wrapper">
                        <span class="count">1x</span>
                        <span class="name">Staff of Adamant</span>
                        <span class="cost">3CP</span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_18/icon.png);">
                    <div class="wrapper">
                        <span class="count">1x</span>
                        <span class="name">Whirling Wand</span>
                        <span class="cost">3CP</span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_05/icon.png);">
                    <div class="wrapper">
                        <span class="count">1x</span>
                        <span class="name">Minor Kinetic</span>
                        <span class="cost">1CP</span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_04/icon.png);">
                    <div class="wrapper">
                        <span class="count">6x</span>
                        <span class="name">Cast</span>
                        <span class="cost">2CP</span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_06/icon.png);">
                    <div class="wrapper">
                        <span class="count">4x</span>
                        <span class="name">Kinetic</span>
                        <span class="cost">2CP</span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_55/icon.png);">
                    <div class="wrapper">
                        <span class="count">1x</span>
                        <span class="name">Shock</span>
                        <span class="cost">2CP</span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_47/icon.png);">
                    <div class="wrapper">
                        <span class="count">5x</span>
                        <span class="name">Wound</span>
                        <span class="cost">2CP</span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_I_16/icon.png);">
                    <div class="wrapper">
                        <span class="count">2x</span>
                        <span class="name">Focused Shock</span>
                        <span class="cost">3CP</span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_U_U_14/icon.png);">
                    <div class="wrapper">
                        <span class="count">1x</span>
                        <span class="name">Greater Drain</span>
                        <span class="cost">3CP</span>
                    </div>
                </li>
                <li style="background-image:url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_U_U_02/icon.png);">
                    <div class="wrapper">
                        <span class="count">8x</span>
                        <span class="name">Major Cast</span>
                        <span class="cost">3CP</span>
                    </div>
                </li>
            </ul>
        </div>

    </div>
    <div class="wrapper">
        <div class="content-wrapper">
            <span class="breadcrumb">Build a deck</span>
            <input class="h2" value="My new deck">
            <div class="p" contentEditable="true">Write a short description about your deck. What team compositions might you use this deck against? Under what situations would you use the different builds? Click here to edit the description text.</div>
            <div class="deck-builder">

            </div>
            <form>
                <label><input type="checkbox" checked> Make this deck public</label>
                <button name="publish" type="submit" class="btn"><i class="fa fa-check" aria-hidden="true"></i> Save this deck</button>
            </form>
        </div>
    </div>
@endsection
