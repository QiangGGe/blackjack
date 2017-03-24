require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"AssetMng":[function(require,module,exports){
"use strict";
cc._RFpush(module, '1c33c++XxNLVYnDK0BrVOxO', 'AssetMng');
// scripts/AssetMng.js

var AssetMng = cc.Class({
    "extends": cc.Component,
    //这里类是控制资源的类
    properties: {
        texBust: cc.SpriteFrame, //爆牌资源
        texCardInfo: cc.SpriteFrame, //牌数（个人认为是停牌后的背景资源）
        texCountdown: cc.SpriteFrame, //玩家头像上的倒计时资源
        texBetCountDown: cc.SpriteFrame, //下注倒计时资源
        playerPhotos: [cc.SpriteFrame] //玩家头像数组
    },

    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"AudioMng":[function(require,module,exports){
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
        //发牌的声音
        cardAudio: {
            "default": null,
            url: cc.AudioClip
        },
        //按钮音效
        buttonAudio: {
            "default": null,
            url: cc.AudioClip
        },
        //投掷金币音效
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
},{}],"Game":[function(require,module,exports){
"use strict";
cc._RFpush(module, '3f6c9/CmitK+51ty9IRBJ6i', 'Game');
// scripts/Game.js

cc.Class({
    'extends': cc.Component,

    properties: {
        //玩家数组
        playerAnchors: {
            'default': [],
            type: cc.Node
        },
        playerPrefab: cc.Prefab,
        dealer: cc.Node,
        inGameUI: cc.Node, //控制UI的付托节点
        betUI: cc.Node,
        assetMng: cc.Node, //资源管理器托付节点
        audioMng: cc.Node,
        turnDuration: 0,
        betDuration: 0, //下注总时间
        totalChipsNum: 0,
        totalDiamondNum: 0,
        numberOfDecks: {
            'default': 1,
            type: 'Integer'
        }

    },
    statics: {
        instance: null
    },

    // use this for initialization
    onLoad: function onLoad() {
        // Game.instance = this;
        this.inGameUI = this.inGameUI.getComponent('InGameUI');
        this.assetMng = this.assetMng.getComponent('AssetMng');
        this.audioMng = this.audioMng.getComponent('AudioMng');

        this.inGameUI.init(this.betDuration);
        this.inGameUI.startCountDown();
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"InGameUI":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7302fLH5RhI3KTpS6R3GX4a', 'InGameUI');
// scripts/UI/InGameUI.js

var Game = require('Game');

cc.Class({
    "extends": cc.Component,

    properties: {
        panelChat: cc.Node, //聊天界面
        panelSocial: cc.Node, //社交界面
        betStateUI: cc.Node, //下注界面
        gameStateUI: cc.Node, //游戏界面
        resultTxt: cc.Label, //结果文字提示
        betCounter: cc.ProgressBar, //游戏倒计时
        btnStart: cc.Node, //开始游戏按钮
        labelTotalChips: cc.Label //
    },

    // use this for initialization
    onLoad: function onLoad() {},
    init: function init(betDuration) {
        this.panelChat.active = false; //隐藏聊天界面
        this.panelSocial.action = false; //隐藏社交界面
        this.resultTxt.enabled = false; //表示该节点是否启用

        this.betStateUI.active = true; //显示下注界面
        this.gameStateUI.active = false; //隐藏游戏界面

        this.btnStart.active = false; //隐藏开始按钮
        this.betDuration = betDuration; //赋值下注时间
        this.betTimer = 0; //设置下注已过去时间
        this.isBetCounting = false; //是否正在计时
    },
    //开始计时器
    startCountDown: function startCountDown() {
        if (this.betCounter) {
            this.betTimer = 0;
            this.isBetCounting = true;
        }
    },
    //恢复计时器
    resetCountdown: function resetCountdown() {
        if (this.betCounter) {
            this.betTimer = 0;
            this.isBetCounting = false;
            this.betCounter.progress = 0;
        }
    },

    //显示下注界面
    showBetState: function showBetState() {
        this.betStateUI.active = true;
        this.gameStateUI.active = false;
        this.btnStart.active = false;
    },

    //显示游戏界面
    showGameState: function showGameState() {
        this.betStateUI.active = false;
        this.gameStateUI.active = true;
        this.btnStart.active = true;
    },
    //
    showResultState: function showResultState() {
        this.betStateUI.active = false;
        this.gameStateUI.active = false;
        this.btnStart.active = true;
    },
    //切换聊天界面
    toggleChat: function toggleChat() {
        this.panelChat.active = !this.panelChat.active;
    },
    //切换社交界面
    toggleSocail: function toggleSocail() {
        this.panelSocial.active = !this.panelSocial.active;
    },

    update: function update(dt) {
        //更新投注进度
        if (this.isBetCounting) {
            this.betCounter.progress = this.betTimer / this.betDuration;
            this.betTimer += dt;
            console.log("this.betTimer-->" + this.betTimer + "this.betDuration-->" + this.betDuration);

            if (this.betTimer >= this.betDuration) {
                this.isBetCounting = false;
                this.betCounter.progress = 1;
            }
        }
    }
});

cc._RFpop();
},{"Game":"Game"}],"Menu":[function(require,module,exports){
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
},{"PlayerDatas":"PlayerDatas"}]},{},["AssetMng","AudioMng","Game","Menu","ButtonScaler","InGameUI","RankItem","RankList","PlayerDatas"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9Db2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL3NjcmlwdHMvQXNzZXRNbmcuanMiLCJhc3NldHMvc2NyaXB0cy9BdWRpb01uZy5qcyIsImFzc2V0cy9zY3JpcHRzL1VJL0J1dHRvblNjYWxlci5qcyIsImFzc2V0cy9zY3JpcHRzL0dhbWUuanMiLCJhc3NldHMvc2NyaXB0cy9VSS9JbkdhbWVVSS5qcyIsImFzc2V0cy9zY3JpcHRzL01lbnUuanMiLCJhc3NldHMvc2NyaXB0cy9tb2R1bGUvUGxheWVyRGF0YXMuanMiLCJhc3NldHMvc2NyaXB0cy9VSS9SYW5rSXRlbS5qcyIsImFzc2V0cy9zY3JpcHRzL1VJL1JhbmtMaXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBO0FBQ0k7QUFDSjtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNSO0FBQ0E7QUFDQTtBQUNJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNJO0FBQ0o7QUFDSTtBQUNKO0FBQ1E7QUFDSTtBQUNBO0FBQ1o7QUFDQTtBQUNRO0FBQ0k7QUFDQTtBQUNaO0FBQ0E7QUFDUTtBQUNJO0FBQ0E7QUFDWjtBQUNBO0FBQ1E7QUFDSTtBQUNBO0FBQ1o7QUFDQTtBQUNRO0FBQ0k7QUFDQTtBQUNaO0FBQ0E7QUFDUTtBQUNJO0FBQ0E7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDUjtBQUNJO0FBQ0k7QUFDUjtBQUNJO0FBQ0k7QUFDUjtBQUNBO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0E7QUFDQTtBQUVJO0FBQUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNJO0FBQ0o7QUFDSTtBQUNJO0FBQ0E7QUFDUjtBQUNBO0FBQ0E7QUFDSTtBQUNJO0FBQ1I7QUFDUTtBQUNBO0FBQ0k7QUFDWjtBQUNRO0FBQ0E7QUFDQTtBQUNSO0FBRVE7QUFDSTtBQUNBO0FBQ0k7QUFBaEI7QUFFWTtBQUFaO0FBRVE7QUFDSTtBQUNBO0FBQVo7QUFDQTtBQUVRO0FBQ0E7QUFDQTtBQUFSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNJO0FBQ0o7QUFDSTtBQUNKO0FBQ1E7QUFDSTtBQUNBO0FBQ1o7QUFDUTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNaO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDUjtBQUNBO0FBQ0E7QUFDSTtBQUNKO0FBQ1E7QUFDQTtBQUNBO0FBQ1I7QUFDUTtBQUNBO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNJO0FBQ0o7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUjtBQUNBO0FBQ0E7QUFDSTtBQUdBO0FBQ0k7QUFDQTtBQUNBO0FBRFI7QUFHUTtBQUNBO0FBRFI7QUFHUTtBQUNBO0FBQ0E7QUFDQTtBQURSO0FBQ0E7QUFLSTtBQUNJO0FBQ0k7QUFDQTtBQUhaO0FBQ0E7QUFDQTtBQUtJO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFIWjtBQUNBO0FBQ0E7QUFDQTtBQUtJO0FBQ0k7QUFDQTtBQUNBO0FBSFI7QUFDQTtBQUNBO0FBS0k7QUFDSTtBQUNBO0FBQ0E7QUFIUjtBQUNBO0FBS0k7QUFDSTtBQUNBO0FBQ0E7QUFIUjtBQUNBO0FBS0k7QUFDSTtBQUhSO0FBQ0E7QUFLSTtBQUNJO0FBSFI7QUFDQTtBQUtJO0FBSEo7QUFLWTtBQUNJO0FBQ0E7QUFDQTtBQUhoQjtBQUtnQjtBQUNJO0FBQ0E7QUFIcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0k7QUFDSjtBQUNJO0FBQ0k7QUFDUjtBQUNBO0FBQ0E7QUFDSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ1E7QUFDSTtBQUNaO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBRVE7QUFDQTtBQUNBO0FBQVI7QUFHUTtBQUNBO0FBQ0E7QUFEUjtBQUlRO0FBQ0E7QUFDQTtBQUZSO0FBS1E7QUFDQTtBQUNBO0FBSFI7QUFNUTtBQUNBO0FBQ0E7QUFKUjtBQU9RO0FBQ0E7QUFDQTtBQUxSO0FBUVE7QUFDQTtBQUNBO0FBTlI7QUFDQTtBQVNBO0FBQ0k7QUFQSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDSTtBQUNKO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNSO0FBQ0E7QUFFSTtBQUNJO0FBQVI7QUFDWTtBQUNBO0FBQ1o7QUFDWTtBQUNBO0FBQ1o7QUFDQTtBQUNRO0FBQ0E7QUFDQTtBQUNSO0FBQ0E7QUFFSTtBQUNNO0FBQVY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDSTtBQUNKO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDUjtBQUNBO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7QUFDUjtBQUNJO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDWjtBQUNZO0FBQ1o7QUFDWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQXNzZXRNbmcgPSBjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuICAgLy/ov5nph4znsbvmmK/mjqfliLbotYTmupDnmoTnsbtcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRleEJ1c3Q6IGNjLlNwcml0ZUZyYW1lLC8v54iG54mM6LWE5rqQXG4gICAgICAgIHRleENhcmRJbmZvOiBjYy5TcHJpdGVGcmFtZSwvL+eJjOaVsO+8iOS4quS6uuiupOS4uuaYr+WBnOeJjOWQjueahOiDjOaZr+i1hOa6kO+8iVxuICAgICAgICB0ZXhDb3VudGRvd246IGNjLlNwcml0ZUZyYW1lLC8v546p5a625aS05YOP5LiK55qE5YCS6K6h5pe26LWE5rqQXG4gICAgICAgIHRleEJldENvdW50RG93bjogY2MuU3ByaXRlRnJhbWUsLy/kuIvms6jlgJLorqHml7botYTmupBcbiAgICAgICAgcGxheWVyUGhvdG9zOiBbY2MuU3ByaXRlRnJhbWVdLy/njqnlrrblpLTlg4/mlbDnu4RcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuIiwiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy/otaLnmoTpn7PmlYhcbiAgICAgICAgd2luQXVkaW86e1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgICAgIC8v6L6T55qE6Z+z5pWIXG4gICAgICAgIGxvc2VBdWRpbzp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICAvL+WPkeeJjOeahOWjsOmfs1xuICAgICAgICBjYXJkQXVkaW86e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgLy/mjInpkq7pn7PmlYhcbiAgICAgICAgYnV0dG9uQXVkaW86e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgLy/mipXmjrfph5HluIHpn7PmlYhcbiAgICAgICAgY2hpcHNBdWRpbzp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICAvL+W8gOWni+a4uOaIj+S5i+WJjeeahOetieW+heiDjOaZr+mfs+aViGJhY2tncmFuZG11c2ljXG4gICAgICAgIGJnbTp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgcGxheU11c2ljOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmJnbSx0cnVlKTtcbiAgICB9LFxuICAgIHBhdXNlTXVzaWM6ZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKCk7XG4gICAgfSxcbiAgICByZXN1bWVNdXNpYzpmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZU11c2ljKCk7XG4gICAgfSxcbiAgICAvL+aSreaUvueJueaKgOmfs+aViFxuICAgIF9wbGF5U0ZYOiBmdW5jdGlvbiAoY2xpcCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KGNsaXAsZmFsc2UpO1xuICAgIH0sXG4gICAgcGxheVdpbjogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLndpbkF1ZGlvKTtcbiAgICB9LFxuICAgIHBsYXlMb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3BsYXlTRlgodGhpcy5sb3NlQXVkaW8pO1xuICAgIH0sXG4gICAgcGxheUNhcmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLmNhcmRBdWRpbyk7XG4gICAgfSxcbiAgICBwbGF5Q2hpcHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLmNoaXBzQXVkaW8pO1xuICAgIH0sXG4gICAgcGxheUJ1dHRvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9wbGF5U0ZYKHRoaXMuYnV0dG9uQXVkaW8pO1xuICAgIH0sXG5cblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuXG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHByZXNzZWRTY2FsZTogMSwvL+WfuuehgOexu+Wei1xuICAgICAgICB0cmFuc0R1cmF0aW9uOiAwLy/ln7rnoYDnsbvlnotcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgLy/ov5nph4zmmK/ojrflj5boioLngrlcbiAgICAgICAgdmFyIGF1ZGlvTW5nID0gY2MuZmluZCgnTWVudS9BdWRpb01uZycpIHx8IGNjLmZpbmQoJ0dhbWUvQXVkaW9NbmcnKVxuICAgICAgICBpZiAoYXVkaW9Nbmcpe1xuICAgICAgICAgICAgYXVkaW9NbmcgPSBhdWRpb01uZy5nZXRDb21wb25lbnQoJ0F1ZGlvTW5nJyk7Ly/ov5nph4zlsLHmmK/ojrflj5bnu4Tku7bkuZ/lsLHmmK9qc+iEmuacrFxuICAgICAgICB9XG4gICAgICAgIHNlbGYuaW5pdFNjYWxlID0gdGhpcy5ub2RlLnNjYWxlO1xuICAgICAgICBzZWxmLnNjYWxlRG93bkFjdGlvbiA9IGNjLnNjYWxlVG8oc2VsZi50cmFuc0R1cmF0aW9uLHNlbGYucHJlc3NlZFNjYWxlKTtcbiAgICAgICAgc2VsZi5zY2FsZVVwQWN0aW9uID0gY2Muc2NhbGVUbyhzZWxmLnRyYW5zRHVyYXRpb24sc2VsZi5pbml0U2NhbGUpO1xuXG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBvblRvdWNoRG93bihldmVudCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgaWYgKGF1ZGlvTW5nKXtcbiAgICAgICAgICAgICAgICBhdWRpb01uZy5wbGF5QnV0dG9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJ1bkFjdGlvbihzZWxmLnNjYWxlRG93bkFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25Ub3VjaFVwKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICB0aGlzLnJ1bkFjdGlvbihzZWxmLnNjYWxlVXBBY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIC8v5rOo5YaM55uR5ZCs5LqL5Lu2XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hzdGFydCcsb25Ub3VjaERvd24sIHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hlbmQnLG9uVG91Y2hVcCx0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoY2FuY2VsJywgb25Ub3VjaFVwLHRoaXMubm9kZSk7XG5cbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuIiwiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy/njqnlrrbmlbDnu4RcbiAgICAgICAgcGxheWVyQW5jaG9yczp7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgcGxheWVyUHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGRlYWxlcjogY2MuTm9kZSxcbiAgICAgICAgaW5HYW1lVUk6IGNjLk5vZGUsLy/mjqfliLZVSeeahOS7mOaJmOiKgueCuVxuICAgICAgICBiZXRVSTogY2MuTm9kZSxcbiAgICAgICAgYXNzZXRNbmc6IGNjLk5vZGUsLy/otYTmupDnrqHnkIblmajmiZjku5joioLngrlcbiAgICAgICAgYXVkaW9Nbmc6IGNjLk5vZGUsXG4gICAgICAgIHR1cm5EdXJhdGlvbjogMCxcbiAgICAgICAgYmV0RHVyYXRpb246IDAsLy/kuIvms6jmgLvml7bpl7RcbiAgICAgICAgdG90YWxDaGlwc051bTogMCxcbiAgICAgICAgdG90YWxEaWFtb25kTnVtOiAwLFxuICAgICAgICBudW1iZXJPZkRlY2tzOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAxLFxuICAgICAgICAgICAgdHlwZTogJ0ludGVnZXInXG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgc3RhdGljczoge1xuICAgICAgICBpbnN0YW5jZTogbnVsbFxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gR2FtZS5pbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIHRoaXMuaW5HYW1lVUkgPSB0aGlzLmluR2FtZVVJLmdldENvbXBvbmVudCgnSW5HYW1lVUknKTtcbiAgICAgICAgdGhpcy5hc3NldE1uZyA9IHRoaXMuYXNzZXRNbmcuZ2V0Q29tcG9uZW50KCdBc3NldE1uZycpO1xuICAgICAgICB0aGlzLmF1ZGlvTW5nID0gdGhpcy5hdWRpb01uZy5nZXRDb21wb25lbnQoJ0F1ZGlvTW5nJyk7XG5cbiAgICAgICAgdGhpcy5pbkdhbWVVSS5pbml0KHRoaXMuYmV0RHVyYXRpb24pO1xuICAgICAgICB0aGlzLmluR2FtZVVJLnN0YXJ0Q291bnREb3duKCk7XG5cbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuIiwidmFyIEdhbWUgPSByZXF1aXJlKCdHYW1lJyk7XG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHBhbmVsQ2hhdDogY2MuTm9kZSwvL+iBiuWkqeeVjOmdolxuICAgICAgICBwYW5lbFNvY2lhbDogY2MuTm9kZSwvL+ekvuS6pOeVjOmdolxuICAgICAgICBiZXRTdGF0ZVVJOiBjYy5Ob2RlLC8v5LiL5rOo55WM6Z2iXG4gICAgICAgIGdhbWVTdGF0ZVVJOiBjYy5Ob2RlLC8v5ri45oiP55WM6Z2iXG4gICAgICAgIHJlc3VsdFR4dDogY2MuTGFiZWwsLy/nu5PmnpzmloflrZfmj5DnpLpcbiAgICAgICAgYmV0Q291bnRlcjogY2MuUHJvZ3Jlc3NCYXIsLy/muLjmiI/lgJLorqHml7ZcbiAgICAgICAgYnRuU3RhcnQ6IGNjLk5vZGUsLy/lvIDlp4vmuLjmiI/mjInpkq5cbiAgICAgICAgbGFiZWxUb3RhbENoaXBzOiBjYy5MYWJlbC8vXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuXG4gICAgfSxcbiAgICBpbml0OiBmdW5jdGlvbiAoYmV0RHVyYXRpb24pIHtcbiAgICAgICAgdGhpcy5wYW5lbENoYXQuYWN0aXZlID0gZmFsc2U7Ly/pmpDol4/ogYrlpKnnlYzpnaJcbiAgICAgICAgdGhpcy5wYW5lbFNvY2lhbC5hY3Rpb24gPSBmYWxzZTsvL+makOiXj+ekvuS6pOeVjOmdolxuICAgICAgICB0aGlzLnJlc3VsdFR4dC5lbmFibGVkID0gZmFsc2U7Ly/ooajnpLror6XoioLngrnmmK/lkKblkK/nlKhcblxuICAgICAgICB0aGlzLmJldFN0YXRlVUkuYWN0aXZlID0gdHJ1ZTsvL+aYvuekuuS4i+azqOeVjOmdolxuICAgICAgICB0aGlzLmdhbWVTdGF0ZVVJLmFjdGl2ZSA9IGZhbHNlOy8v6ZqQ6JeP5ri45oiP55WM6Z2iXG5cbiAgICAgICAgdGhpcy5idG5TdGFydC5hY3RpdmUgPSBmYWxzZTsvL+makOiXj+W8gOWni+aMiemSrlxuICAgICAgICB0aGlzLmJldER1cmF0aW9uID0gYmV0RHVyYXRpb247Ly/otYvlgLzkuIvms6jml7bpl7RcbiAgICAgICAgdGhpcy5iZXRUaW1lciA9IDA7Ly/orr7nva7kuIvms6jlt7Lov4fljrvml7bpl7RcbiAgICAgICAgdGhpcy5pc0JldENvdW50aW5nID0gZmFsc2U7Ly/mmK/lkKbmraPlnKjorqHml7ZcblxuXG4gICAgfSxcbiAgICAvL+W8gOWni+iuoeaXtuWZqFxuICAgIHN0YXJ0Q291bnREb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmJldENvdW50ZXIpe1xuICAgICAgICAgICAgdGhpcy5iZXRUaW1lciA9IDA7XG4gICAgICAgICAgICB0aGlzLmlzQmV0Q291bnRpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvL+aBouWkjeiuoeaXtuWZqFxuICAgIHJlc2V0Q291bnRkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmJldENvdW50ZXIpe1xuICAgICAgICAgICAgdGhpcy5iZXRUaW1lciA9IDA7XG4gICAgICAgICAgICB0aGlzLmlzQmV0Q291bnRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYmV0Q291bnRlci5wcm9ncmVzcyA9IDA7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/mmL7npLrkuIvms6jnlYzpnaJcbiAgICBzaG93QmV0U3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5iZXRTdGF0ZVVJLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlVUkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYnRuU3RhcnQuYWN0aXZlID0gZmFsc2U7XG4gICAgfSxcblxuICAgIC8v5pi+56S65ri45oiP55WM6Z2iXG4gICAgc2hvd0dhbWVTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmJldFN0YXRlVUkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlVUkuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5idG5TdGFydC5hY3RpdmUgPSB0cnVlO1xuICAgIH0sXG4gICAgLy9cbiAgICBzaG93UmVzdWx0U3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5iZXRTdGF0ZVVJLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdhbWVTdGF0ZVVJLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJ0blN0YXJ0LmFjdGl2ZSA9IHRydWU7XG4gICAgfSxcbiAgICAvL+WIh+aNouiBiuWkqeeVjOmdolxuICAgIHRvZ2dsZUNoYXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wYW5lbENoYXQuYWN0aXZlID0gIXRoaXMucGFuZWxDaGF0LmFjdGl2ZTtcbiAgICB9LFxuICAgIC8v5YiH5o2i56S+5Lqk55WM6Z2iXG4gICAgdG9nZ2xlU29jYWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucGFuZWxTb2NpYWwuYWN0aXZlID0gIXRoaXMucGFuZWxTb2NpYWwuYWN0aXZlO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAvL+abtOaWsOaKleazqOi/m+W6plxuICAgICAgICAgICAgaWYgKHRoaXMuaXNCZXRDb3VudGluZyl7XG4gICAgICAgICAgICAgICAgdGhpcy5iZXRDb3VudGVyLnByb2dyZXNzID0gdGhpcy5iZXRUaW1lci90aGlzLmJldER1cmF0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMuYmV0VGltZXIgKz0gZHQ7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLmJldFRpbWVyLS0+XCIrdGhpcy5iZXRUaW1lcitcInRoaXMuYmV0RHVyYXRpb24tLT5cIit0aGlzLmJldER1cmF0aW9uKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJldFRpbWVyID49IHRoaXMuYmV0RHVyYXRpb24pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQmV0Q291bnRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZXRDb3VudGVyLnByb2dyZXNzID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfSxcbn0pO1xuIiwiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXVkaW9Nbmc6IGNjLk5vZGVcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICAvLyB0aGlzLmF1ZGlvTW5nID0gdGhpcy5hdWRpb01uZy5nZXRDb21wb25lbnQoJ0F1ZGlvTW5nJyk7XG4gICAgICAgIC8v6L+Z6YeM5byA5aeL5pKt5pS+6IOM5pmv6Z+z5pWIXG4gICAgICAgIC8vIHRoaXMuYXVkaW9NbmcucGxheU11c2ljKCk7XG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZSgndGFibGUnLGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNjLmxvZygnTmV4dCBzY2VuY2UgcHJlbG9hZGVkJylcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHBsYXlHYW1lOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCd0YWJsZScpO1xuICAgIH0sXG5cbn0pO1xuIiwiY29uc3QgcGxheWVycyA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICfnh4Png6flkKfvvIzom4vom4vlhL/lhpsnLFxuICAgICAgICBnb2xkOiAzMDAwLFxuICAgICAgICBwaG90b0lkeDogMFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAn5Zyw5pa55pS/5bqcJyxcbiAgICAgICAgZ29sZDogMjAwMCxcbiAgICAgICAgcGhvdG9JZHg6IDFcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ+aJi+acuui2heS6uicsXG4gICAgICAgIGdvbGQ6IDE1MDAsXG4gICAgICAgIHBob3RvSWR4OiAyXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICflpKnngbXngbXvvIzlnLDngbXngbUnLFxuICAgICAgICBnb2xkOiA1MDAsXG4gICAgICAgIHBob3RvSWR4OiAzXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICflk5/lk5/vvIzliIflhYvpl7knLFxuICAgICAgICBnb2xkOiA5MDAwLFxuICAgICAgICBwaG90b0lkeDogNFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAn5a2m5aeQ5LiN6KaB5q27JyxcbiAgICAgICAgZ29sZDogNTAwMCxcbiAgICAgICAgcGhvdG9JZHg6IDVcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ+aPkOeZvuS4hycsXG4gICAgICAgIGdvbGQ6IDEwMDAwLFxuICAgICAgICBwaG90b0lkeDogNlxuICAgIH1cbl07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHBsYXllcnM6IHBsYXllcnNcbn07IiwiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc3BSYW5rQkc6IGNjLlNwcml0ZSwvL+aOkuWQjeeahOiDjOaZr+WbvueJh1xuICAgICAgICBsYWJlbFJhbms6IGNjLkxhYmVsLC8v5o6S5ZCNXG4gICAgICAgIGxhYmVsUGxheWVyTmFtZTogY2MuTGFiZWwsLy/njqnlrrblp5PlkI1cbiAgICAgICAgbGFiZWxHb2xkOiBjYy5MYWJlbCwvL+eOqeWutuW+l+WIsOeahOmHkemSsVxuICAgICAgICBzcFBsYXllclBob3RvOiBjYy5TcHJpdGUsLy/njqnlrrblpLTlg49cbiAgICAgICAgdGV4UmFua0JHOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgdGV4UGxheWVyUGhvdG86IGNjLlNwcml0ZUZyYW1lXG4gICAgfSxcblxuXG4gICAgaW5pdDogZnVuY3Rpb24gKHJhbmssIHBsYXllckluZm8pIHtcbiAgICAgICAgaWYgKHJhbmsgPDMpey8vXG4gICAgICAgICAgICB0aGlzLmxhYmVsUmFuay5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zcFJhbmtCRy5zcHJpdGVGcmFtZSA9IHRoaXMudGV4UmFua0JHW3JhbmtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sYWJlbFJhbmsubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sYWJlbFJhbmsuc3RyaW5nID0gKHJhbmsgKyAxKS50b1N0cmluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYWJlbFBsYXllck5hbWUuc3RyaW5nID0gcGxheWVySW5mby5uYW1lO1xuICAgICAgICB0aGlzLmxhYmVsR29sZC5zdHJpbmcgPSBwbGF5ZXJJbmZvLmdvbGQudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5zcFBsYXllclBob3RvLnNwcml0ZUZyYW1lID0gdGhpcy50ZXhQbGF5ZXJQaG90b1twbGF5ZXJJbmZvLnBob3RvSWR4XTtcblxuICAgIH0sXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGlzIE1hc3RlclwiKTtcblxuICAgIH0sXG5cblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsImNvbnN0IHBsYXllcnMgPSByZXF1aXJlKCdQbGF5ZXJEYXRhcycpLnBsYXllcnM7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3LFxuICAgICAgICBwcmVmYWJSYW5rSXRlbTogY2MuUHJlZmFiLFxuICAgICAgICByYW5rQ291bnQ6IDBcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuc2Nyb2xsVmlldy5jb250ZW50O1xuICAgICAgICB0aGlzLnBvcHVsYXRlTGlzdCgpO1xuICAgIH0sXG4gICAgcG9wdWxhdGVMaXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwO2kgPCB0aGlzLnJhbmtDb3VudDsgKytpKXtcbiAgICAgICAgICAgIHZhciBwbGF5ZXJJbmZvID0gcGxheWVyc1tpXTtcbiAgICAgICAgICAgIHZhciBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJSYW5rSXRlbSk7XG4gICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudCgnUmFua0l0ZW0nKS5pbml0KGkscGxheWVySW5mbyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNjLmxvZyh0aGlzLmNvbnRlbnQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxufSk7XG4iXX0=