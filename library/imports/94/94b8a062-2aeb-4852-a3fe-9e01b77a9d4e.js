'use strict';

var Actor = require('Actor');

cc.Class({
    extends: Actor,

    init: function init() {
        this._super();
        this.labelStake = this.renderer.labelStakeOnTable; //玩家头像上的赌资label
        this.stakeNum = 0; //玩家下注的钱币数量
    },

    //重置下注
    reset: function reset() {
        this._super();
        this.resetStake();
    },

    addCard: function addCard(card) {
        this._super(card);
    },

    //加钱币下注
    addStake: function addStake(delta) {
        this.stakeNum += delta;
        this.updateStake(this.stakeNum);
    },

    //重置下注数量
    resetStake: function resetStake(delta) {
        this.stakeNum = 0;
        this.updateStake(this.stakeNum);
    },

    updateStake: function updateStake(number) {
        this.labelStake.string = number;
    }

});