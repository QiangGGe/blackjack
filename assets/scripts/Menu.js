cc.Class({
    extends: cc.Component,

    properties: {
        audioMng: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        
        // this.audioMng = this.audioMng.getComponent('AudioMng');
        //这里开始播放背景音效
        // this.audioMng.playMusic();
        cc.director.preloadScene('table',function () {
            cc.log('Next scence preloaded')
        });
    },

    playGame:function () {
        cc.director.loadScene('table');
    }
});
