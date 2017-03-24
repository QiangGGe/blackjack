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