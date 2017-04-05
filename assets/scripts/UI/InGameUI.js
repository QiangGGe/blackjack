var Game = require('Game');

cc.Class({
    extends: cc.Component,

    properties: {
        panelChat: cc.Node,//聊天界面
        panelSocial: cc.Node,//社交界面
        betStateUI: cc.Node,//下注界面
        gameStateUI: cc.Node,//游戏界面
        resultTxt: cc.Label,//结果文字提示
        betCounter: cc.ProgressBar,//游戏倒计时
        btnStart: cc.Node,//开始游戏按钮
        labelTotalChips: cc.Label//用户拥有的总的金币数label
    },

    // use this for initialization
    onLoad: function () {

    },
    init: function (betDuration) {
        this.panelChat.active = false;//隐藏聊天界面
        this.panelSocial.action = false;//隐藏社交界面
        this.resultTxt.enabled = false;//表示该节点是否启用

        this.betStateUI.active = true;//显示下注界面
        this.gameStateUI.active = false;//隐藏游戏界面

        this.btnStart.active = false;//隐藏开始按钮
        this.betDuration = betDuration;//赋值下注时间
        this.betTimer = 0;//设置下注已过去时间
        this.isBetCounting = false;//是否正在计时


    },
    //开始计时器
    startCountDown: function () {
        if (this.betCounter){
            this.betTimer = 0;
            this.isBetCounting = true;
        }
    },
    //恢复计时器
    resetCountdown: function () {
        if (this.betCounter){
            this.betTimer = 0;
            this.isBetCounting = false;
            this.betCounter.progress = 0;
        }
    },

    //显示下注界面
    showBetState: function () {
        this.betStateUI.active = true;
        this.gameStateUI.active = false;
        this.btnStart.active = false;
    },

    //显示游戏界面
    showGameState: function () {
        this.betStateUI.active = false;
        this.gameStateUI.active = true;
        this.btnStart.active = true;
    },
    //
    showResultState: function () {
        this.betStateUI.active = false;
        this.gameStateUI.active = false;
        this.btnStart.active = true;
    },
    //切换聊天界面
    toggleChat: function () {
        this.panelChat.active = !this.panelChat.active;
    },
    //切换社交界面
    toggleSocail: function () {
        this.panelSocial.active = !this.panelSocial.active;
    },

    update: function (dt) {
        //更新投注进度
            if (this.isBetCounting){
                this.betCounter.progress = this.betTimer/this.betDuration;
                this.betTimer += dt;
                console.log("this.betTimer-->"+this.betTimer+"this.betDuration-->"+this.betDuration);

                if (this.betTimer >= this.betDuration){
                    this.isBetCounting = false;
                    this.betCounter.progress = 1;
                }
            }
    },
});
