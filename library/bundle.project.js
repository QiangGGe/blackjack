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
        // self.button = self.getComponent(cc.Button);
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
    //     properties: {
    //     spRankBG: cc.Sprite,
    //     labelRank: cc.Label,
    //     labelPlayerName: cc.Label,
    //     labelGold: cc.Label,
    //     spPlayerPhoto: cc.Sprite,
    //     texRankBG:{
    //         default: [],
    //         type: cc.SpriteFrame
    //     } ,
    //     texPlayerPhoto: {
    //         default: [],
    //         type: cc.SpriteFrame
    //     }
    //     // ...
    // },
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
    onLoad: function onLoad() {}

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9Db2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL3NjcmlwdHMvQXVkaW9NbmcuanMiLCJhc3NldHMvc2NyaXB0cy9VSS9CdXR0b25TY2FsZXIuanMiLCJhc3NldHMvc2NyaXB0cy9NZW51LmpzIiwiYXNzZXRzL3NjcmlwdHMvbW9kdWxlL1BsYXllckRhdGFzLmpzIiwiYXNzZXRzL3NjcmlwdHMvVUkvUmFua0l0ZW0uanMiLCJhc3NldHMvc2NyaXB0cy9VSS9SYW5rTGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQTtBQUNJO0FBQ0o7QUFDSTtBQUNKO0FBQ1E7QUFDSTtBQUNBO0FBQ1o7QUFDQTtBQUNRO0FBQ0k7QUFDQTtBQUNaO0FBQ0E7QUFDUTtBQUNJO0FBQ0E7QUFDWjtBQUNBO0FBQ1E7QUFDSTtBQUNBO0FBQ1o7QUFDQTtBQUNRO0FBQ0k7QUFDQTtBQUNaO0FBQ0E7QUFDUTtBQUNJO0FBQ0E7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDUjtBQUNJO0FBQ0k7QUFDUjtBQUNJO0FBQ0k7QUFDUjtBQUNBO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0E7QUFDQTtBQUVJO0FBQUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNJO0FBQ0o7QUFDSTtBQUNJO0FBQ0E7QUFDUjtBQUNBO0FBQ0E7QUFDSTtBQUNJO0FBQ1I7QUFDUTtBQUNBO0FBQ0k7QUFDWjtBQUNRO0FBQ1I7QUFDUTtBQUNBO0FBQ1I7QUFDUTtBQUNJO0FBQ0E7QUFDSTtBQUNoQjtBQUNZO0FBQ1o7QUFDUTtBQUNJO0FBQ0E7QUFDWjtBQUNBO0FBQ1E7QUFDQTtBQUNBO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0k7QUFDSjtBQUNJO0FBQ0k7QUFDUjtBQUNBO0FBQ0E7QUFDSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ1E7QUFDSTtBQUNaO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBRVE7QUFDQTtBQUNBO0FBQVI7QUFHUTtBQUNBO0FBQ0E7QUFEUjtBQUlRO0FBQ0E7QUFDQTtBQUZSO0FBS1E7QUFDQTtBQUNBO0FBSFI7QUFNUTtBQUNBO0FBQ0E7QUFKUjtBQU9RO0FBQ0E7QUFDQTtBQUxSO0FBUVE7QUFDQTtBQUNBO0FBTlI7QUFDQTtBQVNBO0FBQ0k7QUFQSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDSTtBQUNKO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNJO0FBQ1I7QUFBWTtBQUNBO0FBRVo7QUFBWTtBQUNBO0FBRVo7QUFDQTtBQUFRO0FBQ0E7QUFDQTtBQUVSO0FBQ0E7QUFDSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNJO0FBQ0o7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNSO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNSO0FBQ0k7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNaO0FBQ1k7QUFDWjtBQUNZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8v6LWi55qE6Z+z5pWIXG4gICAgICAgIHdpbkF1ZGlvOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICAvL+i+k+eahOmfs+aViFxuICAgICAgICBsb3NlQXVkaW86e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcblxuICAgICAgICBjYXJkQXVkaW86e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgLy/mjInpkq7pn7PmlYhcbiAgICAgICAgYnV0dG9uQXVkaW86e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgLy/niIbngrjpn7PmlYhcbiAgICAgICAgY2hpcHNBdWRpbzp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICAvL+W8gOWni+a4uOaIj+S5i+WJjeeahOetieW+heiDjOaZr+mfs+aViGJhY2tncmFuZG11c2ljXG4gICAgICAgIGJnbTp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgcGxheU11c2ljOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmJnbSx0cnVlKTtcbiAgICB9LFxuICAgIHBhdXNlTXVzaWM6ZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKCk7XG4gICAgfSxcbiAgICByZXN1bWVNdXNpYzpmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZU11c2ljKCk7XG4gICAgfSxcbiAgICAvL+aSreaUvueJueaKgOmfs+aViFxuICAgIF9wbGF5U0ZYOiBmdW5jdGlvbiAoY2xpcCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KGNsaXAsZmFsc2UpO1xuICAgIH0sXG4gICAgcGxheVdpbjogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLndpbkF1ZGlvKTtcbiAgICB9LFxuICAgIHBsYXlMb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3BsYXlTRlgodGhpcy5sb3NlQXVkaW8pO1xuICAgIH0sXG4gICAgcGxheUNhcmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLmNhcmRBdWRpbyk7XG4gICAgfSxcbiAgICBwbGF5Q2hpcHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLmNoaXBzQXVkaW8pO1xuICAgIH0sXG4gICAgcGxheUJ1dHRvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9wbGF5U0ZYKHRoaXMuYnV0dG9uQXVkaW8pO1xuICAgIH0sXG5cblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuXG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHByZXNzZWRTY2FsZTogMSwvL+WfuuehgOexu+Wei1xuICAgICAgICB0cmFuc0R1cmF0aW9uOiAwLy/ln7rnoYDnsbvlnotcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgLy/ov5nph4zmmK/ojrflj5boioLngrlcbiAgICAgICAgdmFyIGF1ZGlvTW5nID0gY2MuZmluZCgnTWVudS9BdWRpb01uZycpIHx8IGNjLmZpbmQoJ0dhbWUvQXVkaW9NbmcnKVxuICAgICAgICBpZiAoYXVkaW9Nbmcpe1xuICAgICAgICAgICAgYXVkaW9NbmcgPSBhdWRpb01uZy5nZXRDb21wb25lbnQoJ0F1ZGlvTW5nJyk7Ly/ov5nph4zlsLHmmK/ojrflj5bnu4Tku7bkuZ/lsLHmmK9qc+iEmuacrFxuICAgICAgICB9XG4gICAgICAgIHNlbGYuaW5pdFNjYWxlID0gdGhpcy5ub2RlLnNjYWxlO1xuICAgICAgICAvLyBzZWxmLmJ1dHRvbiA9IHNlbGYuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgIHNlbGYuc2NhbGVEb3duQWN0aW9uID0gY2Muc2NhbGVUbyhzZWxmLnRyYW5zRHVyYXRpb24sc2VsZi5wcmVzc2VkU2NhbGUpO1xuICAgICAgICBzZWxmLnNjYWxlVXBBY3Rpb24gPSBjYy5zY2FsZVRvKHNlbGYudHJhbnNEdXJhdGlvbixzZWxmLmluaXRTY2FsZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gb25Ub3VjaERvd24oZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgIGlmIChhdWRpb01uZyl7XG4gICAgICAgICAgICAgICAgYXVkaW9NbmcucGxheUJ1dHRvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ydW5BY3Rpb24oc2VsZi5zY2FsZURvd25BY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uVG91Y2hVcChldmVudCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5ydW5BY3Rpb24oc2VsZi5zY2FsZVVwQWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICAvL+azqOWGjOebkeWQrOS6i+S7tlxuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoc3RhcnQnLG9uVG91Y2hEb3duLCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoZW5kJyxvblRvdWNoVXAsdGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGNhbmNlbCcsIG9uVG91Y2hVcCx0aGlzLm5vZGUpO1xuXG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1ZGlvTW5nOiBjYy5Ob2RlXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgLy8gdGhpcy5hdWRpb01uZyA9IHRoaXMuYXVkaW9NbmcuZ2V0Q29tcG9uZW50KCdBdWRpb01uZycpO1xuICAgICAgICAvL+i/memHjOW8gOWni+aSreaUvuiDjOaZr+mfs+aViFxuICAgICAgICAvLyB0aGlzLmF1ZGlvTW5nLnBsYXlNdXNpYygpO1xuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoJ3RhYmxlJyxmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYy5sb2coJ05leHQgc2NlbmNlIHByZWxvYWRlZCcpXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBwbGF5R2FtZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgndGFibGUnKTtcbiAgICB9LFxuXG59KTtcbiIsImNvbnN0IHBsYXllcnMgPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAn54eD54On5ZCn77yM6JuL6JuL5YS/5YabJyxcbiAgICAgICAgZ29sZDogMzAwMCxcbiAgICAgICAgcGhvdG9JZHg6IDBcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ+WcsOaWueaUv+W6nCcsXG4gICAgICAgIGdvbGQ6IDIwMDAsXG4gICAgICAgIHBob3RvSWR4OiAxXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICfmiYvmnLrotoXkuronLFxuICAgICAgICBnb2xkOiAxNTAwLFxuICAgICAgICBwaG90b0lkeDogMlxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAn5aSp54G154G177yM5Zyw54G154G1JyxcbiAgICAgICAgZ29sZDogNTAwLFxuICAgICAgICBwaG90b0lkeDogM1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAn5ZOf5ZOf77yM5YiH5YWL6Ze5JyxcbiAgICAgICAgZ29sZDogOTAwMCxcbiAgICAgICAgcGhvdG9JZHg6IDRcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ+WtpuWnkOS4jeimgeatuycsXG4gICAgICAgIGdvbGQ6IDUwMDAsXG4gICAgICAgIHBob3RvSWR4OiA1XG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICfmj5Dnmb7kuIcnLFxuICAgICAgICBnb2xkOiAxMDAwMCxcbiAgICAgICAgcGhvdG9JZHg6IDZcbiAgICB9XG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwbGF5ZXJzOiBwbGF5ZXJzXG59OyIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNwUmFua0JHOiBjYy5TcHJpdGUsLy/mjpLlkI3nmoTog4zmma/lm77niYdcbiAgICAgICAgbGFiZWxSYW5rOiBjYy5MYWJlbCwvL+aOkuWQjVxuICAgICAgICBsYWJlbFBsYXllck5hbWU6IGNjLkxhYmVsLC8v546p5a625aeT5ZCNXG4gICAgICAgIGxhYmVsR29sZDogY2MuTGFiZWwsLy/njqnlrrblvpfliLDnmoTph5HpkrFcbiAgICAgICAgc3BQbGF5ZXJQaG90bzogY2MuU3ByaXRlLC8v546p5a625aS05YOPXG4gICAgICAgIHRleFJhbmtCRzogY2MuU3ByaXRlRnJhbWUsXG4gICAgICAgIHRleFBsYXllclBob3RvOiBjYy5TcHJpdGVGcmFtZVxuICAgIH0sXG4gICAgLy8gICAgIHByb3BlcnRpZXM6IHtcbiAgICAvLyAgICAgc3BSYW5rQkc6IGNjLlNwcml0ZSxcbiAgICAvLyAgICAgbGFiZWxSYW5rOiBjYy5MYWJlbCxcbiAgICAvLyAgICAgbGFiZWxQbGF5ZXJOYW1lOiBjYy5MYWJlbCxcbiAgICAvLyAgICAgbGFiZWxHb2xkOiBjYy5MYWJlbCxcbiAgICAvLyAgICAgc3BQbGF5ZXJQaG90bzogY2MuU3ByaXRlLFxuICAgIC8vICAgICB0ZXhSYW5rQkc6e1xuICAgIC8vICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgLy8gICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxuICAgIC8vICAgICB9ICxcbiAgICAvLyAgICAgdGV4UGxheWVyUGhvdG86IHtcbiAgICAvLyAgICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgIC8vICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICAvLyAuLi5cbiAgICAvLyB9LFxuICAgIGluaXQ6IGZ1bmN0aW9uIChyYW5rLCBwbGF5ZXJJbmZvKSB7XG4gICAgICAgIGlmIChyYW5rIDwzKXsvL1xuICAgICAgICAgICAgdGhpcy5sYWJlbFJhbmsubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3BSYW5rQkcuc3ByaXRlRnJhbWUgPSB0aGlzLnRleFJhbmtCR1tyYW5rXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWxSYW5rLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubGFiZWxSYW5rLnN0cmluZyA9IChyYW5rICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGFiZWxQbGF5ZXJOYW1lLnN0cmluZyA9IHBsYXllckluZm8ubmFtZTtcbiAgICAgICAgdGhpcy5sYWJlbEdvbGQuc3RyaW5nID0gcGxheWVySW5mby5nb2xkLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuc3BQbGF5ZXJQaG90by5zcHJpdGVGcmFtZSA9IHRoaXMudGV4UGxheWVyUGhvdG9bcGxheWVySW5mby5waG90b0lkeF07XG5cbiAgICB9LFxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuXG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsImNvbnN0IHBsYXllcnMgPSByZXF1aXJlKCdQbGF5ZXJEYXRhcycpLnBsYXllcnM7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3LFxuICAgICAgICBwcmVmYWJSYW5rSXRlbTogY2MuUHJlZmFiLFxuICAgICAgICByYW5rQ291bnQ6IDBcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuc2Nyb2xsVmlldy5jb250ZW50O1xuICAgICAgICB0aGlzLnBvcHVsYXRlTGlzdCgpO1xuICAgIH0sXG4gICAgcG9wdWxhdGVMaXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwO2kgPCB0aGlzLnJhbmtDb3VudDsgKytpKXtcbiAgICAgICAgICAgIHZhciBwbGF5ZXJJbmZvID0gcGxheWVyc1tpXTtcbiAgICAgICAgICAgIHZhciBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJSYW5rSXRlbSk7XG4gICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudCgnUmFua0l0ZW0nKS5pbml0KGkscGxheWVySW5mbyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNjLmxvZyh0aGlzLmNvbnRlbnQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxufSk7XG4iXX0=