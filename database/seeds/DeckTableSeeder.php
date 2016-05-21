<?php

use App\Deck;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

class DeckTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Simple deck to test
        $deck = new Deck();
        $deck->title = "Jamie's Test Deck";
        $deck->description = "This is a test deck that we will be using";
        $deck->hero = "HeroData_ArcBlade";
        $deck->public = true;
        $deck->votes = 10;
            $cards = new Collection();
                $card = new Collection();
                $card->code = 'Beta_C_C_02';
                $card->count = 3;
                $cards->push($card);
                $card = new Collection();
                $card->code = 'Beta_C_C_03';
                $card->count = 3;
                $cards->push($card);
        $deck->cards = $cards;
            $builds = new Collection();
                $build = new Collection();
                $build->title = "Early Game";
                    $cards = new Collection();
                    $card->code = 'Beta_C_C_02';
                    $card->index = 1;
                    $card->parent = 0;
                    $cards->push($card);
                    $card = new Collection();
                    $card->index = 2;
                    $card->parent = 0;
                    $cards->push($card);
                    $card = new Collection();
                    $card->index = 3;
                    $card->parent = 0;
                    $cards->push($card);
                    $card = new Collection();
                    $card->index = 4;
                    $card->parent = 0;
                    $cards->push($card);
                $build->cards = $cards;
                $builds->push($build);
                $build = new Collection();
                $build->title = "Mid Game";
                $cards = new Collection();
                $card->code = 'Beta_C_C_02';
                $card->index = 1;
                $card->parent = 0;
                $cards->push($card);
                $card = new Collection();
                $card->index = 2;
                $card->parent = 0;
                $cards->push($card);
                $card = new Collection();
                $card->index = 3;
                $card->parent = 0;
                $cards->push($card);
                $card = new Collection();
                $card->index = 4;
                $card->parent = 0;
                $cards->push($card);
                $build->cards = $cards;
                $builds->push($build);
        $deck->builds = $builds;
        $deck->save();
    }
}
