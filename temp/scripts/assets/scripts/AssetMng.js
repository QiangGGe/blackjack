"use strict";
cc._RFpush(module, '1c33c++XxNLVYnDK0BrVOxO', 'AssetMng');
// scripts/AssetMng.js

var AssetMng = cc.Class({
    "extends": cc.Component,
    //这里类是控制资源的类
    properties: {
        texBust: cc.SpriteFrame, //爆牌资源
        texCardInfo: cc.SpriteFrame, //牌数（个人认为是停牌后的背景资源）
        texCountdown: cc.SpriteFrame, //玩家头像上的倒计时资源
        texBetCountDown: cc.SpriteFrame, //下注倒计时资源
        playerPhotos: [cc.SpriteFrame] //玩家头像数组
    },

    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();