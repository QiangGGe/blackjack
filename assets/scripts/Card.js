cc.Class({
    extends: cc.Component,

    properties: {
        //node
        point: cc.Label,//牌的点数
        suit: cc.Sprite,//牌的花色
        mainPic: cc.Sprite,//牌的背景图片
        cardBG: cc.Sprite, //牌的背部图片
        //resources
        redTextColor: cc.Color.WHITE,//牌字体红色颜色
        blackTextColor: cc.Color.WHITE,//牌字体黑色颜色
        texFrontBG: cc.SpriteFrame,//牌正面图片资源
        texBackBG: cc.SpriteFrame,//牌的背面图片资源
        //人物图片数组 主要用于J－K牌的图片构造
        texFaces:{
            default: [],
            type: cc.SpriteFrame
        },
        //大尺寸花色图片资源数组 主要用于A－10牌的图片构造
        texSuitBig: {
            default: [],
            type: cc.SpriteFrame
        },
        texSuitSmall: {
            default: [],
            type: cc.SpriteFrame
        }
    },

    init: function (card) {
        var isFaceCard = card.point >10;

        //1、牌 图形构造
        if (isFaceCard){//判断是否是人物牌（J\Q\K都是人物牌）
            this.mainPic.spriteFrame = this.texFaces[card.point - 10 - 1];
        } else {
            this.mainPic.spriteFrame = this.texSuitBig[card.suit -1];
        }


        //2、牌的点数
        this.point.string = card.pointName;

        //3、点数的颜色是红色还是黑色
        if (card.isRedSuit){
            this.point.node.color = this.redTextColor;
        } else {
            this.point.node.color = this.blackTextColor;
        }
        //4、设置牌的花色
        this.suit.spriteFrame = this.texSuitSmall[card.suit -1];
    },

    //牌面朝向
    reveal: function (isFaceUp) {
        this.point.node.active = isFaceUp;
        this.suit.node.active = isFaceUp;
        this.mainPic.node.active = isFaceUp;
        this.cardBG.spriteFrame = isFaceUp ? this.texFrontBG : this.texBackBG;
    },

});
