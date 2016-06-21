<?php

namespace App\Http\Controllers;

use App\Deck;
use App\Hero;
use App\Http\Requests;

class DeckController extends Controller
{
    // Create
    public function index()
    {
        $decks = Deck::all();
        return view('decks.index')->with('decks', $decks);
    }

    // Create
    public function create()
    {
        $heroes = Hero::select('affinities', 'code', 'name', 'image')->orderBy('name', 'asc')->get();
        $cards = app('App\Http\Controllers\CardController')->getCards();
        return view('decks.create')->with('cards', $cards)->with('heroes', $heroes);
    }

    // Store
    public function store()
    {
        // Store item
        return view('decks.create');
    }

    // Read
    public function show($slug)
    {
        //$deck = Deck::where('slug', $slug)->firstOrFail();
        // pass back a dummy object for now
        $deck = new \stdClass();
        $deck->id = 1234535;
        $deck-> title = "This is the tale of captain j...ust sparrow";
        $deck->description = "A really cool deck thatg I always use for sparrow!";
        $deck->author = [
            "name" => "Alex Sims",
            "avatarURL" => ""
        ];
        $deck->cards  = [
            [
                "name" => "Fierce Chrono",
                "code" => "01825fe8223efb2353e853a9e95b3a81",
                "type" => "Upgrade",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/EEABCCD7DD2005085BBD74396932158BC37208FA.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/62BD7305EA1F9B2077E91AC82601531F6CBDD5E3.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/BD5B1269A2C4FFA90DEB9AB60E08B8C52451A34D.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Fury",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "CooldownReductionPercentage",
                        "value" => 0.075000002980232
                    ]
                ]
            ],
            [
                "name" => "Fierce Chrono",
                "code" => "01825fe8223efb2353e853a9e95b3a81",
                "type" => "Upgrade",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/EEABCCD7DD2005085BBD74396932158BC37208FA.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/62BD7305EA1F9B2077E91AC82601531F6CBDD5E3.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/BD5B1269A2C4FFA90DEB9AB60E08B8C52451A34D.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Fury",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "CooldownReductionPercentage",
                        "value" => 0.075000002980232
                    ]
                ]
            ],
            [
                "name" => "Fierce Chrono",
                "code" => "01825fe8223efb2353e853a9e95b3a81",
                "type" => "Upgrade",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/EEABCCD7DD2005085BBD74396932158BC37208FA.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/62BD7305EA1F9B2077E91AC82601531F6CBDD5E3.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/BD5B1269A2C4FFA90DEB9AB60E08B8C52451A34D.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Fury",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "CooldownReductionPercentage",
                        "value" => 0.075000002980232
                    ]
                ]
            ],
            [
                "name" => "Fierce Chrono",
                "code" => "01825fe8223efb2353e853a9e95b3a81",
                "type" => "Upgrade",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/EEABCCD7DD2005085BBD74396932158BC37208FA.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/62BD7305EA1F9B2077E91AC82601531F6CBDD5E3.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/BD5B1269A2C4FFA90DEB9AB60E08B8C52451A34D.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Fury",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "CooldownReductionPercentage",
                        "value" => 0.075000002980232
                    ]
                ]
            ],
            [
                "name" => "Megavolt Pylon",
                "code" => "01937584136fa0656599c0057b58465c",
                "type" => "Active",
                "cost" => 5,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/426E6B9FDA1BFC6D42AB0A744565A13958CC52CB.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/5A2C7D9F9FE03AC5CE65B9B538987AB1ECFC471A.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/0D8525E5A9F3F2E523E7091F09F20CD9868C668F.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Intellect",
                "rarity" => "Uncommon",
                "effects" => [
                    [
                        "stat" => "MaxEnergy",
                        "value" => 75
                    ],
                    [
                        "stat" => "EnergyRegenRate",
                        "value" => 0.30000001192093
                    ],
                    [
                        "description" => "Restore 10 [attr =>mp] for each nearby Unit.",
                        "unique" => true,
                        "cooldown" => 180
                    ]
                ]
            ],
            [
                "name" => "Bump Juice",
                "code" => "01c7f37c0a016156f495259276676d32",
                "type" => "Active",
                "cost" => 1,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/3771DED2A1CAAC7D0CDCD8D26B0BFDBEBCDFBF8F.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/A6EC4EFE6D745565FAE6D50DECF80F14B6959F1B.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/80E279F470A480ACCEAAFBDF66BBD45DCF64281D.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Fury",
                "rarity" => "Rare",
                "effects" => [
                    [
                        "description" => "Instantly restore +85 [attr =>hp] upon use. Charges refresh at base.",
                        "cooldown" => 15
                    ]
                ]
            ],
            [
                "name" => "Strike Token",
                "code" => "0270d7816a451b65cc97d73b47337e3b",
                "type" => "Passive",
                "cost" => 1,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/C282A0D45E7741F29A2AA78CFAE75B719E83E532.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/20B5FB83D7F8E7A7EB2F6F8997260CD4FF2DDCFF.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/22170CB1CF0B753E0FDAEB71F085932A1ECA1BD5.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Universal",
                "rarity" => "Rare",
                "effects" => [
                    [
                        "stat" => "AttackRating",
                        "value" => 7.5757575035095
                    ]
                ]
            ],
            [
                "name" => "Cup of the Vampire",
                "code" => "04502b6b728503c3952c9606a48b1592",
                "type" => "Passive",
                "cost" => 5,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/08469C2F1FC0078A5F3F5358BCBCD455146673A9.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/CC636425CEDA81C89F0AD109C4D3474BD6956DB8.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/A2082FD66A93B441FCE3EF9C9F523A30C544602E.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Corruption",
                "rarity" => "Uncommon",
                "effects" => [
                    [
                        "stat" => "LifeStealRating",
                        "value" => 8
                    ],
                    [
                        "stat" => "PhysicalPenetrationRating",
                        "value" => 16
                    ],
                    [
                        "description" => "+20% [attr =>lfstl] against <keyBleeding</ target(s).",
                        "passive" => true,
                        "unique" => true
                    ]
                ]
            ],
            [
                "name" => "Blood Catalyst",
                "code" => "047b6ae6342015ec2138e5ec90c5c926",
                "type" => "Active",
                "cost" => 6,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/F92579A7EFB4664BA180BC20696739D7C0AE4886.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/5A2C7D9F9FE03AC5CE65B9B538987AB1ECFC471A.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/EC750DD5EB501DE37902037BEA50DDCF74C264E1.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Intellect",
                "rarity" => "Rare",
                "effects" => [
                    [
                        "stat" => "MaxEnergy",
                        "value" => 75
                    ],
                    [
                        "stat" => "MaxHealth",
                        "value" => 100
                    ],
                    [
                        "description" => "Consume 10% of <keycurrent</ [attr =>hp] to gain [attr =>mpreg] equal to <key1/3</ of your [attr =>hpreg] for 10 seconds.",
                        "unique" => true,
                        "cooldown" => 15
                    ]
                ]
            ],
            [
                "name" => "Elysian Diamond",
                "code" => "05611e24ab11970e52fd73d045ea4048",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/0F9AA418ADE31E0EE9EB8C6D441DAEED0577694F.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/8673D1326F5C1E4D4A2DA70F3107370DA2281731.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/1F510B2808A11DCB1A269A99120B241DBFE4BB19.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Order",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "AttackRating",
                        "value" => 7.5757575035095
                    ],
                    [
                        "stat" => "EnergyRegenRate",
                        "value" => 0.30000001192093
                    ],
                    [
                        "stat" => "MaxHealth",
                        "value" => 100
                    ]
                ],
                "maxedEffects" => [
                    [
                        "stat" => "MaxHealth",
                        "value" => 100
                    ]
                ]
            ],
            [
                "name" => "Killdozer Horn",
                "code" => "0613d0a314e63ea242174869e7a3fd59",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/2BACF29918A4E1A47D58B15B8021D34E303DF9C3.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/26B04FD184B6BA496E5761148020E8173902C324.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/DCBD82DEFD316082E6648FF7BF8C37A6D93DF926.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Fury",
                "rarity" => "Uncommon",
                "effects" => [
                    [
                        "stat" => "AttackRating",
                        "value" => 7.5757575035095
                    ],
                    [
                        "description" => "Grants [attr =>physdmg] to nearby Allied Minions.",
                        "passive" => true,
                        "unique" => true
                    ]
                ]
            ],
            [
                "name" => "Blackblood Virus",
                "code" => "065086db1bedc483b253dc7687f8451d",
                "type" => "Passive",
                "cost" => 4,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/BA99526E80D56BD223BE5820B60841D6ED81ED8B.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/A5B9D2357AFAACF5AE90AB0030A4F39C140E8E38.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/6B72C6DCCA02947DD2ADD2F0CDC601C7489792E1.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Corruption",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "LifeStealRating",
                        "value" => 8
                    ]
                ],
                "maxedEffects" => [
                    [
                        "stat" => "CriticalDamageBonus",
                        "value" => 0.5,
                        "unique" => true
                    ]
                ]
            ],
            [
                "name" => "Alpha Heal",
                "code" => "074530f3d4de6815ec1889b00b3dcf72",
                "type" => "Upgrade",
                "cost" => 5,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/A146424EB53D61A3AA48FFFD476B791CEC9AB036.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/2FBA56D646ABD1FDCEB831B322CC14B29A4A8DB7.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/9934DE1770202FCDD8E0B45D82DF5A43F336C682.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Growth",
                "rarity" => "Uncommon",
                "effects" => [
                    [
                        "stat" => "HealthRegenRate",
                        "value" => 7
                    ]
                ]
            ],
            [
                "name" => "The Centurion",
                "code" => "097bcbd800aac7540e710a7b3775d5a0",
                "type" => "Prime",
                "cost" => 0,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/CA60BE65EB3160F0F3CD42F42A22FB4DE1E63663.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/3CB1479DD718157527AB0B3E902E01AA110C08D2.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/357854D53974FFC8FDF0E83C7B7254B7824E53CC.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Universal",
                "rarity" => "Starter",
                "effects" => [
                    [
                        "stat" => "MaxHealth",
                        "value" => 1000
                    ],
                    [
                        "stat" => "DamageBonusSource",
                        "value" => 1,
                        "unique" => true
                    ],
                    [
                        "description" => "+500 Max Health to Minions",
                        "passive" => true,
                        "unique" => true
                    ]
                ]
            ],
            [
                "name" => "Riftmagus Scepter",
                "code" => "0bc555d307961c5e8c85ef75e088563d",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/5EEA5BC70278340920E44DEFD9859F49E8525130.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/B1F7DC23FD200CF26A3A330EAED43A928FAB4441.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/EF5F804EC35D9BB12B2ECEE1E03E4D84A403C9F4.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Universal",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "AttackRating",
                        "value" => 7.5757575035095
                    ],
                    [
                        "stat" => "CriticalDamageChance",
                        "value" => 0.029999999329448
                    ]
                ],
                "maxedEffects" => [
                    [
                        "stat" => "AttackRating",
                        "value" => 7.5757575035095
                    ],
                    [
                        "stat" => "CriticalDamageChance",
                        "value" => 0.029999999329448
                    ]
                ]
            ],
            [
                "name" => "Basic Chrono",
                "code" => "0c6728d1a74eebffeb9429b8cbf1f6bd",
                "type" => "Upgrade",
                "cost" => 1,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/C299E0618E78C0FC16A930DE2565359F8BD90C24.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/20B5FB83D7F8E7A7EB2F6F8997260CD4FF2DDCFF.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/962CC41030377475B60BB0769BD2218D5D76640E.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Universal",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "CooldownReductionPercentage",
                        "value" => 0.025000000372529
                    ]
                ]
            ],
            [
                "name" => "Cast Token",
                "code" => "0cef4a7592310f9d524ade712df3be27",
                "type" => "Passive",
                "cost" => 1,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/A8C65839055235F342C0A0A7B33CD2253F5F2228.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/20B5FB83D7F8E7A7EB2F6F8997260CD4FF2DDCFF.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/7E0975E36E7CEA217DACBB2730BAB15BA4EFBB47.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Universal",
                "rarity" => "Rare",
                "effects" => [
                    [
                        "stat" => "AttackRating",
                        "value" => 7.5757575035095
                    ]
                ]
            ],
            [
                "name" => "Hex of the Devastator",
                "code" => "0d61e59040ff958a2c8764b560789b53",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/0F67374472A72D208D76861EEB10201551537124.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/463CF1804C72A1DC57BDF643C0DD9E54D3EEF3A6.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/51DD636C7F97748E17F54BDC2E1F604BF5022333.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Corruption",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "EnergyPenetrationRating",
                        "value" => 16
                    ],
                    [
                        "stat" => "CriticalDamageChance",
                        "value" => 0.029999999329448
                    ]
                ],
                "maxedEffects" => [
                    [
                        "stat" => "CriticalDamageChance",
                        "value" => 0.059999998658895
                    ]
                ]
            ],
            [
                "name" => "Ring of the Domina",
                "code" => "0e52bdade58cc95bc925e39319fd1f54",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/1E1838477DFFC6413F8104EC03FB79FD9897F220.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/20B5FB83D7F8E7A7EB2F6F8997260CD4FF2DDCFF.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/7911EA8B5C3FCDE3E25F56D4DF145CB9149E36D5.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Universal",
                "rarity" => "Rare",
                "effects" => [
                    [
                        "stat" => "MaxHealth",
                        "value" => 100
                    ],
                    [
                        "stat" => "MaxEnergy",
                        "value" => 75
                    ],
                    [
                        "description" => "+15% [attr =>dmgbns] to minions.",
                        "passive" => true,
                        "unique" => true
                    ]
                ]
            ],
            [
                "name" => "Sinister Pierce",
                "code" => "0ed69d51123dcfad73b2e72aee07de58",
                "type" => "Upgrade",
                "cost" => 4,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/FE82FED7510C215F6D9C207FDCA048EF4EC4EEF2.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/CC636425CEDA81C89F0AD109C4D3474BD6956DB8.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/D86E31A23BE231F45913524EF65E9FF692AF77EF.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Corruption",
                "rarity" => "Uncommon",
                "effects" => [
                    [
                        "stat" => "PhysicalPenetrationRating",
                        "value" => 64
                    ]
                ]
            ],
            [
                "name" => "Circlet of Health",
                "code" => "0f3e030b277477280bdcd6bf5bbc48c8",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/E27299463F93D1477181146431774DEEEF5F0AA9.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/20B5FB83D7F8E7A7EB2F6F8997260CD4FF2DDCFF.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/5C69C2D65F922FF97F655B733E5724F83F2E032E.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Universal",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "MaxEnergy",
                        "value" => 75
                    ],
                    [
                        "description" => "Grants +4.2 [attr =>hpreg] to nearby Allies.",
                        "passive" => true,
                        "unique" => true
                    ]
                ]
            ],
            [
                "name" => "Savage Remedy",
                "code" => "1084124e45a47e0e398759552dfea86a",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/034567ED2AD1D8EE4BD3CE7C5FA9F03C58718AA7.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/26E34543CFF0DE80AB9C91CF7DEC500C165A758E.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/E95FC42954298EC237020D0D83D1F57966792C81.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Growth",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "MaxEnergy",
                        "value" => 75
                    ],
                    [
                        "stat" => "HealthRegenRate",
                        "value" => 1.3999999761581
                    ]
                ],
                "maxedEffects" => [
                    [
                        "stat" => "HealthRegenRate",
                        "value" => 2.7999999523163
                    ]
                ]
            ],
            [
                "name" => "Quenching Scales",
                "code" => "10b33ef69ccefc6433f4509c09b59360",
                "type" => "Passive",
                "cost" => 4,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/1089538C82A9CE5D5D3A06F1BCB47E43C568F76D.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/9C42C8CDF1443CFF51F0E79832E0E7E792C80F7E.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/C9A1D09102C87B307E5AF2819E69BA59B1426F2B.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Growth",
                "rarity" => "Rare",
                "effects" => [
                    [
                        "stat" => "HealthRegenRate",
                        "value" => 1.3999999761581
                    ],
                    [
                        "stat" => "EnergyRegenRate",
                        "value" => 0.30000001192093
                    ],
                    [
                        "description" => "While <keyBurning</, gain +66 [attr =>enar]",
                        "passive" => true,
                        "unique" => true
                    ]
                ]
            ],
            [
                "name" => "Pendulum of Lords",
                "code" => "10bc89f201888a4bd3a4c913dd0845ef",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/949398ABB83F7638F4ADE8D2687F5741C18AF872.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/F89CB3E81812122A7ED88D42D75A3EAB38991994.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/4A93F2B2B08973CE88777232E2DD68A9308D67B4.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Universal",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "MaxEnergy",
                        "value" => 75
                    ],
                    [
                        "stat" => "MaxHealth",
                        "value" => 100
                    ],
                    [
                        "stat" => "CooldownReductionPercentage",
                        "value" => 0.025000000372529
                    ]
                ],
                "maxedEffects" => [
                    [
                        "stat" => "CooldownReductionPercentage",
                        "value" => 0.025000000372529
                    ]
                ]
            ],
            [
                "name" => "Seeds of the Flood",
                "code" => "11e02452b5d5195ac96cb4091643dc05",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/7B4BC004A59B5F37B33E852077CEEFB34622D5FB.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/9C42C8CDF1443CFF51F0E79832E0E7E792C80F7E.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/DA5F2A085F805A7DE78F3151C83DA929043708FE.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Growth",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "HealthRegenRate",
                        "value" => 1.3999999761581
                    ]
                ],
                "maxedEffects" => [
                    [
                        "stat" => "CriticalDamageBonus",
                        "value" => 0.5,
                        "unique" => true
                    ]
                ]
            ],
            [
                "name" => "Barrier Token",
                "code" => "12b8d071af0e2f421799a2d8c8e9cec0",
                "type" => "Passive",
                "cost" => 1,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/9FB3446AF28833ADE606FE406ED0E78CE52EA9AE.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/20B5FB83D7F8E7A7EB2F6F8997260CD4FF2DDCFF.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/82E01405BF09BE43517AA7545568782E3CFA9BE3.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Universal",
                "rarity" => "Rare",
                "effects" => [
                    [
                        "stat" => "EnergyResistanceRating",
                        "value" => 22
                    ]
                ]
            ],
            [
                "name" => "Healer Token",
                "code" => "13101da1cd131b9b68b4bd3c4dd72cb4",
                "type" => "Passive",
                "cost" => 2,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/84CA2FC75166E686D030100B3C75C1FF79D7CF9E.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/20B5FB83D7F8E7A7EB2F6F8997260CD4FF2DDCFF.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/E26A65AEAF078A4310294646EDEA91E7779BBE49.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Universal",
                "rarity" => "Rare",
                "effects" => [
                    [
                        "stat" => "HealthRegenRate",
                        "value" => 2.7999999523163
                    ]
                ]
            ],
            [
                "name" => "Meltdown",
                "code" => "1364d04427326555cbafbac71d6b14a5",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/20D05C5286804C9D20366C62997379A99C3B2104.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/A4EB9B6661B5313565A4938D61D35E96B3CFC545.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/7DFB370CC1C1C128ABFF5D9554FF03E2C1DF1BF8.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Fury",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "AttackRating",
                        "value" => 15.151515007019
                    ],
                    [
                        "stat" => "EnergyPenetrationRating",
                        "value" => 16
                    ]
                ],
                "maxedEffects" => [
                    [
                        "stat" => "AttackRating",
                        "value" => 7.5757575035095
                    ]
                ]
            ],
            [
                "name" => "Snakevine Mesh",
                "code" => "16498fcba489dc1259fd8ab71a200b16",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/2A79D3DAA5A3DD441A2C38E274C7486A70752BF9.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/C1705FF5F2359B39441E3706FB40152186918271.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/883F3E917D6FCDAF5E1BDCAE5B7C2735D25C20B2.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Growth",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "EnergyResistanceRating",
                        "value" => 22
                    ],
                    [
                        "stat" => "AttackRating",
                        "value" => 7.5757575035095
                    ]
                ],
                "maxedEffects" => [
                    [
                        "stat" => "AttackRating",
                        "value" => 15.151515007019
                    ]
                ]
            ],
            [
                "name" => "Chrono-vore",
                "code" => "176e7ae1b0019c8b743f3baf946d812e",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/1917492F36ED8D806BD4A19CFA361C588D042A29.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/DC813317DDE2EC0A5CF8F5D5D3B89432B76FFEC5.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/67883F2973F7DEDBFFE0ABF2AE99F1B3026C49BA.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Fury",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "AttackSpeedRating",
                        "value" => 6.5
                    ],
                    [
                        "stat" => "CooldownReductionPercentage",
                        "value" => 0.050000000745058
                    ]
                ],
                "maxedEffects" => [
                    [
                        "stat" => "CooldownReductionPercentage",
                        "value" => 0.025000000372529
                    ]
                ]
            ],
            [
                "name" => "Drain",
                "code" => "17faaad742b81920e0e3c405c2c8f8a4",
                "type" => "Upgrade",
                "cost" => 2,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/40F01F038461C8544A0B860A8D3DA992E4632C2C.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/20B5FB83D7F8E7A7EB2F6F8997260CD4FF2DDCFF.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/96EB9443B1D5FB2E5B7ABBCD2CAD25B45F75FEC3.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Universal",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "LifeStealRating",
                        "value" => 8
                    ]
                ]
            ],
            [
                "name" => "Wellspring Staff",
                "code" => "189aa81c68494377fad9db1826156d47",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/869D2A51592AC387A3B4E08C85B25C6D2171B698.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/20B5FB83D7F8E7A7EB2F6F8997260CD4FF2DDCFF.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/6B83E04944A6A03C19140EAE2EA9722FE0ED936D.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Universal",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "AttackRating",
                        "value" => 7.5757575035095
                    ],
                    [
                        "stat" => "MaxEnergy",
                        "value" => 75
                    ]
                ],
                "maxedEffects" => [
                    [
                        "stat" => "AttackRating",
                        "value" => 15.151515007019
                    ]
                ]
            ],
            [
                "name" => "Reaper's Key",
                "code" => "193253d1bc228eaf023dd3b5f289b207",
                "type" => "Passive",
                "cost" => 2,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/B149732CF11EC37C3437223AAE73A239D6D03439.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/A3BA35394B83255539BAD9A6ED9AAC481E9AA3C4.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/C4CBDC1AC2401F70220B94E6DAB3D570056ADB0D.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Corruption",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "WellRigPlacementTimer",
                        "value" => 3,
                        "unique" => true
                    ],
                    [
                        "stat" => "AttackRating",
                        "value" => 7.5757575035095
                    ],
                    [
                        "stat" => "CriticalDamageChance",
                        "value" => 0.029999999329448
                    ],
                    [
                        "description" => "Harvester Key, charges refresh at base.",
                        "passive" => true,
                        "unique" => true
                    ]
                ]
            ],
            [
                "name" => "Heart of the Apex",
                "code" => "1adf047d7ab28edea5bf556612621e99",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/41402CFB9BFCF1D7571B9A11EA3B826F967FA065.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/D276FC2320532FF4CE2F1BE85B9534ED1F98A1A2.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/555F1D89B3F79E4752846894ECEBAC7A07FAB63E.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Growth",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "MaxHealth",
                        "value" => 100
                    ]
                ],
                "maxedEffects" => [
                    [
                        "stat" => "CriticalDamageBonus",
                        "value" => 0.5,
                        "unique" => true
                    ]
                ]
            ],
            [
                "name" => "Heartshot",
                "code" => "1aebb5dd8222875507b2086ec7fb145c",
                "type" => "Passive",
                "cost" => 5,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/A2BFAA6B579AFC626E88E2A2A23AEB988E607060.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/26B04FD184B6BA496E5761148020E8173902C324.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/C402B11D5A19E3971065D5B638348FB8A1F9CEA9.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Fury",
                "rarity" => "Uncommon",
                "effects" => [
                    [
                        "stat" => "AttackSpeedRating",
                        "value" => 6.5
                    ],
                    [
                        "description" => "<keyOn Player kill</, gain +280 [attr =>spd] for 6 seconds.",
                        "passive" => true,
                        "unique" => true
                    ]
                ]
            ],
            [
                "name" => "Sorcerer's Ward",
                "code" => "1f072cf2a9287b08b59c926e95241dab",
                "type" => "Active",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/5365B1F1155920C30E7ADD96C0BFE014E9FE9B21.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/FF6D705C66BD147B15ED21FD86B10120FA763817.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/1962121C7A7D619E44E61E81DDB5BEEA61063885.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Corruption",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "AttackRating",
                        "value" => 7.5757575035095
                    ],
                    [
                        "stat" => "EnergyPenetrationRating",
                        "value" => 16
                    ],
                    [
                        "stat" => "LifeStealRating",
                        "value" => 4
                    ],
                    [
                        "description" => "Place a <keyShadow Ward</ to reveal the surrounding area for 3 minutes. Charges refresh at base.",
                        "unique" => true,
                        "cooldown" => 1
                    ]
                ]
            ],
            [
                "name" => "Power Chord",
                "code" => "1ff4eba3fbcb58df4bc2579c28593e3d",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/5078871A486F9AB40CC20F4A5B2211EA19274778.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/26B04FD184B6BA496E5761148020E8173902C324.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/3DB7FF63B244DE21B4940F80FDF8C12980520D69.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Fury",
                "rarity" => "Uncommon",
                "effects" => [
                    [
                        "stat" => "AttackRating",
                        "value" => 7.5757575035095
                    ],
                    [
                        "description" => "Grants [attr =>endmg] to nearby Allied Minions.",
                        "passive" => true,
                        "unique" => true
                    ]
                ]
            ],
            [
                "name" => "Heal",
                "code" => "2041b110aadd2e4734e6267d39cbe448",
                "type" => "Upgrade",
                "cost" => 2,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/F2DB5033F9E92CE636FF7ACF32DA94F5506BE5C8.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/20B5FB83D7F8E7A7EB2F6F8997260CD4FF2DDCFF.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/EAD7858950CB83E47000A20210A480579C7B4064.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Universal",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "HealthRegenRate",
                        "value" => 2.7999999523163
                    ]
                ]
            ],
            [
                "name" => "Chronospike",
                "code" => "205bc2aa5924d7e0594d8b5b95c79874",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/5B6011E19F4601EDE4BB10605B2B20F08F350108.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/836811E22728202B17D9DECC15E06B1CEB934669.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/5564AA289EFA3ABEAC56774119BF233007476B5C.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Universal",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "MaxEnergy",
                        "value" => 75
                    ],
                    [
                        "stat" => "AttackRating",
                        "value" => 7.5757575035095
                    ]
                ],
                "maxedEffects" => [
                    [
                        "stat" => "CooldownReductionPercentage",
                        "value" => 0.050000000745058
                    ]
                ]
            ],
            [
                "name" => "Fountain Spike",
                "code" => "20de9c03299d3616f6a4382c38e248d5",
                "type" => "Passive",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/119B9F9339A77E2F1D1B4E27D5F5D77A159F2609.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/0D1A77B97E8A4F99809FF6FE0FEB2B81FC4A1DB3.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/00387F210CDE8D303A4A757CAE9506A6CB3B7BE2.png"
                ],
                "upgradeSlots" => 3,
                "affinity" => "Universal",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "AttackRating",
                        "value" => 7.5757575035095
                    ],
                    [
                        "stat" => "MaxEnergy",
                        "value" => 75
                    ]
                ],
                "maxedEffects" => [
                    [
                        "stat" => "AttackRating",
                        "value" => 15.151515007019
                    ]
                ]
            ],
            [
                "name" => "Minor Shock",
                "code" => "215606110e3b4a0ecc22646e8923c44e",
                "type" => "Upgrade",
                "cost" => 1,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/438B9829FE86ED695D0B1060E983931E1C2FD28F.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/20B5FB83D7F8E7A7EB2F6F8997260CD4FF2DDCFF.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/05DCFDA2FC4EE0D27785CC0435763D3C41209B9D.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Universal",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "EnergyPenetrationRating",
                        "value" => 16
                    ]
                ]
            ],
            [
                "name" => "Divine Health",
                "code" => "2162f33925673c1f72647e3c944ec7f7",
                "type" => "Upgrade",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/F78074830B64D2284A1523E72AEC8E5D0D44D417.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/2592B73F6922F6C03939C793B05C4DD813C3981B.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/2C3348DB28C08456CA211CD53F78CD1AC31E0502.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Order",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "MaxHealth",
                        "value" => 300
                    ]
                ]
            ],
            [
                "name" => "Dire Pierce",
                "code" => "21d545b2905aedbe4015535cd69a53e8",
                "type" => "Upgrade",
                "cost" => 3,
                "images" => [
                    "large" => "//developer-paragon-cdn.epicgames.com/Images/F2AFD133430A620CD3EC7C6A5CFC6A45793AA622.png",
                    "icon" => "//developer-paragon-cdn.epicgames.com/Images/CC636425CEDA81C89F0AD109C4D3474BD6956DB8.png",
                    "medium" => "//developer-paragon-cdn.epicgames.com/Images/0173FD87E58E2FBF5C2F24F4720FCBD64150B308.png"
                ],
                "upgradeSlots" => 0,
                "affinity" => "Corruption",
                "rarity" => "Common",
                "effects" => [
                    [
                        "stat" => "PhysicalPenetrationRating",
                        "value" => 48
                    ]
                ]
            ]
        ];
        $deck->builds = [];
        $deck->upvotes = 5432;
        $deck->commentCount = 345343;
        $deck->viewCount = 233231;
        $deck->hero = [
            "name" => "Sparrow",
            "avatarURL" => "/assets/example-panel1.jpg"
        ];
        $deck->totalCards = count($deck->cards);

        // Sort the cards to quantity, we set the totalCards before as this
        // will directly modify the state of the cards array, removing some
        // elements in exchange for adding a "quantity" key for each obj.
        $sortedCards = [
            "prime" => [],
            "equipment" => [],
            "upgrades" => []
        ];

        foreach($deck->cards as $card) {
            $key = "";
            switch($card["type"]) {
                case "Prime": $key = "prime" ; break;
                case "Active": $key = "equipment"; break;
                case "Passive": $key = "equipment"; break;
                case "Upgrade": $key = "upgrades"; break;
                default : break;
            }
            if(count($sortedCards) == 0){
                $card["quantity"] = 1;
                array_push($sortedCards[$key], $card);

            } else {
                $exists = false;
                $index = 0;
                foreach($sortedCards[$key] as $sortedCard) {
                    if($card["code"] == $sortedCard["code"]) {
                        $exists = true;
                        $sortedCards[$key][$index]["quantity"] += 1;
                    }
                    $index++;
                }
                if($exists == false) {
                    if(!isset($card["quantity"])) {
                        $card["quantity"] = 1;
                    }
                    array_push($sortedCards[$key], $card);
                }
            }
        }
        $deck->cards = $sortedCards;
        return view('decks.show')->with('deck', $deck);
    }

    // Edit
    public function edit($id)
    {
        $deck = Deck::findOrFail($id);
        return view('decks.edit')->with('deck', $deck);
    }

    // Update
    public function update($id)
    {
        $deck = Deck::findOrFail($id);
        return view('decks.edit')->with('deck', $deck);
    }

    // Delete
    public function delete($id)
    {
        $deck = Deck::findOrFail($id);
        $deck->delete();
        return view('home');
    }
}
