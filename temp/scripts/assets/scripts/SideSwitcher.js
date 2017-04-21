"use strict";
cc._RFpush(module, 'd4996fiZu1Kc4afhIM4AY48', 'SideSwitcher');
// scripts/SideSwitcher.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        retainSideNodes: {
            default: [],
            type: cc.Node
        }
    },

    switchSide: function switchSide() {
        //将节点取反
        this.node.scaleX = -this.node.scaleX;
        for (var i = 0; i < this.retainSideNodes.length; ++i) {
            var curNode = this.retainSideNodes[i];
            curNode.scaleX = -curNode.scaleX;
        }
    }
});

cc._RFpop();