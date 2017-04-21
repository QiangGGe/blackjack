
var Types = require('Types');
var Utils = require('Utils');
var ActorPlayingState = Types.ActorPlayingState;

cc.Class({
    extends: cc.Component,

    properties: {
        //熟悉名称如果是下划线_开头的那么默认是不显示在属性面板上的，但可以设置visible：true来强制显示
        //所有明牌
        cards: {
            default: [],
            serializable: false,//不序列化  不设置的话是默认会被序列化的
            visible: false//强制隐藏属性面板上的显示
        },
        //暗牌 demo 暂存
        holeCard: {
            default: null,
            seriablizable: false,
            visible: false
        },
        //手上最接近21点的点数（有可能超过21点）
        bestPoint: {
            get: function () {//设置了get方法，访问该属性的时候就能触发预定义的get或set方法，并且可以显示到属性检查器上
                var minMax = Utils.getMinMaxPoint(this.cards);
                return minMax.max;
            }
        },
        //牌型，不考虑是否爆牌
        hand: {
            get: function () {
                var count = this.cards.length;
                if (this.holeCard){
                    ++count;
                }
                if (count >= 5){
                    return Types.Hand.FiveCard;//五小龙
                }
                if (count === 2 && this.bestPoint === 21){
                    return Types.Hand.BlackJack;//
                }
                return Types.Hand.Normal;//普通牌型
            }
        },

        canReport: {
            get: function () {
                return this.hand !== Types.Hand.Normal;
            },
            visible: false
        },

        renderer: {
            default: null,
            type: cc.Node
        },
        state: {
            default: ActorPlayingState.Normal,
            notify: function (oldState) {//当属性被赋值时触发制定方法 需要定义default 属性并且不能用于数组
                if (this.state !== oldState){
                    this.renderer.updateState();
                }
            },
            type: ActorPlayingState,
            serializable: false,
        }
    },

    init: function () {
        this.ready = true;
        this.renderer = this.getComponent('ActorRenderer');
    },

    addCard: function (card) {
        this.cards.push(card);
        this.renderer.onDeal(card, true);//分配牌

        var cards = this.holeCard ? [this.holeCard].concat(this.cards) : this.cards;//concat 将多个数组合并
        if (Utils.isBust(cards)){//是否爆牌
            this.state = ActorPlayingState.Bust;
        }
    },

    addHoleCard: function (card) {
        this.holeCard = card;
        this.renderer.onDeal(card,false);
    },

    stand: function () {
        this.state = ActorPlayingState.Stand;//停牌
    },

    //显示手中的牌
    revealHoldCard: function () {
        if (this.holeCard){
            this.cards.unshift(this.holeCard);//unshift可向数组的开头添加一个或更多元素，并返回新的长度。
        }
    },

    report: function () {
        this.state = ActorPlayingState.Report;
    },

    reset: function () {
        this.cards = [];
        this.holeCard = null;
        this.reported = false;
        this.state = ActorPlayingState.Normal;
        this.renderer.onReset();
    }



});
