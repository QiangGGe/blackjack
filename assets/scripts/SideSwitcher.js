cc.Class({
    extends: cc.Component,

    properties: {
       retainSideNodes: {
           default: [],
           type: cc.Node
       }
    },

    switchSide: function () {
        //将节点取反
        this.node.scaleX = -this.node.scaleX;
        for (var i = 0; i < this.retainSideNodes.length; ++i){
            var curNode = this.retainSideNodes[i];
            curNode.scaleX = -curNode.scaleX;
        }
    }
});
