cc.Class({
    'extends': cc.Component,

    properties: {
        pressedScale: 1, //基础类型
        transDuration: 0 //基础类型
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        //这里是获取节点
        var audioMng = cc.find('Menu/AudioMng') || cc.find('Game/AudioMng');
        if (audioMng) {
            audioMng = audioMng.getComponent('AudioMng'); //这里就是获取组件也就是js脚本
        }
        self.initScale = this.node.scale;
        // self.button = self.getComponent(cc.Button);
        self.scaleDownAction = cc.scaleTo(self.transDuration, self.pressedScale);
        self.scaleUpAction = cc.scaleTo(self.transDuration, self.initScale);

        function onTouchDown(event) {
            this.stopAllActions();
            if (audioMng) {
                audioMng.playButton();
            }
            this.runAction(self.scaleDownAction);
        }
        function onTouchUp(event) {
            this.stopAllActions();
            this.runAction(self.scaleUpAction);
        }
        //注册监听事件
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },