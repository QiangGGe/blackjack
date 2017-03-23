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
},{"PlayerDatas":"PlayerDatas"}],"masterTestFile":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fbfee2sYd9Bd41Rr8Wb2EDT', 'masterTestFile');
// scripts/UI/masterTestFile.js

/**
 * Created by BDGame_qiang on 17/3/23.
 */

cc._RFpop();
},{}]},{},["AudioMng","Menu","ButtonScaler","RankItem","RankList","masterTestFile","PlayerDatas"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9Db2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL3NjcmlwdHMvQXVkaW9NbmcuanMiLCJhc3NldHMvc2NyaXB0cy9VSS9CdXR0b25TY2FsZXIuanMiLCJhc3NldHMvc2NyaXB0cy9NZW51LmpzIiwiYXNzZXRzL3NjcmlwdHMvbW9kdWxlL1BsYXllckRhdGFzLmpzIiwiYXNzZXRzL3NjcmlwdHMvVUkvUmFua0l0ZW0uanMiLCJhc3NldHMvc2NyaXB0cy9VSS9SYW5rTGlzdC5qcyIsImFzc2V0cy9zY3JpcHRzL1VJL21hc3RlclRlc3RGaWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBO0FBQ0k7QUFDSjtBQUNJO0FBQ0o7QUFDUTtBQUNJO0FBQ0E7QUFDWjtBQUNBO0FBQ1E7QUFDSTtBQUNBO0FBQ1o7QUFDQTtBQUNRO0FBQ0k7QUFDQTtBQUNaO0FBQ0E7QUFDUTtBQUNJO0FBQ0E7QUFDWjtBQUNBO0FBQ1E7QUFDSTtBQUNBO0FBQ1o7QUFDQTtBQUNRO0FBQ0k7QUFDQTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0k7QUFDSTtBQUNSO0FBQ0E7QUFDSTtBQUNJO0FBQ1I7QUFDSTtBQUNJO0FBQ1I7QUFDSTtBQUNJO0FBQ1I7QUFDSTtBQUNJO0FBQ1I7QUFDSTtBQUNJO0FBQ1I7QUFDSTtBQUNJO0FBQ1I7QUFDQTtBQUNBO0FBRUk7QUFBSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0k7QUFDSjtBQUNJO0FBQ0k7QUFDQTtBQUNSO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDUjtBQUNRO0FBQ0E7QUFDSTtBQUNaO0FBQ1E7QUFDQTtBQUNBO0FBQ1I7QUFFUTtBQUNJO0FBQ0E7QUFDSTtBQUFoQjtBQUVZO0FBQVo7QUFFUTtBQUNJO0FBQ0E7QUFBWjtBQUNBO0FBRVE7QUFDQTtBQUNBO0FBQVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0k7QUFDSjtBQUNJO0FBQ0k7QUFDUjtBQUNBO0FBQ0E7QUFDSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ1E7QUFDSTtBQUNaO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBRVE7QUFDQTtBQUNBO0FBQVI7QUFHUTtBQUNBO0FBQ0E7QUFEUjtBQUlRO0FBQ0E7QUFDQTtBQUZSO0FBS1E7QUFDQTtBQUNBO0FBSFI7QUFNUTtBQUNBO0FBQ0E7QUFKUjtBQU9RO0FBQ0E7QUFDQTtBQUxSO0FBUVE7QUFDQTtBQUNBO0FBTlI7QUFDQTtBQVNBO0FBQ0k7QUFQSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDSTtBQUNKO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNSO0FBQ0E7QUFFSTtBQUNJO0FBQVI7QUFDWTtBQUNBO0FBQ1o7QUFDWTtBQUNBO0FBQ1o7QUFDQTtBQUNRO0FBQ0E7QUFDQTtBQUNSO0FBQ0E7QUFFSTtBQUNNO0FBQVY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDSTtBQUNKO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDUjtBQUNBO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7QUFDUjtBQUNJO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDWjtBQUNZO0FBQ1o7QUFDWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8v6LWi55qE6Z+z5pWIXG4gICAgICAgIHdpbkF1ZGlvOntcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICAvL+i+k+eahOmfs+aViFxuICAgICAgICBsb3NlQXVkaW86e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcblxuICAgICAgICBjYXJkQXVkaW86e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgLy/mjInpkq7pn7PmlYhcbiAgICAgICAgYnV0dG9uQXVkaW86e1xuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgLy/niIbngrjpn7PmlYhcbiAgICAgICAgY2hpcHNBdWRpbzp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICAvL+W8gOWni+a4uOaIj+S5i+WJjeeahOetieW+heiDjOaZr+mfs+aViGJhY2tncmFuZG11c2ljXG4gICAgICAgIGJnbTp7XG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgcGxheU11c2ljOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmJnbSx0cnVlKTtcbiAgICB9LFxuICAgIHBhdXNlTXVzaWM6ZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKCk7XG4gICAgfSxcbiAgICByZXN1bWVNdXNpYzpmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZU11c2ljKCk7XG4gICAgfSxcbiAgICAvL+aSreaUvueJueaKgOmfs+aViFxuICAgIF9wbGF5U0ZYOiBmdW5jdGlvbiAoY2xpcCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KGNsaXAsZmFsc2UpO1xuICAgIH0sXG4gICAgcGxheVdpbjogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLndpbkF1ZGlvKTtcbiAgICB9LFxuICAgIHBsYXlMb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3BsYXlTRlgodGhpcy5sb3NlQXVkaW8pO1xuICAgIH0sXG4gICAgcGxheUNhcmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLmNhcmRBdWRpbyk7XG4gICAgfSxcbiAgICBwbGF5Q2hpcHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLmNoaXBzQXVkaW8pO1xuICAgIH0sXG4gICAgcGxheUJ1dHRvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9wbGF5U0ZYKHRoaXMuYnV0dG9uQXVkaW8pO1xuICAgIH0sXG5cblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuXG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHByZXNzZWRTY2FsZTogMSwvL+WfuuehgOexu+Wei1xuICAgICAgICB0cmFuc0R1cmF0aW9uOiAwLy/ln7rnoYDnsbvlnotcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgLy/ov5nph4zmmK/ojrflj5boioLngrlcbiAgICAgICAgdmFyIGF1ZGlvTW5nID0gY2MuZmluZCgnTWVudS9BdWRpb01uZycpIHx8IGNjLmZpbmQoJ0dhbWUvQXVkaW9NbmcnKVxuICAgICAgICBpZiAoYXVkaW9Nbmcpe1xuICAgICAgICAgICAgYXVkaW9NbmcgPSBhdWRpb01uZy5nZXRDb21wb25lbnQoJ0F1ZGlvTW5nJyk7Ly/ov5nph4zlsLHmmK/ojrflj5bnu4Tku7bkuZ/lsLHmmK9qc+iEmuacrFxuICAgICAgICB9XG4gICAgICAgIHNlbGYuaW5pdFNjYWxlID0gdGhpcy5ub2RlLnNjYWxlO1xuICAgICAgICBzZWxmLnNjYWxlRG93bkFjdGlvbiA9IGNjLnNjYWxlVG8oc2VsZi50cmFuc0R1cmF0aW9uLHNlbGYucHJlc3NlZFNjYWxlKTtcbiAgICAgICAgc2VsZi5zY2FsZVVwQWN0aW9uID0gY2Muc2NhbGVUbyhzZWxmLnRyYW5zRHVyYXRpb24sc2VsZi5pbml0U2NhbGUpO1xuXG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBvblRvdWNoRG93bihldmVudCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgaWYgKGF1ZGlvTW5nKXtcbiAgICAgICAgICAgICAgICBhdWRpb01uZy5wbGF5QnV0dG9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJ1bkFjdGlvbihzZWxmLnNjYWxlRG93bkFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25Ub3VjaFVwKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICB0aGlzLnJ1bkFjdGlvbihzZWxmLnNjYWxlVXBBY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIC8v5rOo5YaM55uR5ZCs5LqL5Lu2XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hzdGFydCcsb25Ub3VjaERvd24sIHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hlbmQnLG9uVG91Y2hVcCx0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoY2FuY2VsJywgb25Ub3VjaFVwLHRoaXMubm9kZSk7XG5cbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuIiwiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXVkaW9Nbmc6IGNjLk5vZGVcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgICAgICAvLyB0aGlzLmF1ZGlvTW5nID0gdGhpcy5hdWRpb01uZy5nZXRDb21wb25lbnQoJ0F1ZGlvTW5nJyk7XG4gICAgICAgIC8v6L+Z6YeM5byA5aeL5pKt5pS+6IOM5pmv6Z+z5pWIXG4gICAgICAgIC8vIHRoaXMuYXVkaW9NbmcucGxheU11c2ljKCk7XG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZSgndGFibGUnLGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNjLmxvZygnTmV4dCBzY2VuY2UgcHJlbG9hZGVkJylcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHBsYXlHYW1lOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCd0YWJsZScpO1xuICAgIH0sXG5cbn0pO1xuIiwiY29uc3QgcGxheWVycyA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICfnh4Png6flkKfvvIzom4vom4vlhL/lhpsnLFxuICAgICAgICBnb2xkOiAzMDAwLFxuICAgICAgICBwaG90b0lkeDogMFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAn5Zyw5pa55pS/5bqcJyxcbiAgICAgICAgZ29sZDogMjAwMCxcbiAgICAgICAgcGhvdG9JZHg6IDFcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ+aJi+acuui2heS6uicsXG4gICAgICAgIGdvbGQ6IDE1MDAsXG4gICAgICAgIHBob3RvSWR4OiAyXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICflpKnngbXngbXvvIzlnLDngbXngbUnLFxuICAgICAgICBnb2xkOiA1MDAsXG4gICAgICAgIHBob3RvSWR4OiAzXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICflk5/lk5/vvIzliIflhYvpl7knLFxuICAgICAgICBnb2xkOiA5MDAwLFxuICAgICAgICBwaG90b0lkeDogNFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAn5a2m5aeQ5LiN6KaB5q27JyxcbiAgICAgICAgZ29sZDogNTAwMCxcbiAgICAgICAgcGhvdG9JZHg6IDVcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ+aPkOeZvuS4hycsXG4gICAgICAgIGdvbGQ6IDEwMDAwLFxuICAgICAgICBwaG90b0lkeDogNlxuICAgIH1cbl07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHBsYXllcnM6IHBsYXllcnNcbn07IiwiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc3BSYW5rQkc6IGNjLlNwcml0ZSwvL+aOkuWQjeeahOiDjOaZr+WbvueJh1xuICAgICAgICBsYWJlbFJhbms6IGNjLkxhYmVsLC8v5o6S5ZCNXG4gICAgICAgIGxhYmVsUGxheWVyTmFtZTogY2MuTGFiZWwsLy/njqnlrrblp5PlkI1cbiAgICAgICAgbGFiZWxHb2xkOiBjYy5MYWJlbCwvL+eOqeWutuW+l+WIsOeahOmHkemSsVxuICAgICAgICBzcFBsYXllclBob3RvOiBjYy5TcHJpdGUsLy/njqnlrrblpLTlg49cbiAgICAgICAgdGV4UmFua0JHOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgdGV4UGxheWVyUGhvdG86IGNjLlNwcml0ZUZyYW1lXG4gICAgfSxcblxuXG4gICAgaW5pdDogZnVuY3Rpb24gKHJhbmssIHBsYXllckluZm8pIHtcbiAgICAgICAgaWYgKHJhbmsgPDMpey8vXG4gICAgICAgICAgICB0aGlzLmxhYmVsUmFuay5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zcFJhbmtCRy5zcHJpdGVGcmFtZSA9IHRoaXMudGV4UmFua0JHW3JhbmtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sYWJlbFJhbmsubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sYWJlbFJhbmsuc3RyaW5nID0gKHJhbmsgKyAxKS50b1N0cmluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYWJlbFBsYXllck5hbWUuc3RyaW5nID0gcGxheWVySW5mby5uYW1lO1xuICAgICAgICB0aGlzLmxhYmVsR29sZC5zdHJpbmcgPSBwbGF5ZXJJbmZvLmdvbGQudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5zcFBsYXllclBob3RvLnNwcml0ZUZyYW1lID0gdGhpcy50ZXhQbGF5ZXJQaG90b1twbGF5ZXJJbmZvLnBob3RvSWR4XTtcblxuICAgIH0sXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGlzIE1hc3RlclwiKTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuIiwiY29uc3QgcGxheWVycyA9IHJlcXVpcmUoJ1BsYXllckRhdGFzJykucGxheWVycztcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcsXG4gICAgICAgIHByZWZhYlJhbmtJdGVtOiBjYy5QcmVmYWIsXG4gICAgICAgIHJhbmtDb3VudDogMFxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQ7XG4gICAgICAgIHRoaXMucG9wdWxhdGVMaXN0KCk7XG4gICAgfSxcbiAgICBwb3B1bGF0ZUxpc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aSA8IHRoaXMucmFua0NvdW50OyArK2kpe1xuICAgICAgICAgICAgdmFyIHBsYXllckluZm8gPSBwbGF5ZXJzW2ldO1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYlJhbmtJdGVtKTtcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KCdSYW5rSXRlbScpLmluaXQoaSxwbGF5ZXJJbmZvKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2MubG9nKHRoaXMuY29udGVudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsbnVsbF19