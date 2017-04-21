"use strict";
cc._RFpush(module, '05cbc8c2+JLTI2l0rxUfga5', 'Decks');
// scripts/module/Decks.js

'use strict';

var Types = require('Types');

/**
 * 扑克管理类，用来管理一副或多副牌
 * @class Decks
 * @constructor
 * @param {number} numberOfDecks - 总共几副牌
 */
function Decks(numberOfDecks) {
    //总共几副牌
    this._numberOfDecks = numberOfDecks;
    //还没发出去的牌
    this._cardIds = new Array(numberOfDecks * 52);

    this.reset();
}

/**
 * 重置所有牌
 * @method reset
 */

Decks.prototype.reset = function () {
    this._cardIds.length = this._numberOfDecks * 52;
    var index = 0;
    var fromId = Types.Card.fromId;
    for (var i = 0; i < this._numberOfDecks; ++i) {
        for (var cardId = 0; cardId < 52; ++cardId) {
            this._cardIds[index] = fromId(cardId);
            ++index;
        }
    }
};

/**
 * 随机抽一张牌，如果已经没牌了，将返回 null
 * @method draw
 * @return {Card}
 */
Decks.prototype.draw = function () {
    var cardIds = this._cardIds;
    var len = cardIds.length;
    if (len === 0) {
        return null;
    }
    var random = Math.random(); //Math.random()是令系统随机选取大于等于 0.0 且小于 1.0 的伪随机 double 值
    var index = random * len | 0; //& | 位运算符： 先转换为2进制，然后按位进行与或比较
    var result = cardIds[index];

    //保持数组紧凑 将牌的最后一张用来弥补取走的那张牌
    var last = cardIds[len - 1];
    cardIds[index] = last;
    cardIds.length = len - 1;

    return result;
};

module.exports = Decks;

cc._RFpop();