"use strict";
cc._RFpush(module, '44c8eI9NbVB0ZiL0L95jyb4', 'Utils');
// scripts/module/Utils.js

// 返回尽可能不超过 21 点的最小和最大点数
function getMinMaxPoint(cards) {
    var hasAce = false;
    var min = 0;
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        if (card.point === 1) {
            hasAce = true;
        }
        min += Math.min(10, card.point);
    }
    var max = min;
    //如果有1个A可以当成11
    if (hasAce && min + 10 <= 21) {
        //如果两个A都当成11，那么总分最小也会是22，爆了，所以最多只能有一个A当成11
        max += 10;
    }

    return {
        min: min,
        max: max
    };
}
//爆牌了
function isBust(cards) {
    var sum = 0;
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        sum += Math.min(10, card.point); //这里的J|Q|K 都是10
    }
    return sum > 21;
}

var isMobile = function isMobile() {
    return cc.system.isMobile();
};

module.exports = {
    isBust: isBust,
    getMinMaxPoint: getMinMaxPoint,
    isMobile: isMobile
};

cc._RFpop();