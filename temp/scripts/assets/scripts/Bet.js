"use strict";
cc._RFpush(module, '5b23bbG99ZE8p0B219jg7Dr', 'Bet');
// scripts/Bet.js

'use strict';

/**
 * Created by BDGame_qiang on 17/3/29.
 */
var Game = require('Game'); //这里这个方法只是导出了Game这个类，而要调用它里面的方法还需要实例化一个对象来调用

cc.Class({
    extends: cc.Component,

    properties: {
        chipPrefab: cc.Prefab, //押注的金币预制资源
        btnChips: { //下注的按钮
            default: [],
            type: cc.Node
        },
        chipValues: { //下注按钮对应的下注值
            default: [],
            type: 'Integer'
        },
        anchorChipToss: cc.Node //金币位置的起始锚点
    },

    init: function init() {
        this._registerBtns();
    },

    //统一注册按钮的点击事件的函数
    _registerBtns: function _registerBtns() {
        var self = this;
        var registerBtn = function registerBtn(index) {
            self.btnChips[i].on('touchstart', function (event) {
                if (Game.instance.addStake(self.chipValues[index])) {
                    self.playAddChip();
                }
            }, this);
        }; //on，node节点上绑定的监听事件，参数1type：要监听的事件名称，参数2callBack:回调函数，参数3target:响应函数的调用者
        for (var i = 0; i < self.btnChips.length; ++i) {
            registerBtn(i);
        }
    },

    //加注
    playAddChip: function playAddChip() {
        var startPos = cc.p(cc.randomMinus1To1() * 50, cc.randomMinus1To1() * 50); //产生一个随机位置
        var chip = cc.instantiate(this.chipPrefab); //实例化一个金币对象
        this.anchorChipToss.addChild(chip); //将金币加入到金币特定的layer
        chip.setPosition(startPos); //设置金币位置
        chip.getComponent('TossChip').play(); //播放金币投掷动画
    },

    resetChips: function resetChips() {
        Game.instance.resetStake();
        Game.instance.info.enabled = false;
        // this.
    },

    resetTossedChips: function resetTossedChips() {
        this.anchorChipToss.removeAllChildren();
    }

});

cc._RFpop();