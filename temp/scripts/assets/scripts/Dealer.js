"use strict";
cc._RFpush(module, '4102cUQI3VBZ5g4IGPfd9NE', 'Dealer');
// scripts/Dealer.js

var Actor = require('Actor');
var Utils = require('Utils');

cc.Class({
    'extends': Actor,

    properties: {
        //
        bestPoint: {
            get: function get() {
                var cards = this.holeCard ? [this.holeCard].concat(this.cards) : this.cards;
                var minMax = Utils.getMinMaxPoint(cards);
                return minMax.max;
            },
            override: true
        }
    },

    init: function init() {
        this._super();
        this.renderer.initDealer();
    },

    //返回是否要牌
    wantHit: function wantHit() {
        var Game = require('Game');
        var Types = require('Types');
        var bestPoint = this.bestPoint;

        //已经是最大牌了
        if (bestPoint === 21) {
            return false;
        }

        //不论抽到什么牌肯定不会爆，那就接着抽
        if (bestPoint <= 21 - 10) {
            return true;
        }

        var player = Game.instance.players;
        var outcome = Game.instance._getPlayerResult(player, this);

        switch (outcome) {
            case Types.Outcome.Win:
                return true;
            case Types.Outcome.Lose:
                return false;
        }

        return this.bestPoint < 17;
    },

    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();