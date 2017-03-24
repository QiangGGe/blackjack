require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"AudioMng":[function(require,module,exports){
"use strict";
cc._RFpush(module, '9bafczRw0JAYK+Ipb7jIXGT', 'AudioMng');
// scripts/AudioMng.js

cc.Class({
    "extends": cc.Component,

    properties: {
        //赢的音效
        winAudio: {
            "default": null,
            url: cc.AudioClip
        },
        //输的音效
        loseAudio: {
            "default": null,
            url: cc.AudioClip
        },

        cardAudio: {
            "default": null,
            url: cc.AudioClip
        },
        //按钮音效
        buttonAudio: {
            "default": null,
            url: cc.AudioClip
        },
        //爆炸音效
        chipsAudio: {
            "default": null,
            url: cc.AudioClip
        },
        //开始游戏之前的等待背景音效backgrandmusic
        bgm: {
            "default": null,
            url: cc.AudioClip
        }

    },

    playMusic: function playMusic() {
        cc.audioEngine.playMusic(this.bgm, true);
    },
    pauseMusic: function pauseMusic() {
        cc.audioEngine.pauseMusic();
    },
    resumeMusic: function resumeMusic() {
        cc.audioEngine.resumeMusic();
    },
    //播放特技音效
    _playSFX: function _playSFX(clip) {
        cc.audioEngine.playEffect(clip, false);
    },
    playWin: function playWin() {
        this._playSFX(this.winAudio);
    },
    playLose: function playLose() {
        this._playSFX(this.loseAudio);
    },
    playCard: function playCard() {
        this._playSFX(this.cardAudio);
    },
    playChips: function playChips() {
        this._playSFX(this.chipsAudio);
    },
    playButton: function playButton() {
        this._playSFX(this.buttonAudio);
    },

    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"ButtonScaler":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'd8ccbB3iNVKGKqi30/LLQlW', 'ButtonScaler');
// scripts/UI/ButtonScaler.js

cc.Class({
    'extends': cc.Component,

    properties: {
        pressedScale: 1, //基础类型
        transDuration: 0 //基础类型
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        //这里是获取节点
        var audioMng = cc.find('Menu/AudioMng') || cc.find('Game/AudioMng');
        if (audioMng) {
            audioMng = audioMng.getComponent('AudioMng'); //这里就是获取组件也就是js脚本
        }
        self.initScale = this.node.scale;
        self.scaleDownAction = cc.scaleTo(self.transDuration, self.pressedScale);
        self.scaleUpAction = cc.scaleTo(self.transDuration, self.initScale);

        function onTouchDown(event) {
            this.stopAllActions();
            if (audioMng) {
                audioMng.playButton();
            }
            this.runAction(self.scaleDownAction);
        }
        function onTouchUp(event) {
            this.stopAllActions();
            this.runAction(self.scaleUpAction);
        }
        //注册监听事件
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"Menu":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e8f798D7KVBnqKaawmyxfc5', 'Menu');
// scripts/Menu.js

cc.Class({
    'extends': cc.Component,

    properties: {
        audioMng: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {

        // this.audioMng = this.audioMng.getComponent('AudioMng');
        //这里开始播放背景音效
        // this.audioMng.playMusic();
        cc.director.preloadScene('table', function () {
            cc.log('Next scence preloaded');
        });
    },

    playGame: function playGame() {
        cc.director.loadScene('table');
    }

});

cc._RFpop();
},{}],"PlayerDatas":[function(require,module,exports){
"use strict";
cc._RFpush(module, '9c813621Z9CT7Y6T4RQGEDp', 'PlayerDatas');
// scripts/module/PlayerDatas.js

var players = [{
    name: '燃烧吧，蛋蛋儿军',
    gold: 3000,
    photoIdx: 0
}, {
    name: '地方政府',
    gold: 2000,
    photoIdx: 1
}, {
    name: '手机超人',
    gold: 1500,
    photoIdx: 2
}, {
    name: '天灵灵，地灵灵',
    gold: 500,
    photoIdx: 3
}, {
    name: '哟哟，切克闹',
    gold: 9000,
    photoIdx: 4
}, {
    name: '学姐不要死',
    gold: 5000,
    photoIdx: 5
}, {
    name: '提百万',
    gold: 10000,
    photoIdx: 6
}];

module.exports = {
    players: players
};

cc._RFpop();
},{}],"RankItem":[function(require,module,exports){
"use strict";
cc._RFpush(module, '63b1dW+nCNNG7ZJpZgVXkbq', 'RankItem');
// scripts/UI/RankItem.js

cc.Class({
    "extends": cc.Component,

    properties: {
        spRankBG: cc.Sprite, //排名的背景图片
        labelRank: cc.Label, //排名
        labelPlayerName: cc.Label, //玩家姓名
        labelGold: cc.Label, //玩家得到的金钱
        spPlayerPhoto: cc.Sprite, //玩家头像
        texRankBG: cc.SpriteFrame,
        texPlayerPhoto: cc.SpriteFrame
    },

    init: function init(rank, playerInfo) {
        if (rank < 3) {
            //
            this.labelRank.node.active = false;
            this.spRankBG.spriteFrame = this.texRankBG[rank];
        } else {
            this.labelRank.node.active = true;
            this.labelRank.string = (rank + 1).toString();
        }

        this.labelPlayerName.string = playerInfo.name;
        this.labelGold.string = playerInfo.gold.toString();
        this.spPlayerPhoto.spriteFrame = this.texPlayerPhoto[playerInfo.photoIdx];
    },
    // use this for initialization
    onLoad: function onLoad() {
        console.log("This is Master");
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"RankList":[function(require,module,exports){
"use strict";
cc._RFpush(module, '79f9a47zblKKq1VDjUl7wTX', 'RankList');
// scripts/UI/RankList.js

var players = require('PlayerDatas').players;
cc.Class({
    'extends': cc.Component,

    properties: {
        scrollView: cc.ScrollView,
        prefabRankItem: cc.Prefab,
        rankCount: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.content = this.scrollView.content;
        this.populateList();
    },
    populateList: function populateList() {
        for (var i = 0; i < this.rankCount; ++i) {
            var playerInfo = players[i];
            var item = cc.instantiate(this.prefabRankItem);
            item.getComponent('RankItem').init(i, playerInfo);

            cc.log(this.content);

            this.content.addChild(item);
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{"PlayerDatas":"PlayerDatas"}]},{},["AudioMng","Menu","ButtonScaler","RankItem","RankList","PlayerDatas"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9Db2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL3NjcmlwdHMvQXVkaW9NbmcuanMiLCJhc3NldHMvc2NyaXB0cy9VSS9CdXR0b25TY2FsZXIuanMiLCJhc3NldHMvc2NyaXB0cy9NZW51LmpzIiwiYXNzZXRzL3NjcmlwdHMvbW9kdWxlL1BsYXllckRhdGFzLmpzIiwiYXNzZXRzL3NjcmlwdHMvVUkvUmFua0l0ZW0uanMiLCJhc3NldHMvc2NyaXB0cy9VSS9SYW5rTGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQTtBQUNJO0FBQ0o7QUFDSTtBQUNKO0FBQ1E7QUFDSTtBQUNBO0FBQ1o7QUFDQTtBQUNRO0FBQ0k7QUFDQTtBQUNaO0FBQ0E7QUFDUTtBQUNJO0FBQ0E7QUFDWjtBQUNBO0FBQ1E7QUFDSTtBQUNBO0FBQ1o7QUFDQTtBQUNRO0FBQ0k7QUFDQTtBQUNaO0FBQ0E7QUFDUTtBQUNJO0FBQ0E7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDUjtBQUNJO0FBQ0k7QUFDUjtBQUNJO0FBQ0k7QUFDUjtBQUNBO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0E7QUFDQTtBQUVJO0FBQUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNJO0FBQ0o7QUFDSTtBQUNJO0FBQ0E7QUFDUjtBQUNBO0FBQ0E7QUFDSTtBQUNJO0FBQ1I7QUFDUTtBQUNBO0FBQ0k7QUFDWjtBQUNRO0FBQ0E7QUFDQTtBQUNSO0FBRVE7QUFDSTtBQUNBO0FBQ0k7QUFBaEI7QUFFWTtBQUFaO0FBRVE7QUFDSTtBQUNBO0FBQVo7QUFDQTtBQUVRO0FBQ0E7QUFDQTtBQUFSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNJO0FBQ0o7QUFDSTtBQUNJO0FBQ1I7QUFDQTtBQUNBO0FBQ0k7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNRO0FBQ0k7QUFDWjtBQUNBO0FBQ0E7QUFDSTtBQUNJO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUVRO0FBQ0E7QUFDQTtBQUFSO0FBR1E7QUFDQTtBQUNBO0FBRFI7QUFJUTtBQUNBO0FBQ0E7QUFGUjtBQUtRO0FBQ0E7QUFDQTtBQUhSO0FBTVE7QUFDQTtBQUNBO0FBSlI7QUFPUTtBQUNBO0FBQ0E7QUFMUjtBQVFRO0FBQ0E7QUFDQTtBQU5SO0FBQ0E7QUFTQTtBQUNJO0FBUEo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0k7QUFDSjtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUjtBQUNBO0FBRUk7QUFDSTtBQUFSO0FBQ1k7QUFDQTtBQUNaO0FBQ1k7QUFDQTtBQUNaO0FBQ0E7QUFDUTtBQUNBO0FBQ0E7QUFDUjtBQUNBO0FBRUk7QUFDTTtBQUFWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0k7QUFDSjtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ1I7QUFDQTtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBQ1I7QUFDSTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ1o7QUFDWTtBQUNaO0FBQ1k7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy/otaLnmoTpn7PmlYhcbiAgICAgICAgd2luQXVkaW86e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgICAgIC8v6L6T55qE6Z+z5pWIXG4gICAgICAgIGxvc2VBdWRpbzp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuXG4gICAgICAgIGNhcmRBdWRpbzp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICAvL+aMiemSrumfs+aViFxuICAgICAgICBidXR0b25BdWRpbzp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICAvL+eIhueCuOmfs+aViFxuICAgICAgICBjaGlwc0F1ZGlvOntcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgICAgIC8v5byA5aeL5ri45oiP5LmL5YmN55qE562J5b6F6IOM5pmv6Z+z5pWIYmFja2dyYW5kbXVzaWNcbiAgICAgICAgYmdtOntcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBwbGF5TXVzaWM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKHRoaXMuYmdtLHRydWUpO1xuICAgIH0sXG4gICAgcGF1c2VNdXNpYzpmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlTXVzaWMoKTtcbiAgICB9LFxuICAgIHJlc3VtZU11c2ljOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lTXVzaWMoKTtcbiAgICB9LFxuICAgIC8v5pKt5pS+54m55oqA6Z+z5pWIXG4gICAgX3BsYXlTRlg6IGZ1bmN0aW9uIChjbGlwKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoY2xpcCxmYWxzZSk7XG4gICAgfSxcbiAgICBwbGF5V2luOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLl9wbGF5U0ZYKHRoaXMud2luQXVkaW8pO1xuICAgIH0sXG4gICAgcGxheUxvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLmxvc2VBdWRpbyk7XG4gICAgfSxcbiAgICBwbGF5Q2FyZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9wbGF5U0ZYKHRoaXMuY2FyZEF1ZGlvKTtcbiAgICB9LFxuICAgIHBsYXlDaGlwczogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9wbGF5U0ZYKHRoaXMuY2hpcHNBdWRpbyk7XG4gICAgfSxcbiAgICBwbGF5QnV0dG9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3BsYXlTRlgodGhpcy5idXR0b25BdWRpbyk7XG4gICAgfSxcblxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuIiwiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcHJlc3NlZFNjYWxlOiAxLC8v5Z+656GA57G75Z6LXG4gICAgICAgIHRyYW5zRHVyYXRpb246IDAvL+WfuuehgOexu+Wei1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvL+i/memHjOaYr+iOt+WPluiKgueCuVxuICAgICAgICB2YXIgYXVkaW9NbmcgPSBjYy5maW5kKCdNZW51L0F1ZGlvTW5nJykgfHwgY2MuZmluZCgnR2FtZS9BdWRpb01uZycpXG4gICAgICAgIGlmIChhdWRpb01uZyl7XG4gICAgICAgICAgICBhdWRpb01uZyA9IGF1ZGlvTW5nLmdldENvbXBvbmVudCgnQXVkaW9NbmcnKTsvL+i/memHjOWwseaYr+iOt+WPlue7hOS7tuS5n+WwseaYr2pz6ISa5pysXG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5pbml0U2NhbGUgPSB0aGlzLm5vZGUuc2NhbGU7XG4gICAgICAgIHNlbGYuc2NhbGVEb3duQWN0aW9uID0gY2Muc2NhbGVUbyhzZWxmLnRyYW5zRHVyYXRpb24sc2VsZi5wcmVzc2VkU2NhbGUpO1xuICAgICAgICBzZWxmLnNjYWxlVXBBY3Rpb24gPSBjYy5zY2FsZVRvKHNlbGYudHJhbnNEdXJhdGlvbixzZWxmLmluaXRTY2FsZSk7XG5cbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIG9uVG91Y2hEb3duKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICBpZiAoYXVkaW9Nbmcpe1xuICAgICAgICAgICAgICAgIGF1ZGlvTW5nLnBsYXlCdXR0b24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucnVuQWN0aW9uKHNlbGYuc2NhbGVEb3duQWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvblRvdWNoVXAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMucnVuQWN0aW9uKHNlbGYuc2NhbGVVcEFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgLy/ms6jlhoznm5HlkKzkuovku7ZcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaHN0YXJ0JyxvblRvdWNoRG93biwgdGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGVuZCcsb25Ub3VjaFVwLHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hjYW5jZWwnLCBvblRvdWNoVXAsdGhpcy5ub2RlKTtcblxuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxufSk7XG4iLCJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBhdWRpb01uZzogY2MuTm9kZVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgICAgIC8vIHRoaXMuYXVkaW9NbmcgPSB0aGlzLmF1ZGlvTW5nLmdldENvbXBvbmVudCgnQXVkaW9NbmcnKTtcbiAgICAgICAgLy/ov5nph4zlvIDlp4vmkq3mlL7og4zmma/pn7PmlYhcbiAgICAgICAgLy8gdGhpcy5hdWRpb01uZy5wbGF5TXVzaWMoKTtcbiAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKCd0YWJsZScsZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MubG9nKCdOZXh0IHNjZW5jZSBwcmVsb2FkZWQnKVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgcGxheUdhbWU6ZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ3RhYmxlJyk7XG4gICAgfSxcblxufSk7XG4iLCJjb25zdCBwbGF5ZXJzID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogJ+eHg+eDp+WQp++8jOibi+ibi+WEv+WGmycsXG4gICAgICAgIGdvbGQ6IDMwMDAsXG4gICAgICAgIHBob3RvSWR4OiAwXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICflnLDmlrnmlL/lupwnLFxuICAgICAgICBnb2xkOiAyMDAwLFxuICAgICAgICBwaG90b0lkeDogMVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAn5omL5py66LaF5Lq6JyxcbiAgICAgICAgZ29sZDogMTUwMCxcbiAgICAgICAgcGhvdG9JZHg6IDJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ+WkqeeBteeBte+8jOWcsOeBteeBtScsXG4gICAgICAgIGdvbGQ6IDUwMCxcbiAgICAgICAgcGhvdG9JZHg6IDNcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ+WTn+WTn++8jOWIh+WFi+mXuScsXG4gICAgICAgIGdvbGQ6IDkwMDAsXG4gICAgICAgIHBob3RvSWR4OiA0XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICflrablp5DkuI3opoHmrbsnLFxuICAgICAgICBnb2xkOiA1MDAwLFxuICAgICAgICBwaG90b0lkeDogNVxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAn5o+Q55m+5LiHJyxcbiAgICAgICAgZ29sZDogMTAwMDAsXG4gICAgICAgIHBob3RvSWR4OiA2XG4gICAgfVxuXTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcGxheWVyczogcGxheWVyc1xufTsiLCJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzcFJhbmtCRzogY2MuU3ByaXRlLC8v5o6S5ZCN55qE6IOM5pmv5Zu+54mHXG4gICAgICAgIGxhYmVsUmFuazogY2MuTGFiZWwsLy/mjpLlkI1cbiAgICAgICAgbGFiZWxQbGF5ZXJOYW1lOiBjYy5MYWJlbCwvL+eOqeWutuWnk+WQjVxuICAgICAgICBsYWJlbEdvbGQ6IGNjLkxhYmVsLC8v546p5a625b6X5Yiw55qE6YeR6ZKxXG4gICAgICAgIHNwUGxheWVyUGhvdG86IGNjLlNwcml0ZSwvL+eOqeWutuWktOWDj1xuICAgICAgICB0ZXhSYW5rQkc6IGNjLlNwcml0ZUZyYW1lLFxuICAgICAgICB0ZXhQbGF5ZXJQaG90bzogY2MuU3ByaXRlRnJhbWVcbiAgICB9LFxuXG5cbiAgICBpbml0OiBmdW5jdGlvbiAocmFuaywgcGxheWVySW5mbykge1xuICAgICAgICBpZiAocmFuayA8Myl7Ly9cbiAgICAgICAgICAgIHRoaXMubGFiZWxSYW5rLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNwUmFua0JHLnNwcml0ZUZyYW1lID0gdGhpcy50ZXhSYW5rQkdbcmFua107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsUmFuay5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxhYmVsUmFuay5zdHJpbmcgPSAocmFuayArIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhYmVsUGxheWVyTmFtZS5zdHJpbmcgPSBwbGF5ZXJJbmZvLm5hbWU7XG4gICAgICAgIHRoaXMubGFiZWxHb2xkLnN0cmluZyA9IHBsYXllckluZm8uZ29sZC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLnNwUGxheWVyUGhvdG8uc3ByaXRlRnJhbWUgPSB0aGlzLnRleFBsYXllclBob3RvW3BsYXllckluZm8ucGhvdG9JZHhdO1xuXG4gICAgfSxcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXMgTWFzdGVyXCIpO1xuXG4gICAgfSxcblxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuIiwiY29uc3QgcGxheWVycyA9IHJlcXVpcmUoJ1BsYXllckRhdGFzJykucGxheWVycztcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcsXG4gICAgICAgIHByZWZhYlJhbmtJdGVtOiBjYy5QcmVmYWIsXG4gICAgICAgIHJhbmtDb3VudDogMFxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQ7XG4gICAgICAgIHRoaXMucG9wdWxhdGVMaXN0KCk7XG4gICAgfSxcbiAgICBwb3B1bGF0ZUxpc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aSA8IHRoaXMucmFua0NvdW50OyArK2kpe1xuICAgICAgICAgICAgdmFyIHBsYXllckluZm8gPSBwbGF5ZXJzW2ldO1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYlJhbmtJdGVtKTtcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KCdSYW5rSXRlbScpLmluaXQoaSxwbGF5ZXJJbmZvKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2MubG9nKHRoaXMuY29udGVudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiJdfQ==