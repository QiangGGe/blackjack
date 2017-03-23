cc.Class({
    extends: cc.Component,

    properties: {
        spRankBG: cc.Sprite,//排名的背景图片
        labelRank: cc.Label,//排名
        labelPlayerName: cc.Label,//玩家姓名
        labelGold: cc.Label,//玩家得到的金钱
        spPlayerPhoto: cc.Sprite,//玩家头像
        texRankBG: cc.SpriteFrame,
        texPlayerPhoto: cc.SpriteFrame
    },


    init: function (rank, playerInfo) {
        if (rank <3){//
            this.labelRank.node.active = false;
            this.spRankBG.spriteFrame = this.texRankBG[rank];
        } else {
            this.labelRank.node.active = true;
            this.labelRank.string = (rank + 1).toString();
        }

        this.labelPlayerName.string = playerInfo.name;
        this.labelGold.string = playerInfo.gold.toString();
        this.spPlayerPhoto.spriteFrame = this.texPlayerPhoto[playerInfo.photoIdx];

    },
    // use this for initialization
    onLoad: function () {
          console.log("This is Master");
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
