cc.Class({
    "extends": cc.Component,

    init: function init() {
        this.anim = this.getComponent(cc.Animation);
        this.sprite = this.getComponent(cc.Sprite);
    },

    show: function show(_show) {
        this.sprite.enabled = _show;
    },

    playFX: function playFX(name) {
        //播放动画 name can be 'blackjack' or 'bust'
        this.anim.stop();
        this.anim.play(name);
    },

    hideFX: function hideFX() {
        this.sprite.enabled = false;
    }
});