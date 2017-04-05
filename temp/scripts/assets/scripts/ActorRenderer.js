"use strict";
cc._RFpush(module, '155a0mxP/FP0ojRnhosVrTE', 'ActorRenderer');
// scripts/ActorRenderer.js

var Game = require('Game');
var Types = require('Types');
var Utils = require('Utils');
var ActorPlayingState = Types.ActorPlayingState; //手中牌的状态

cc.Class({
    'extends': cc.Component,

    properties: {
        playerInfo: cc.Node,
        stakeOnTable: cc.Node,
        cardInfo: cc.Node,
        cardPrafab: cc.Prefab,
        anchorCards: cc.Node,
        spPlayerName: cc.Label,
        labelPlayerName: cc.Label,
        labelTotalStake: cc.Label,
        spPlayerPhoto: cc.Sprite,
        callCounter: cc.ProgressBar,
        labelStakeOnTable: cc.Label,
        spChips: {
            'default': [],
            type: cc.Sprite
        },
        labelCardInfo: cc.Label,
        spCardInfo: cc.Sprite,
        animFX: cc.Node,
        cardSpace: 0
    },

    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();