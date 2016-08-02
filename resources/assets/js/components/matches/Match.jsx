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
        }.bind(this), 15000);
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
        var matchInfo = {"replayId":"62e3cdf26e204e389a5f6adef6e5fd7e","startedAt":"2016-08-02T20:48:33.543Z","lastCheckpointTime":4621351,"newCheckpointTime":4681371,"isLive":true,"gameType":"PVP","players":[{"team":1,"hero":"HeroData_Muriel","username":"aboyhazard","accountId":"6323ce3a547f46ffad3952da13022bf2","damageToTowers":1956,"damageToHeroes":21086,"damageToJungle":15234,"damageToMinions":53898,"damageToHarvesters":0,"damageToInhibitors":466,"heroLevel":15,"deaths":12,"assists":15,"towerLastHits":3,"mmr":null,"kills":7},{"team":1,"hero":"HeroData_Gadget","username":"Sablemane","accountId":"93b9b9d070a247dd8fb6fe0b3c0bfbbd","damageToTowers":4397,"damageToHeroes":45496,"damageToJungle":2036,"damageToMinions":85331,"damageToHarvesters":0,"damageToInhibitors":1259,"heroLevel":15,"deaths":13,"assists":19,"towerLastHits":2,"mmr":null,"kills":6},{"team":1,"hero":"HeroData_Price","username":"genisys77","accountId":"e6decc4f23f64c158101c9d9ae49de19","damageToTowers":48,"damageToHeroes":15707,"damageToJungle":30608,"damageToMinions":56510,"damageToHarvesters":0,"damageToInhibitors":234,"heroLevel":15,"deaths":21,"assists":7,"towerLastHits":0,"mmr":null,"kills":4},{"team":1,"hero":"HeroData_Tomahawk","username":"felipienzo","accountId":"47b1973e00fd49c39327a584903b1a63","damageToTowers":518,"damageToHeroes":27570,"damageToJungle":50280,"damageToMinions":45519,"damageToHarvesters":0,"damageToInhibitors":3685,"heroLevel":15,"deaths":18,"assists":9,"towerLastHits":0,"mmr":null,"kills":9},{"team":1,"hero":"HeroData_Grux","username":"igotafriginjeep","accountId":"6bf49e56629e4f3498bb86c523e27ecf","damageToTowers":2468,"damageToHeroes":48022,"damageToJungle":20250,"damageToMinions":189081,"damageToHarvesters":2427,"damageToInhibitors":195,"heroLevel":15,"deaths":17,"assists":11,"towerLastHits":1,"mmr":null,"kills":16},{"team":0,"hero":"HeroData_RiftMage","username":"PR0PH1t","accountId":"6e698a35d2e347eaa759f3089fb4fa41","damageToTowers":2060,"damageToHeroes":44290,"damageToJungle":630,"damageToMinions":83538,"damageToHarvesters":268,"damageToInhibitors":684,"heroLevel":15,"deaths":14,"assists":27,"towerLastHits":1,"mmr":null,"kills":13},{"team":0,"hero":"HeroData_Kurohane","username":"SHERLOCK79950","accountId":"c31a4755fa1b45e7b619ab6402caf630","damageToTowers":1647,"damageToHeroes":24270,"damageToJungle":7380,"damageToMinions":45347,"damageToHarvesters":0,"damageToInhibitors":1390,"heroLevel":15,"deaths":7,"assists":21,"towerLastHits":1,"mmr":null,"kills":25},{"team":0,"hero":"HeroData_Price","username":"thekamikazekid","accountId":"2832a4d5d4864b46a569882539c2e999","damageToTowers":4579,"damageToHeroes":21036,"damageToJungle":12293,"damageToMinions":192023,"damageToHarvesters":33,"damageToInhibitors":7194,"heroLevel":15,"deaths":9,"assists":17,"towerLastHits":3,"mmr":null,"kills":4},{"team":0,"hero":"HeroData_Chains","username":"KOS-NEX","accountId":"80d8328f5ea94642993c04ddeb448ecd","damageToTowers":703,"damageToHeroes":36394,"damageToJungle":4042,"damageToMinions":57153,"damageToHarvesters":0,"damageToInhibitors":306,"heroLevel":15,"deaths":6,"assists":39,"towerLastHits":1,"mmr":null,"kills":16},{"team":0,"hero":"HeroData_Tomahawk","username":"J_Blaze31","accountId":"4307e875e22a4491a1c4862723977d30","damageToTowers":5,"damageToHeroes":44935,"damageToJungle":55842,"damageToMinions":63517,"damageToHarvesters":0,"damageToInhibitors":1050,"heroLevel":15,"deaths":6,"assists":24,"towerLastHits":0,"mmr":null,"kills":23}],"kills":[{"killer":"igotafriginjeep","killed":"thekamikazekid","timestamp":203902},{"killer":"KOS-NEX","killed":"igotafriginjeep","timestamp":208052},{"killer":"genisys77","killed":"J_Blaze31","timestamp":305955},{"killer":"KOS-NEX","killed":"igotafriginjeep","timestamp":333265},{"killer":"KOS-NEX","killed":"genisys77","timestamp":401915},{"killer":"J_Blaze31","killed":"felipienzo","timestamp":477769},{"killer":"KOS-NEX","killed":"igotafriginjeep","timestamp":515781},{"killer":"SHERLOCK79950","killed":"genisys77","timestamp":656835},{"killer":"SHERLOCK79950","killed":"igotafriginjeep","timestamp":741969},{"killer":"KOS-NEX","killed":"felipienzo","timestamp":757886},{"killer":"SHERLOCK79950","killed":"genisys77","timestamp":761234},{"killer":"SHERLOCK79950","killed":"aboyhazard","timestamp":772780},{"killer":"Sablemane","killed":"SHERLOCK79950","timestamp":777232},{"killer":"J_Blaze31","killed":"Sablemane","timestamp":796532},{"killer":"felipienzo","killed":"PR0PH1t","timestamp":933467},{"killer":"J_Blaze31","killed":"felipienzo","timestamp":937350},{"killer":"Sablemane","killed":"KOS-NEX","timestamp":1019633},{"killer":"J_Blaze31","killed":"igotafriginjeep","timestamp":1027502},{"killer":"igotafriginjeep","killed":"thekamikazekid","timestamp":1103179},{"killer":"J_Blaze31","killed":"genisys77","timestamp":1112278},{"killer":"PR0PH1t","killed":"Sablemane","timestamp":1158204},{"killer":"aboyhazard","killed":"PR0PH1t","timestamp":1158539},{"killer":"igotafriginjeep","killed":"J_Blaze31","timestamp":1258555},{"killer":"Sablemane","killed":"PR0PH1t","timestamp":1270439},{"killer":"SHERLOCK79950","killed":"felipienzo","timestamp":1271643},{"killer":"thekamikazekid","killed":"aboyhazard","timestamp":1271676},{"killer":"SHERLOCK79950","killed":"igotafriginjeep","timestamp":1357551},{"killer":"aboyhazard","killed":"thekamikazekid","timestamp":1358139},{"killer":"J_Blaze31","killed":"genisys77","timestamp":1400344},{"killer":"SHERLOCK79950","killed":"Sablemane","timestamp":1474625},{"killer":"PR0PH1t","killed":"felipienzo","timestamp":1490802},{"killer":"thekamikazekid","killed":"Sablemane","timestamp":1571301},{"killer":"igotafriginjeep","killed":"J_Blaze31","timestamp":1586520},{"killer":"igotafriginjeep","killed":"PR0PH1t","timestamp":1595787},{"killer":"SHERLOCK79950","killed":"igotafriginjeep","timestamp":1615176},{"killer":"KOS-NEX","killed":"felipienzo","timestamp":1617484},{"killer":"KOS-NEX","killed":"felipienzo","timestamp":1734738},{"killer":"Sablemane","killed":"PR0PH1t","timestamp":1739454},{"killer":"J_Blaze31","killed":"genisys77","timestamp":1739554},{"killer":"Sablemane","killed":"SHERLOCK79950","timestamp":1771195},{"killer":"igotafriginjeep","killed":"thekamikazekid","timestamp":1787106},{"killer":"J_Blaze31","killed":"genisys77","timestamp":1858638},{"killer":"SHERLOCK79950","killed":"igotafriginjeep","timestamp":1941612},{"killer":"J_Blaze31","killed":"felipienzo","timestamp":1947867},{"killer":"J_Blaze31","killed":"genisys77","timestamp":1963246},{"killer":"KOS-NEX","killed":"aboyhazard","timestamp":2009683},{"killer":"SHERLOCK79950","killed":"Sablemane","timestamp":2033229},{"killer":"felipienzo","killed":"PR0PH1t","timestamp":2039954},{"killer":"genisys77","killed":"thekamikazekid","timestamp":2043357},{"killer":"igotafriginjeep","killed":"PR0PH1t","timestamp":2153092},{"killer":"igotafriginjeep","killed":"KOS-NEX","timestamp":2157143},{"killer":"SHERLOCK79950","killed":"igotafriginjeep","timestamp":2166140},{"killer":"genisys77","killed":"thekamikazekid","timestamp":2273129},{"killer":"J_Blaze31","killed":"igotafriginjeep","timestamp":2304882},{"killer":"KOS-NEX","killed":"Sablemane","timestamp":2317190},{"killer":"KOS-NEX","killed":"genisys77","timestamp":2329228},{"killer":"J_Blaze31","killed":"aboyhazard","timestamp":2391064},{"killer":"SHERLOCK79950","killed":"genisys77","timestamp":2459209},{"killer":"igotafriginjeep","killed":"PR0PH1t","timestamp":2475423},{"killer":"felipienzo","killed":"SHERLOCK79950","timestamp":2493889},{"killer":"felipienzo","killed":"KOS-NEX","timestamp":2508938},{"killer":"SHERLOCK79950","killed":"Sablemane","timestamp":2591920},{"killer":"felipienzo","killed":"PR0PH1t","timestamp":2593593},{"killer":"J_Blaze31","killed":"felipienzo","timestamp":2604730},{"killer":"J_Blaze31","killed":"genisys77","timestamp":2642847},{"killer":"igotafriginjeep","killed":"SHERLOCK79950","timestamp":2661912},{"killer":"J_Blaze31","killed":"igotafriginjeep","timestamp":2664655},{"killer":"J_Blaze31","killed":"felipienzo","timestamp":2723108},{"killer":"SHERLOCK79950","killed":"aboyhazard","timestamp":2759188},{"killer":"aboyhazard","killed":"SHERLOCK79950","timestamp":2763201},{"killer":"J_Blaze31","killed":"genisys77","timestamp":2799565},{"killer":"J_Blaze31","killed":"igotafriginjeep","timestamp":2811372},{"killer":"KOS-NEX","killed":"aboyhazard","timestamp":2875942},{"killer":"genisys77","killed":"PR0PH1t","timestamp":2885037},{"killer":"SHERLOCK79950","killed":"felipienzo","timestamp":2917381},{"killer":"KOS-NEX","killed":"genisys77","timestamp":2927315},{"killer":"igotafriginjeep","killed":"J_Blaze31","timestamp":2929255},{"killer":"igotafriginjeep","killed":"SHERLOCK79950","timestamp":2963554},{"killer":"igotafriginjeep","killed":"thekamikazekid","timestamp":3065329},{"killer":"KOS-NEX","killed":"genisys77","timestamp":3077337},{"killer":"felipienzo","killed":"J_Blaze31","timestamp":3080648},{"killer":"igotafriginjeep","killed":"KOS-NEX","timestamp":3086167},{"killer":"aboyhazard","killed":"SHERLOCK79950","timestamp":3117878},{"killer":"PR0PH1t","killed":"felipienzo","timestamp":3203684},{"killer":"PR0PH1t","killed":"genisys77","timestamp":3214520},{"killer":"PR0PH1t","killed":"igotafriginjeep","timestamp":3249965},{"killer":"SHERLOCK79950","killed":"Sablemane","timestamp":3271407},{"killer":"PR0PH1t","killed":"aboyhazard","timestamp":3285286},{"killer":"felipienzo","killed":"PR0PH1t","timestamp":3327477},{"killer":"SHERLOCK79950","killed":"genisys77","timestamp":3331391},{"killer":"SHERLOCK79950","killed":"felipienzo","timestamp":3346032},{"killer":"SHERLOCK79950","killed":"igotafriginjeep","timestamp":3448909},{"killer":"SHERLOCK79950","killed":"Sablemane","timestamp":3500357},{"killer":"KOS-NEX","killed":"felipienzo","timestamp":3568783},{"killer":"KOS-NEX","killed":"aboyhazard","timestamp":3621859},{"killer":"J_Blaze31","killed":"genisys77","timestamp":3630723},{"killer":"J_Blaze31","killed":"igotafriginjeep","timestamp":3713236},{"killer":"aboyhazard","killed":"PR0PH1t","timestamp":3732879},{"killer":"SHERLOCK79950","killed":"felipienzo","timestamp":3798663},{"killer":"thekamikazekid","killed":"Sablemane","timestamp":3851841},{"killer":"KOS-NEX","killed":"genisys77","timestamp":3896362},{"killer":"igotafriginjeep","killed":"thekamikazekid","timestamp":3925905},{"killer":"PR0PH1t","killed":"felipienzo","timestamp":3970679},{"killer":"aboyhazard","killed":"KOS-NEX","timestamp":4061717},{"killer":"PR0PH1t","killed":"aboyhazard","timestamp":4064326},{"killer":"SHERLOCK79950","killed":"Sablemane","timestamp":4069143},{"killer":"PR0PH1t","killed":"igotafriginjeep","timestamp":4078140},{"killer":"PR0PH1t","killed":"genisys77","timestamp":4101819},{"killer":"J_Blaze31","killed":"felipienzo","timestamp":4146588},{"killer":"aboyhazard","killed":"PR0PH1t","timestamp":4184064},{"killer":"SHERLOCK79950","killed":"aboyhazard","timestamp":4238983},{"killer":"Sablemane","killed":"KOS-NEX","timestamp":4337928},{"killer":"igotafriginjeep","killed":"PR0PH1t","timestamp":4358296},{"killer":"J_Blaze31","killed":"felipienzo","timestamp":4404286},{"killer":"SHERLOCK79950","killed":"genisys77","timestamp":4404420},{"killer":"PR0PH1t","killed":"Sablemane","timestamp":4520697},{"killer":"felipienzo","killed":"J_Blaze31","timestamp":4541865},{"killer":"felipienzo","killed":"thekamikazekid","timestamp":4552639},{"killer":"SHERLOCK79950","killed":"aboyhazard","timestamp":4611468}],"towerKills":[{"killer":"aboyhazard","timestamp":1026465},{"killer":"KOS-NEX","timestamp":1386060},{"killer":"Sablemane","timestamp":1397366},{"killer":"SHERLOCK79950","timestamp":1972344},{"killer":"PR0PH1t","timestamp":2016974},{"killer":"aboyhazard","timestamp":2544423},{"killer":"thekamikazekid","timestamp":2771663},{"killer":"Sablemane","timestamp":2811472},{"killer":"aboyhazard","timestamp":3126270},{"killer":"felipienzo","timestamp":3149324},{"killer":"igotafriginjeep","timestamp":3425353},{"killer":"J_Blaze31","timestamp":4160356},{"killer":"thekamikazekid","timestamp":4182212},{"killer":"thekamikazekid","timestamp":4343014},{"killer":"thekamikazekid","timestamp":4499275},{"killer":"SHERLOCK79950","timestamp":4676284}],"winningTeam":null};
        if(this.victor === true) {
            matchInfo.isLive = false;
            matchInfo.winningTeam = 1;
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