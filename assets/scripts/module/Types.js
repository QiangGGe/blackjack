var Suit = cc.Enum({
        Spade: 1,   //黑桃
        Heart: 2,   //红桃
        Club: 3,    //梅花（黑）
        Diamond: 4,//方块（红）
});

var A2_10JQK = 'NAN,A,2,3,4,5,6,7,8,9,10,J,Q,K'.split(',');//split() 方法用于把一个字符串分割成字符串数组。返回的是一个数组
/*
 扑克牌类，只用来表示牌的基本属性，不包含游戏逻辑，所有属性只读，
 因此全局只需要有 52 个实例（去掉大小王），不论有多少副牌

 */

function Card (point, suit) {
    //为对象一次性定义多个属性
    Object.defineProperties(this,{
        point:{
            value: point,
            writable: false
        },
        suit: {
            value: suit,//牌的花色
            writable: false
        },
        //id可能的值为 0 到 51
        id: {
            value: (suit - 1) * 13 + (point -1),
            writable: false
        },
        pointName: {
            get: function () {
                return A2_10JQK[this.point];//设置牌的大小
            }
        },
        suitName: {
            get: function () {
                return Suit[this.suit];//设置牌花色名称
            }
        },
        isBlackSuit:{//设置牌的颜色是黑色还是红色 黑桃、梅花是黑色
            get: function () {
                return this.suit == Suit.Spade || this.suit === Suit.Club;
            }
        },
        isRedSuit: {//红桃、方片是红色
            get: function () {
                return this.suit === Suit.Heart || this.suit === Suit.Diamond;
            }
        },

    });
}

Card.prototype.toString = function () {
    return this.suitName + ' '+this.pointName;
};

//存放52张扑克牌实例
var cards = new Array(52);

Card.fromId = function (id) {
    return cards[id];
};

//初始化所有扑克牌
(function createCards () {
    for (var s = 1; s <= 4; s++){
        for (var p = 1; p<=13; p++){
            var card = new Card(p, s);
            cards[card.id] = card;
        }
    }
})();

//手中牌的状态
var ActorPlayingState = cc.Enum({
    Normal: -1,
    Stand: -1,//停牌
    Report: -1,//报到
    Bust: -1, //爆了
});

//输赢
var Outcome = cc.Enum({
    Win: -1,
    Lose: -1,
    Tie: -1,
});

//牌型，值越大越厉害
var Hand = cc.Enum({
    Normal: -1, //无
    BlackJack: -1,// 黑杰克
    FiveCard: -1,//五小龙
});

module.exports = {
    Suit: Suit,
    Card: Card,
    ActorPlayingState: ActorPlayingState,
    Hand: Hand,
    Outcome: Outcome,
};