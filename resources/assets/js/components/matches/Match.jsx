var React = require('react');
var ReactDOM = require('react-dom');

var GameClock = require('./GameClock');
var EventFeed = require('./EventFeed');
var MatchInfo = require('./MatchInfo');
var TeamPanel = require('./TeamPanel');

var Match = React.createClass({
    getInitialState: function() {
        return {
            matchInfo: null,
            maxStats: null
        }
    },
    shouldComponentUpdate: function() {
        return true;
    },
    componentWillMount: function() {
        this.victor = false;
        this.getMatchInformation();
    },
    componentDidMount: function() {
        setInterval(function() {
             this.getMatchInformation();
             this.victor = true;
        }.bind(this), 1000);
    },
    // used so we can share between stat panels
    computeMaxStats: function(matchData) {
        var maxStats = {
            maxHeroDamage: 0,
            maxTowerDamage: 0,
            maxMinionDamage: 0,
            maxJungleDamage: 0,
            maxHarvesterDamage: 0,
            maxInhibitorDamage: 0
        };

        matchData.players.forEach(function(player) {
            if(player.damageToHeroes > maxStats.maxHeroDamage) maxStats.maxHeroDamage = player.damageToHeroes;
            if(player.damageToTowers > maxStats.maxTowerDamage) maxStats.maxTowerDamage = player.damageToTowers;
            if(player.damageToMinions > maxStats.maxMinionDamage) maxStats.maxMinionDamage = player.damageToMinions;
            if(player.damageToJungle > maxStats.maxJungleDamage) maxStats.maxJungleDamage = player.damageToJungle;
            if(player.damageToHarvesters > maxStats.maxHarvesterDamage) maxStats.maxHarvesterDamage = player.damageToHarvesters;
            if(player.damageToInhibitors > maxStats.maxInhibitorDamage) maxStats.maxInhibitorDamage = player.damageToInhibitors;
        });

        return maxStats;
    },
    getMatchInformation: function() {
        var matchInfo = {"replayId":"a341dd8967af4a5b8ef3ad53595584a2","startedAt":"2016-08-03T09:52:22.994Z","lastCheckpointTime":4441335,"newCheckpointTime":4501363,"isLive":false,"gameType":"SOLO AI","players":[{"team":0,"hero":"HeroData_Kurohane","username":"GODFATHER_E05","accountId":"11a5e95d3b2b47ccbf8b947989b1a24f","damageToTowers":30710,"damageToHeroes":66784,"damageToJungle":15784,"damageToMinions":254477,"damageToHarvesters":0,"damageToInhibitors":13107,"heroLevel":15,"deaths":9,"assists":6,"towerLastHits":0,"mmr":null,"kills":2},{"team":0,"hero":"HeroData_Hammer","username":"Red_Sevarog","accountId":"bot","damageToTowers":0,"damageToHeroes":0,"damageToJungle":0,"damageToMinions":0,"damageToHarvesters":0,"damageToInhibitors":0,"heroLevel":15,"deaths":9,"assists":3,"towerLastHits":2,"mmr":null,"kills":12},{"team":0,"hero":"HeroData_Gadget","username":"Red_Gadget","accountId":"bot","damageToTowers":0,"damageToHeroes":0,"damageToJungle":0,"damageToMinions":0,"damageToHarvesters":0,"damageToInhibitors":0,"heroLevel":15,"deaths":6,"assists":7,"towerLastHits":0,"mmr":null,"kills":5},{"team":0,"hero":"HeroData_Totem","username":"Red_Dekker","accountId":"bot","damageToTowers":0,"damageToHeroes":0,"damageToJungle":0,"damageToMinions":0,"damageToHarvesters":0,"damageToInhibitors":0,"heroLevel":15,"deaths":14,"assists":4,"towerLastHits":0,"mmr":null,"kills":4},{"team":0,"hero":"HeroData_Price","username":"Red_Murdock","accountId":"bot","damageToTowers":0,"damageToHeroes":0,"damageToJungle":0,"damageToMinions":0,"damageToHarvesters":0,"damageToInhibitors":0,"heroLevel":15,"deaths":7,"assists":5,"towerLastHits":1,"mmr":null,"kills":14},{"team":1,"hero":"HeroData_HyperBreach","username":"Blue_Howitzer","accountId":"bot","damageToTowers":0,"damageToHeroes":0,"damageToJungle":0,"damageToMinions":0,"damageToHarvesters":0,"damageToInhibitors":0,"heroLevel":15,"deaths":7,"assists":4,"towerLastHits":2,"mmr":null,"kills":17},{"team":1,"hero":"HeroData_RiftMage","username":"Blue_Gideon","accountId":"bot","damageToTowers":0,"damageToHeroes":0,"damageToJungle":0,"damageToMinions":0,"damageToHarvesters":0,"damageToInhibitors":0,"heroLevel":15,"deaths":5,"assists":6,"towerLastHits":1,"mmr":null,"kills":12},{"team":1,"hero":"HeroData_ArcBlade","username":"Blue_Feng Mao","accountId":"bot","damageToTowers":0,"damageToHeroes":0,"damageToJungle":0,"damageToMinions":0,"damageToHarvesters":0,"damageToInhibitors":0,"heroLevel":15,"deaths":2,"assists":8,"towerLastHits":1,"mmr":null,"kills":3},{"team":1,"hero":"HeroData_Grux","username":"Blue_Grux","accountId":"bot","damageToTowers":0,"damageToHeroes":0,"damageToJungle":0,"damageToMinions":0,"damageToHarvesters":0,"damageToInhibitors":0,"heroLevel":15,"deaths":5,"assists":21,"towerLastHits":0,"mmr":null,"kills":3},{"team":1,"hero":"HeroData_Muriel","username":"Blue_Muriel","accountId":"bot","damageToTowers":0,"damageToHeroes":0,"damageToJungle":0,"damageToMinions":0,"damageToHarvesters":0,"damageToInhibitors":0,"heroLevel":14,"deaths":14,"assists":3,"towerLastHits":3,"mmr":null,"kills":1}],"kills":[{"killer":"Red_Gadget","killed":"Blue_Feng Mao","timestamp":265728},{"killer":"Blue_Howitzer","killed":"GODFATHER_E05","timestamp":280052},{"killer":"Red_Gadget","killed":"Blue_Feng Mao","timestamp":265728},{"killer":"Blue_Howitzer","killed":"GODFATHER_E05","timestamp":280052},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":340813},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":340813},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":673221},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":744797},{"killer":"Blue_Muriel","killed":"GODFATHER_E05","timestamp":768740},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":744797},{"killer":"Blue_Muriel","killed":"GODFATHER_E05","timestamp":768740},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":744797},{"killer":"Blue_Muriel","killed":"GODFATHER_E05","timestamp":768740},{"killer":"Blue_Howitzer","killed":"GODFATHER_E05","timestamp":917974},{"killer":"Blue_Howitzer","killed":"GODFATHER_E05","timestamp":917974},{"killer":"Blue_Howitzer","killed":"Red_Sevarog","timestamp":1004081},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":1187092},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":1218740},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":1218740},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1359694},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":1187092},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1359694},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":1218740},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":1218740},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1359694},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1493220},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1359694},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1359694},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1359694},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":1187092},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":1187092},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1493220},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1493220},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1493220},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":1656074},{"killer":"Blue_Howitzer","killed":"GODFATHER_E05","timestamp":1662440},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":1656074},{"killer":"Blue_Howitzer","killed":"GODFATHER_E05","timestamp":1662440},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":1656074},{"killer":"Blue_Howitzer","killed":"GODFATHER_E05","timestamp":1662440},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":1741340},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":1764155},{"killer":"Blue_Howitzer","killed":"Red_Sevarog","timestamp":1739852},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":1741340},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":1764155},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":1741340},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":1764155},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":1831798},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":1741340},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":1764155},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":1831798},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":1831798},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":1656074},{"killer":"Blue_Howitzer","killed":"GODFATHER_E05","timestamp":1662440},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":1831798},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":1831798},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":1741340},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":1764155},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":1741340},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":1764155},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":1656074},{"killer":"Blue_Howitzer","killed":"GODFATHER_E05","timestamp":1662440},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":1831798},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":1831798},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":1831798},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":1952762},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1953030},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":1952762},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1953030},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":1952762},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1953030},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":1952762},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1953030},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":1952762},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1953030},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":1952762},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1953030},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":1952762},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1953030},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":1831798},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":1952762},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1953030},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":1952762},{"killer":"Blue_Howitzer","killed":"Red_Murdock","timestamp":1953030},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":2057292},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":2057292},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":2057292},{"killer":"Blue_Gideon","killed":"Red_Sevarog","timestamp":2249141},{"killer":"Blue_Feng Mao","killed":"Red_Sevarog","timestamp":2342655},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":2367941},{"killer":"Blue_Grux","killed":"GODFATHER_E05","timestamp":2309054},{"killer":"Blue_Grux","killed":"Red_Gadget","timestamp":2318548},{"killer":"Blue_Gideon","killed":"Red_Sevarog","timestamp":2249141},{"killer":"Blue_Grux","killed":"GODFATHER_E05","timestamp":2309054},{"killer":"Blue_Grux","killed":"Red_Gadget","timestamp":2318548},{"killer":"Blue_Feng Mao","killed":"Red_Sevarog","timestamp":2342655},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":2367941},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":2201785},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":2216267},{"killer":"Blue_Feng Mao","killed":"Red_Sevarog","timestamp":2342655},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":2367941},{"killer":"Blue_Grux","killed":"Red_Murdock","timestamp":2437608},{"killer":"Blue_Muriel","killed":"GODFATHER_E05","timestamp":2448780},{"killer":"Blue_Howitzer","killed":"Red_Sevarog","timestamp":2458112},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":2201785},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":2216267},{"killer":"Blue_Feng Mao","killed":"Red_Sevarog","timestamp":2342655},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":2367941},{"killer":"Blue_Grux","killed":"GODFATHER_E05","timestamp":2309054},{"killer":"Blue_Grux","killed":"Red_Gadget","timestamp":2318548},{"killer":"Blue_Feng Mao","killed":"Red_Sevarog","timestamp":2342655},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":2367941},{"killer":"Blue_Gideon","killed":"Red_Sevarog","timestamp":2249141},{"killer":"Blue_Gideon","killed":"Red_Sevarog","timestamp":2249141},{"killer":"Blue_Grux","killed":"Red_Murdock","timestamp":2437608},{"killer":"Blue_Muriel","killed":"GODFATHER_E05","timestamp":2448780},{"killer":"Blue_Howitzer","killed":"Red_Sevarog","timestamp":2458112},{"killer":"Blue_Grux","killed":"Red_Murdock","timestamp":2437608},{"killer":"Blue_Muriel","killed":"GODFATHER_E05","timestamp":2448780},{"killer":"Blue_Howitzer","killed":"Red_Sevarog","timestamp":2458112},{"killer":"Blue_Gideon","killed":"Red_Sevarog","timestamp":2249141},{"killer":"Blue_Feng Mao","killed":"Red_Gadget","timestamp":2483966},{"killer":"Blue_Feng Mao","killed":"Red_Gadget","timestamp":2483966},{"killer":"Blue_Grux","killed":"Red_Murdock","timestamp":2437608},{"killer":"Blue_Muriel","killed":"GODFATHER_E05","timestamp":2448780},{"killer":"Blue_Howitzer","killed":"Red_Sevarog","timestamp":2458112},{"killer":"Blue_Grux","killed":"Red_Murdock","timestamp":2437608},{"killer":"Blue_Muriel","killed":"GODFATHER_E05","timestamp":2448780},{"killer":"Blue_Howitzer","killed":"Red_Sevarog","timestamp":2458112},{"killer":"Blue_Grux","killed":"Red_Murdock","timestamp":2437608},{"killer":"Blue_Muriel","killed":"GODFATHER_E05","timestamp":2448780},{"killer":"Blue_Howitzer","killed":"Red_Sevarog","timestamp":2458112},{"killer":"Blue_Grux","killed":"Red_Murdock","timestamp":2437608},{"killer":"Blue_Muriel","killed":"GODFATHER_E05","timestamp":2448780},{"killer":"Blue_Howitzer","killed":"Red_Sevarog","timestamp":2458112},{"killer":"Blue_Feng Mao","killed":"Red_Sevarog","timestamp":2342655},{"killer":"Blue_Howitzer","killed":"Red_Dekker","timestamp":2367941},{"killer":"Blue_Feng Mao","killed":"Red_Gadget","timestamp":2483966},{"killer":"Blue_Grux","killed":"Red_Murdock","timestamp":2437608},{"killer":"Blue_Muriel","killed":"GODFATHER_E05","timestamp":2448780},{"killer":"Blue_Howitzer","killed":"Red_Sevarog","timestamp":2458112},{"killer":"Blue_Feng Mao","killed":"GODFATHER_E05","timestamp":2599060},{"killer":"Blue_Gideon","killed":"Red_Sevarog","timestamp":2639317},{"killer":"Blue_Feng Mao","killed":"Red_Gadget","timestamp":2483966},{"killer":"Blue_Feng Mao","killed":"GODFATHER_E05","timestamp":2599060},{"killer":"Blue_Gideon","killed":"Red_Sevarog","timestamp":2639317},{"killer":"Blue_Feng Mao","killed":"Red_Gadget","timestamp":2483966},{"killer":"Blue_Grux","killed":"Red_Murdock","timestamp":2437608},{"killer":"Blue_Muriel","killed":"GODFATHER_E05","timestamp":2448780},{"killer":"Blue_Howitzer","killed":"Red_Sevarog","timestamp":2458112},{"killer":"Blue_Feng Mao","killed":"Red_Gadget","timestamp":2659465},{"killer":"Red_Dekker","killed":"Blue_Howitzer","timestamp":2682632},{"killer":"Blue_Feng Mao","killed":"Red_Gadget","timestamp":2483966},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":2713756},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":2713756},{"killer":"Blue_Feng Mao","killed":"Red_Gadget","timestamp":2483966},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":2713756},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":2713756},{"killer":"Blue_Muriel","killed":"Red_Sevarog","timestamp":2771604},{"killer":"Red_Murdock","killed":"Blue_Feng Mao","timestamp":2816982},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":2713756},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":2713756},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":2851211},{"killer":"Blue_Feng Mao","killed":"GODFATHER_E05","timestamp":2599060},{"killer":"Blue_Gideon","killed":"Red_Sevarog","timestamp":2639317},{"killer":"Blue_Feng Mao","killed":"Red_Gadget","timestamp":2483966},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":2851211},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":2851211},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":2851211},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":2851211},{"killer":"Red_Murdock","killed":"Blue_Howitzer","timestamp":2909142},{"killer":"Blue_Gideon","killed":"Red_Sevarog","timestamp":2913958},{"killer":"Red_Murdock","killed":"Blue_Howitzer","timestamp":2909142},{"killer":"Blue_Gideon","killed":"Red_Sevarog","timestamp":2913958},{"killer":"Blue_Muriel","killed":"Red_Sevarog","timestamp":2771604},{"killer":"Red_Murdock","killed":"Blue_Feng Mao","timestamp":2816982},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":2954628},{"killer":"Blue_Feng Mao","killed":"GODFATHER_E05","timestamp":2962856},{"killer":"Blue_Feng Mao","killed":"Red_Dekker","timestamp":2979961},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":2851211},{"killer":"Red_Murdock","killed":"Blue_Howitzer","timestamp":2909142},{"killer":"Blue_Gideon","killed":"Red_Sevarog","timestamp":2913958},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":2713756},{"killer":"Red_Murdock","killed":"Blue_Howitzer","timestamp":2909142},{"killer":"Blue_Gideon","killed":"Red_Sevarog","timestamp":2913958},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":2954628},{"killer":"Blue_Feng Mao","killed":"GODFATHER_E05","timestamp":2962856},{"killer":"Blue_Feng Mao","killed":"Red_Dekker","timestamp":2979961},{"killer":"Blue_Feng Mao","killed":"Red_Gadget","timestamp":2659465},{"killer":"Red_Dekker","killed":"Blue_Howitzer","timestamp":2682632},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":3002464},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":3002464},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":3002464},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":3002464},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":2851211},{"killer":"Blue_Howitzer","killed":"Red_Gadget","timestamp":3072137},{"killer":"Blue_Feng Mao","killed":"GODFATHER_E05","timestamp":3088125},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":3104954},{"killer":"Blue_Howitzer","killed":"Red_Gadget","timestamp":3072137},{"killer":"Blue_Feng Mao","killed":"GODFATHER_E05","timestamp":3088125},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":3104954},{"killer":"Blue_Howitzer","killed":"Red_Gadget","timestamp":3072137},{"killer":"Blue_Feng Mao","killed":"GODFATHER_E05","timestamp":3088125},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":3104954},{"killer":"Red_Murdock","killed":"Blue_Howitzer","timestamp":2909142},{"killer":"Blue_Gideon","killed":"Red_Sevarog","timestamp":2913958},{"killer":"Blue_Howitzer","killed":"Red_Gadget","timestamp":3072137},{"killer":"Blue_Feng Mao","killed":"GODFATHER_E05","timestamp":3088125},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":3104954},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":2851211},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":3222698},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":2851211},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":3222698},{"killer":"Red_Murdock","killed":"Blue_Howitzer","timestamp":2909142},{"killer":"Blue_Gideon","killed":"Red_Sevarog","timestamp":2913958},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":2954628},{"killer":"Blue_Feng Mao","killed":"GODFATHER_E05","timestamp":2962856},{"killer":"Blue_Feng Mao","killed":"Red_Dekker","timestamp":2979961},{"killer":"Blue_Feng Mao","killed":"GODFATHER_E05","timestamp":2599060},{"killer":"Blue_Gideon","killed":"Red_Sevarog","timestamp":2639317},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3251822},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":3282725},{"killer":"Red_Gadget","killed":"Blue_Feng Mao","timestamp":3300351},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":2954628},{"killer":"Blue_Feng Mao","killed":"GODFATHER_E05","timestamp":2962856},{"killer":"Blue_Feng Mao","killed":"Red_Dekker","timestamp":2979961},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":3222698},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":3222698},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3251822},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":3282725},{"killer":"Red_Gadget","killed":"Blue_Feng Mao","timestamp":3300351},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":3222698},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3251822},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":3282725},{"killer":"Red_Gadget","killed":"Blue_Feng Mao","timestamp":3300351},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3251822},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":3282725},{"killer":"Red_Gadget","killed":"Blue_Feng Mao","timestamp":3300351},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3251822},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":3282725},{"killer":"Red_Gadget","killed":"Blue_Feng Mao","timestamp":3300351},{"killer":"Blue_Grux","killed":"GODFATHER_E05","timestamp":2309054},{"killer":"Blue_Grux","killed":"Red_Gadget","timestamp":2318548},{"killer":"Blue_Howitzer","killed":"Red_Gadget","timestamp":3072137},{"killer":"Blue_Feng Mao","killed":"GODFATHER_E05","timestamp":3088125},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":3104954},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":3222698},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3251822},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":3282725},{"killer":"Red_Gadget","killed":"Blue_Feng Mao","timestamp":3300351},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":3002464},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3251822},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":3282725},{"killer":"Red_Gadget","killed":"Blue_Feng Mao","timestamp":3300351},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":3002464},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3251822},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":3282725},{"killer":"Red_Gadget","killed":"Blue_Feng Mao","timestamp":3300351},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":2954628},{"killer":"Blue_Feng Mao","killed":"GODFATHER_E05","timestamp":2962856},{"killer":"Blue_Feng Mao","killed":"Red_Dekker","timestamp":2979961},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3251822},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":3282725},{"killer":"Red_Gadget","killed":"Blue_Feng Mao","timestamp":3300351},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3251822},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":3282725},{"killer":"Red_Gadget","killed":"Blue_Feng Mao","timestamp":3300351},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":3222698},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3251822},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":3282725},{"killer":"Red_Gadget","killed":"Blue_Feng Mao","timestamp":3300351},{"killer":"Red_Dekker","killed":"Blue_Howitzer","timestamp":3560946},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":3222698},{"killer":"Red_Dekker","killed":"Blue_Howitzer","timestamp":3560946},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3251822},{"killer":"Red_Dekker","killed":"Blue_Muriel","timestamp":3282725},{"killer":"Red_Gadget","killed":"Blue_Feng Mao","timestamp":3300351},{"killer":"Red_Dekker","killed":"Blue_Howitzer","timestamp":3560946},{"killer":"Red_Dekker","killed":"Blue_Howitzer","timestamp":3560946},{"killer":"Red_Dekker","killed":"Blue_Howitzer","timestamp":3560946},{"killer":"Red_Dekker","killed":"Blue_Howitzer","timestamp":3560946},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":3711388},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":3711388},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3740578},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3740578},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":3711388},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":3711388},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"GODFATHER_E05","killed":"Blue_Grux","timestamp":3808292},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":3811436},{"killer":"GODFATHER_E05","killed":"Blue_Grux","timestamp":3808292},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":3811436},{"killer":"Red_Dekker","killed":"Blue_Howitzer","timestamp":3560946},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3740578},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3740578},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":3932076},{"killer":"GODFATHER_E05","killed":"Blue_Grux","timestamp":3808292},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":3811436},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":3984096},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"GODFATHER_E05","killed":"Blue_Grux","timestamp":3808292},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":3811436},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"Red_Dekker","killed":"Blue_Howitzer","timestamp":3560946},{"killer":"GODFATHER_E05","killed":"Blue_Grux","timestamp":3808292},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":3811436},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":3984096},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":3984096},{"killer":"GODFATHER_E05","killed":"Blue_Grux","timestamp":3808292},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":3811436},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":3932076},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":3984096},{"killer":"Red_Dekker","killed":"Blue_Howitzer","timestamp":3560946},{"killer":"Red_Dekker","killed":"Blue_Howitzer","timestamp":3560946},{"killer":"Red_Dekker","killed":"Blue_Howitzer","timestamp":3560946},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":3932076},{"killer":"GODFATHER_E05","killed":"Blue_Grux","timestamp":3808292},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":3811436},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":3984096},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"Red_Dekker","killed":"Blue_Howitzer","timestamp":3560946},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":3711388},{"killer":"GODFATHER_E05","killed":"Blue_Grux","timestamp":3808292},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":3811436},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3740578},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"Red_Sevarog","killed":"Blue_Gideon","timestamp":3656893},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":3711388},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":3984096},{"killer":"GODFATHER_E05","killed":"Blue_Grux","timestamp":3808292},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":3811436},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3740578},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3740578},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3740578},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3740578},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3740578},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":3711388},{"killer":"GODFATHER_E05","killed":"Blue_Grux","timestamp":3808292},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":3811436},{"killer":"Red_Murdock","killed":"Blue_Feng Mao","timestamp":4111417},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":4117474},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":3932076},{"killer":"GODFATHER_E05","killed":"Blue_Grux","timestamp":3808292},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":3811436},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":3711388},{"killer":"GODFATHER_E05","killed":"Blue_Grux","timestamp":3808292},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":3811436},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3740578},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":3932076},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":3932076},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":3932076},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":3932076},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":3984096},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":4189766},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":3932076},{"killer":"Red_Dekker","killed":"Blue_Howitzer","timestamp":3560946},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":3984096},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":3984096},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":3984096},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":3984096},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":3984096},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":3932076},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":3932076},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":3932076},{"killer":"Red_Murdock","killed":"Blue_Feng Mao","timestamp":4111417},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":4117474},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":3984096},{"killer":"Red_Murdock","killed":"Blue_Feng Mao","timestamp":4111417},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":4117474},{"killer":"Red_Murdock","killed":"Blue_Feng Mao","timestamp":4111417},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":4117474},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":4189766},{"killer":"Red_Murdock","killed":"Blue_Feng Mao","timestamp":4111417},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":4117474},{"killer":"Red_Murdock","killed":"Blue_Feng Mao","timestamp":4111417},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":4117474},{"killer":"Red_Murdock","killed":"Blue_Feng Mao","timestamp":4111417},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":4117474},{"killer":"Red_Murdock","killed":"Blue_Feng Mao","timestamp":4111417},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":4117474},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":4189766},{"killer":"Red_Murdock","killed":"Blue_Feng Mao","timestamp":4111417},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":4117474},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":4189766},{"killer":"GODFATHER_E05","killed":"Blue_Grux","timestamp":3808292},{"killer":"Blue_Gideon","killed":"GODFATHER_E05","timestamp":3811436},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":4189766},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Blue_Feng Mao","killed":"Red_Murdock","timestamp":3711388},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3740578},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":4381648},{"killer":"Blue_Howitzer","killed":"Red_Sevarog","timestamp":4385084},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4434634},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Blue_Gideon","killed":"Red_Murdock","timestamp":3984096},{"killer":"Red_Gadget","killed":"Blue_Muriel","timestamp":3932076},{"killer":"Red_Murdock","killed":"Blue_Feng Mao","timestamp":4111417},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":4117474},{"killer":"Red_Murdock","killed":"Blue_Grux","timestamp":4490787},{"killer":"Red_Murdock","killed":"Blue_Feng Mao","timestamp":4111417},{"killer":"Red_Gadget","killed":"Blue_Gideon","timestamp":4117474},{"killer":"Red_Gadget","killed":"Blue_Howitzer","timestamp":3740578},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4302185},{"killer":"Blue_Gideon","killed":"Red_Gadget","timestamp":4381648},{"killer":"Blue_Howitzer","killed":"Red_Sevarog","timestamp":4385084},{"killer":"Blue_Gideon","killed":"Red_Dekker","timestamp":4434634},{"killer":"Red_Murdock","killed":"Blue_Grux","timestamp":4490787}],"towerKills":[{"killer":"GODFATHER_E05","timestamp":1959521},{"killer":"GODFATHER_E05","timestamp":1959521},{"killer":"GODFATHER_E05","timestamp":1959521},{"killer":"GODFATHER_E05","timestamp":1959521},{"killer":"GODFATHER_E05","timestamp":1959521},{"killer":"GODFATHER_E05","timestamp":1959521},{"killer":"GODFATHER_E05","timestamp":1959521},{"killer":"GODFATHER_E05","timestamp":1959521},{"killer":"GODFATHER_E05","timestamp":1959521},{"killer":"GODFATHER_E05","timestamp":3960034},{"killer":"GODFATHER_E05","timestamp":4016412},{"killer":"GODFATHER_E05","timestamp":4016412},{"killer":"GODFATHER_E05","timestamp":4016412},{"killer":"GODFATHER_E05","timestamp":3960034},{"killer":"GODFATHER_E05","timestamp":4016412},{"killer":"GODFATHER_E05","timestamp":3960034},{"killer":"GODFATHER_E05","timestamp":4016412},{"killer":"GODFATHER_E05","timestamp":4016412},{"killer":"GODFATHER_E05","timestamp":3960034},{"killer":"GODFATHER_E05","timestamp":3960034},{"killer":"GODFATHER_E05","timestamp":3960034},{"killer":"GODFATHER_E05","timestamp":3960034},{"killer":"GODFATHER_E05","timestamp":3960034},{"killer":"GODFATHER_E05","timestamp":4016412},{"killer":"GODFATHER_E05","timestamp":3960034},{"killer":"GODFATHER_E05","timestamp":4016412},{"killer":"GODFATHER_E05","timestamp":4016412},{"killer":"GODFATHER_E05","timestamp":4016412},{"killer":"GODFATHER_E05","timestamp":4016412},{"killer":"GODFATHER_E05","timestamp":4016412},{"killer":"GODFATHER_E05","timestamp":3960034},{"killer":"GODFATHER_E05","timestamp":3960034},{"killer":"GODFATHER_E05","timestamp":3960034},{"killer":"GODFATHER_E05","timestamp":4016412},{"killer":"GODFATHER_E05","timestamp":4016412},{"killer":"GODFATHER_E05","timestamp":3960034}],"winningTeam":-1};
        if(this.victor === true) {
            //matchInfo.isLive = false;
            //matchInfo.winningTeam = 0;
        }
        var maxStats = this.computeMaxStats(matchInfo);
        this.setState({ matchInfo:matchInfo, maxStats: maxStats });
    },
    render: function() {
        return (
            <div>
                <GameClock startTime={this.state.matchInfo.startedAt}
                           isLive={this.state.matchInfo.isLive}
                           endTime={this.state.matchInfo.newCheckpointTime}
                />
                <div id="sidebar">
                    <MatchInfo gameType={this.state.matchInfo.gameType}
                               replayId={this.state.matchInfo.replayId}
                               dateTime={this.state.matchInfo.startedAt}
                    />
                    <EventFeed players={this.state.matchInfo.players}
                               events={this.state.matchInfo.towerKills.concat(this.state.matchInfo.kills)}
                               startTime={this.state.matchInfo.startedAt}
                    />
                </div>
                <div className="wrapper">
                    <div className="match-stats">
                        <TeamPanel maxStats={this.state.maxStats}
                                   team={0} isLive={this.state.matchInfo.isLive}
                                   victor={this.state.matchInfo.winningTeam}
                                   players={this.state.matchInfo.players}
                        />
                        <TeamPanel maxStats={this.state.maxStats}
                                   team={1}
                                   isLive={this.state.matchInfo.isLive}
                                   victor={this.state.matchInfo.winningTeam}
                                   players={this.state.matchInfo.players}
                        />
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Match;

var container = document.querySelector('.match-details');
if(container) {
    ReactDOM.render(<Match />, container);
}