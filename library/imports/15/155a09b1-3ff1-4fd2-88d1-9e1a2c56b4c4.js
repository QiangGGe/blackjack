'use strict';

var Game = require('Game');
var Types = require('Types');
var Utils = require('Utils');
var ActorPlayingState = Types.ActorPlayingState; //手中牌的状态


cc.Class({
    extends: cc.Component,

    properties: {
        playerInfo: cc.Node, //玩家信息节点
        stakeOnTable: cc.Node, //玩家筹码托盘节点
        cardInfo: cc.Node,
        cardPrafab: cc.Prefab,
        anchorCards: cc.Node,
        spPlayerName: cc.Sprite,
        labelPlayerName: cc.Label, //玩家名字节点
        labelTotalStake: cc.Label,
        spPlayerPhoto: cc.Sprite, //玩家头像节点
        callCounter: cc.ProgressBar,
        labelStakeOnTable: cc.Label,
        spChips: {
            default: [],
            type: cc.Sprite
        },
        labelCardInfo: cc.Label,
        spCardInfo: cc.Sprite,
        animFX: cc.Node,
        cardSpace: 0
    },

    // use this for initialization
    onLoad: function onLoad() {},

    init: function init(playerInfo, playerInfoPos, stakePos, turnDuration, switchSide) {
        this.actor = this.getComponent('Actor');

        this.isCounting = false;
        this.counterTimer = 0;
        this.turnDuration = turnDuration;

        //玩家头像位置
        this.playerInfo.position = playerInfoPos;
        //玩家筹码位置
        this.stakeOnTable.position = stakePos;
        //玩家名字
        this.labelPlayerName.string = playerInfo.name;
        //根据数据更新对应玩家的钱币总数
        this.updateTotalStake(playerInfo.gold);
        var photoIdx = playerInfo.photoIdx % 5; //取0-4 的玩家头像资源id
        this.spPlayerPhoto.spriteFrame = Game.instance.assetMng.playerPhotos[photoIdx];

        //玩家节点上的动画
        this.animFX = this.animFX.getComponent('FXPlayer');
        this.animFX.init();
        this.animFX.show(false);

        //爆牌卡片
        this.cardInfo.active = false;

        //从第四个玩家开始需要调整UI位置 UI位置取反
        if (switchSide) {
            this.spCardInfo.getComponent('SideSwitcher').switchSide();
            this.spPlayerName.getComponent('SideSwitcher').switchSide();
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (this.isCounting) {
            this.callCounter.progress = this.counterTimer / this.turnDuration;
            this.counterTimer += dt;
            if (this.counterTimer >= this.turnDuration) {
                this.isCounting = false;
                this.callCounter.progress = 1;
            }
        }
    },

    //初始化发牌人
    initDealer: function initDealer() {
        //
        this.actor = this.getComponent('Actor');

        this.animFX = this.animFX.getComponent('FXPlayer');
        this.animFX.init();
        this.animFX.show(false);
    },

    //更新总的钱数
    updateTotalStake: function updateTotalStake(num) {
        this.labelTotalStake.string = '$' + num;
    },

    //开始倒计时
    startCountdown: function startCountdown() {
        if (this.callCounter) {
            this.isCounting = true;
            this.counterTimer = 0;
        }
    },

    //重置计时器
    resetCountdown: function resetCountdown() {
        if (this.callCounter) {
            this.isCounting = false;
            this.counterTimer = 0;
            this.callCounter.progress = 0;
        }
    },

    playBlackJackFX: function playBlackJackFX() {
        this.animFX.playFX('blackjack');
    },

    playBustFX: function playBustFX() {
        this.animFX.playFX('bust');
    },

    onDeal: function onDeal(card, show) {
        var newCard = cc.instantiate(this.cardPrafab).getComponent('Card');
        this.anchorCards.addChild(newCard.node);
        newCard.init(card);
        newCard.reveal(show);

        var startPos = cc.p(0, 0);
        var index = this.actor.cards.length - 1;
        var endPos = cc.p(this.cardSpace * index, 0);
        newCard.node.setPosition(startPos);
        this._updatePointPos(endPos.x);

        var moveAction = cc.moveTo(0.5, endPos);
        var callback = cc.callFunc(this._onDealEnd, this);
        newCard.node.runAction(cc.sequence(moveAction, callback));
    },

    _onDealEnd: function _onDealEnd(target) {
        this.resetCountdown();
        if (this.actor.state === ActorPlayingState.Normal) {
            this.startCountdown();
        }
        this.updatePoint();
    },

    onReset: function onReset() {
        this.cardInfo.active = false;
        this.anchorCards.removeAllChildren();
        this._resetChips();
    },

    onRevealHoldCard: function onRevealHoldCard() {
        var card = cc.find('cardPrefab', this.anchorCards).getComponent("Card");
        card.reveal(true);
        this.updateState();
    },

    updatePoint: function updatePoint() {
        this.cardInfo.active = true;
        this.labelCardInfo.string = this.actor.bestPoint;
        switch (this.actor.hand) {
            case Types.Hand.BlackJack:
                this.animFX.show(true);
                this.animFX.playFX('blackjack');
                break;
            case Types.Hand.FiveCard:
                break;
        }
    },

    _updatePointPos: function _updatePointPos(xPos) {
        this.cardInfo.setPosition(xPos + 50, 0);
    },

    showStakeChips: function showStakeChips(stake) {
        var chips = this.spChips;
        var count = 0;
        if (stake > 50000) {
            count = 5;
        } else if (stake > 25000) {
            count = 4;
        } else if (stake > 10000) {
            count = 3;
        } else if (stake > 5000) {
            count = 2;
        } else if (stake > 0) {
            count = 1;
        }

        for (var i = 0; i < count; ++i) {
            chips[i].enabled = true;
        }
    },

    _resetChips: function _resetChips() {
        for (var i = 0; i < this.spChips.length; ++i) {
            this.spChips.enabled = false;
        }
    },

    updateState: function updateState() {
        switch (this.actor.state) {
            case ActorPlayingState.Normal:
                this.cardInfo.Active = true;
                this.spCardInfo.spriteFrame = Game.instance.assetMng.texCardInfo;
                this.updatePoint();
                break;
            case ActorPlayingState.Bust:
                var min = Utils.getMinMaxPoint(this.actor.cards).min;
                this.labelCardInfo.string = '爆牌(' + min + ')';
                this.spCardInfo.spriteFrame = Game.instance.assetMng.texBust;
                this.cardInfo.active = true;
                this.animFX.show(true);
                this.animFX.playFX('bust');
                this.resetCountdown();
                break;
            case ActorPlayingState.Stand:
                var max = Utils.getMinMaxPoint(this.actor.cards).max;
                this.labelCardInfo.string = '停牌(' + max + ')';
                this.spCardInfo.spriteFrame = Game.instance.assetMng.texCardInfo;
                this.resetCountdown();
                break;
        }
    }

});