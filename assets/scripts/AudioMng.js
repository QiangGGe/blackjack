cc.Class({
    extends: cc.Component,

    properties: {
        //赢的音效
        winAudio:{
            default: null,
            url: cc.AudioClip
        },
        //输的音效
        loseAudio:{
            default:null,
            url: cc.AudioClip
        },
        //发牌的声音
        cardAudio:{
            default:null,
            url: cc.AudioClip
        },
        //按钮音效
        buttonAudio:{
            default:null,
            url: cc.AudioClip
        },
        //投掷金币音效
        chipsAudio:{
            default:null,
            url: cc.AudioClip
        },
        //开始游戏之前的等待背景音效backgrandmusic
        bgm:{
            default:null,
            url: cc.AudioClip
        }

    },

    playMusic: function () {
        cc.audioEngine.playMusic(this.bgm,true);
    },
    pauseMusic:function () {
        cc.audioEngine.pauseMusic();
    },
    resumeMusic:function () {
        cc.audioEngine.resumeMusic();
    },
    //播放特技音效
    _playSFX: function (clip) {
        cc.audioEngine.playEffect(clip,false);
    },
    playWin: function(){
        this._playSFX(this.winAudio);
    },
    playLose: function () {
        this._playSFX(this.loseAudio);
    },
    playCard: function () {
        this._playSFX(this.cardAudio);
    },
    playChips: function () {
        this._playSFX(this.chipsAudio);
    },
    playButton: function () {
        this._playSFX(this.buttonAudio);
    },


    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
