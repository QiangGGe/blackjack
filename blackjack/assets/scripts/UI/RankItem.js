cc.Class({
    extends: cc.Component,

    properties: {
        spRankBG: cc.Sprite,//排名的背景图片
        labelRank: cc.Label,//排名
        labelPlayerName: cc.Label,//玩家姓名
        spPlayerPhoto: cc.Sprite,//玩家头像
        texRankBG: cc.SpriteFrame,//排名的背景图片数组
        texPlayerPhoto: cc.SpriteFrame//玩家头像数组

    },

    init: function (rank, playerInfo) {
        if (rank <3){//
            this.labelRank.node.active = false;
            this.spRankBG.spriteFrame = this.textRankBG[rank];
        } else {
            this.labelRank.node.active = ture;
            this.labelRank.string = (rank + 1).toString();
        }
    },
    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
