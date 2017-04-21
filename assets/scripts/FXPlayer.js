cc.Class({
    extends: cc.Component,

   init: function () {
       this.anim = this.getComponent(cc.Animation);//获取动画组件
       this.sprite = this.getComponent(cc.Sprite);//获取图片精灵
   },

    show: function (show) {
        this.sprite.enabled = show;//表示该组件是否启用
    },

    //根据动画名称播放动画
    playFX: function (name) {//播放动画 name can be 'blackjack' or 'bust'
        this.anim.stop();
        this.anim.play(name);
    },

    hideFX: function () {
        this.sprite.enabled = false;
    }
});
