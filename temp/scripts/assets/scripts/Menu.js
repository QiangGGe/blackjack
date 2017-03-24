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