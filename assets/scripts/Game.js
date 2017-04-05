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
        this.assetMng = this.assetMng.getComponent('AssetMng');
        this.audioMng = this.audioMng.getComponent('AudioMng');
        this.betUI = this.betUI.getComponent('Bet');

        //开始倒计时
        this.inGameUI.init(this.betDuration);
        this.inGameUI.startCountDown();

        //初始化下注筹码按钮
        this.betUI.init();

        //创建玩家
        this.player = null;
        this.createPlayers();

        //获取GameUI上的节点
        this.info = this.inGameUI.resultTxt;//游戏结果展示的文字
        this.totalChipsNum = this.inGameUI.labelTotalChips;//用户拥有的总的钱币数量



    },
    //下注
    addStake: function (delta) {
        if (this.totalChipsNum < delta){
            console.log('not enough chips!');
            this.info.enabled = true;//????这里不太明白
            this.info.string = "金币不足";
            return false;
        } else {
            this.totalChipsNum -= delta;
            this.updateTotalChips();
        }
    },

    updateTotalChips: function () {
        this.totalChips.string = this.totalChipsNum;
        // this.player.renderer.up

    },

    createPlayers: function () {
        for (var i = 0; i < 5; ++i){
            var playerNode = cc.instantiate(this.playerPrefab);//通过预制资源获取玩家对象
            var anchor = this.playerAnchors[i];//获取玩家UI图层
            var switchSide = (i>2);
            anchor.addChild(playerNode);//将玩家对象放到玩家图层上
            playerNode.position = cc.p(0,0);//设置玩家对象在图层上的位置

            var playerInfoPos = cc.find('anchorPlayerInfo',anchor).getPosition();//从anchor图层上获取anchorPalyerInfo图层
            var stakePos = cc.find('anchorStake',anchor).getPosition();//从anchor图层上获取anchorStake图层
            var actorRenderer = playerNode.getComponent("ActorRenderer");
            actorRenderer.init(players[i],playerInfoPos,stakePos, this.turnDuration, switchSide);
            if (i === 2){
                this.player = playerNode.getComponent('Player');
                this.player.init();
            }

        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
