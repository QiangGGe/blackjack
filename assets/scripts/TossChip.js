/**
 * Created by BDGame_qiang on 17/3/29.
 */
cc.Class({
   extends: cc.Component,
    properties:{
       anim: cc.Animation
    },
    //播放投掷动画
    play: function () {
        this.anim.play('chipToss');
    }
});