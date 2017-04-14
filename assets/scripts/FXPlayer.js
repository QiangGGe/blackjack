cc.Class({
    extends: cc.Component,

   init: function () {
       this.anim = this.getComponent(cc.Animation);
       this.sprite = this.getComponent(cc.Sprite);
   },

    show: function (show) {
        this.sprite.enabled = show;
    },

    playFX: function (name) {//播放动画 name can be 'blackjack' or 'bust'
        this.anim.stop();
        this.anim.play(name);
    },

    hideFX: function () {
        this.sprite.enabled = false;
    }
});
