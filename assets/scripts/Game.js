cc.Class({
    extends: cc.Component,

    properties: {
        //玩家数组
        playerAnchors:{
            default: [],
            type: cc.Node
        },
        playerPrefab: cc.Prefab,
        dealer: cc.Node,
        inGameUI: cc.Node,//控制UI的付托节点
        betUI: cc.Node,
        assetMng: cc.Node,//资源管理器托付节点
        audioMng: cc.Node,
        turnDuration: 0,
        betDuration: 0,//下注总时间
        totalChipsNum: 0,
        totalDiamondNum: 0,
        numberOfDecks: {
            default: 1,
            type: 'Integer'
        }

    },
    statics: {
        instance: null
    },

    // use this for initialization
    onLoad: function () {
        // Game.instance = this;
        this.inGameUI = this.inGameUI.getComponent('InGameUI');
        // this.assetMng = this.assetMng.getComponent('AssetMng');
        // this.audioMng = this.audioMng.getComponent('AudioMng');

        this.inGameUI.init(this.betDuration);
        this.inGameUI.startCountDown();

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
