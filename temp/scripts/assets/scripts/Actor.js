"use strict";
cc._RFpush(module, 'ef0057CVpJJM4yqsj0kBkSh', 'Actor');
// scripts/Actor.js


var Types = require('Types');
var Utils = require('Utils');
var ActorPlayingState = Types.ActorPlayingState;

cc.Class({
    'extends': cc.Component,

    properties: {
        //所有明牌
        cards: {
            'default': [],
            serializable: false, //序列化
            visible: false
        },
        //暗牌 demo 暂存
        holeCard: {
            'default': null,
            seriablizable: false,
            visible: false
        },
        //手上最接近21点的点数（有可能超过21点）
        bestPoint: {
            get: function get() {
                var minMax = Utils.getMinMaxPoint(this.cards);
                return minMax.max;
            }
        },
        //牌型，不考虑是否爆牌
        hand: {
            get: function get() {
                var count = this.cards.length;
                if (this.holeCard) {
                    ++count;
                }
                if (count >= 5) {
                    return Types.Hand.FiveCard; //五小龙
                }
                if (count === 2 && this.bestPoint === 21) {
                    return Types.Hand.BlackJack; //
                }
                return Types.Hand.Normal; //普通牌型
            }
        },

        canReport: {
            get: function get() {
                return this.hand !== Types.Hand.Normal;
            },
            visible: false
        },

        renderer: {
            'default': null,
            type: cc.Node
        },
        state: {
            'default': ActorPlayingState.Normal,
            notify: function notify(oldState) {
                if (this.state !== oldState) {
                    this.renderer.updateState();
                }
            },
            type: ActorPlayingState,
            serializable: false
        }
    },

    init: function init() {
        this.ready = true;
        this.renderer = this.getComponent('ActorRenderer');
    },

    addCard: function addCard(card) {
        this.cards.push(card);
        this.renderer.onDeal(card, true); //分配牌

        var cards = this.holeCard ? [this.holeCard].concat(this.cards) : this.cards; //concat 将多个数组合并
        if (Utils.isBust(cards)) {
            //是否爆牌
            this.state = ActorPlayingState.Bust;
        }
    },

    addHoleCard: function addHoleCard(card) {
        this.holeCard = card;
        this.renderer.onDeal(card, false);
    },

    stand: function stand() {
        this.state = ActorPlayingState.Stand; //停牌
    },

    revealHoldCard: function revealHoldCard() {
        if (this.holeCard) {
            this.cards.unshift(this.holeCard); //unshift可向数组的开头添加一个或更多元素，并返回新的长度。
        }
    },

    report: function report() {
        this.state = ActorPlayingState.Report;
    },

    reset: function reset() {
        this.cards = [];
        this.holeCard = null;
        this.reported = false;
        this.state = ActorPlayingState.Normal;
        this.renderer.onReset();
    }

});

cc._RFpop();