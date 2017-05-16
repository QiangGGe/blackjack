var players = require('PlayerDatas').players;//玩家信息类
var Decks = require('Decks');//扑克牌管理类
var Types = require('Types');//牌的花色控制，以及牌型控制
var ActorPlayingState = Types.ActorPlayingState;//游戏进行的状态
var Fsm = require('game-fsm');

var Game = cc.Class({
    extends: cc.Component,

    properties: {
        //玩家数组
        playerAnchors:{
            default: [],
            type: cc.Node
        },
        playerPrefab: cc.Prefab,//玩家UI的预制资源
        dealer: cc.Node,//爆牌UI
        inGameUI: cc.Node,//控制UI的付托节点
        betUI: cc.Node,//下赌注的UI
        assetMng: cc.Node,//资源管理器托付节点
        audioMng: cc.Node,//音效资源托付节点
        turnDuration: 0,
        betDuration: 0,//下注总时间
        totalChipsNum: 0,//总共的赌资
        totalDiamondNum: 0,//总共的宝石数量
        numberOfDecks: {//控制一共有几副牌
            default: 1,
            type: 'Integer'
        }
    },
    statics: {
        instance: null
    },

    // use this for initialization
    onLoad: function () {
        Game.instance = this;
        //获取节点上绑定的脚本
        this.inGameUI = this.inGameUI.getComponent('InGameUI');
        this.assetMng = this.assetMng.getComponent('AssetMng');
        this.audioMng = this.audioMng.getComponent('AudioMng');
        this.betUI = this.betUI.getComponent('Bet');

        //开始倒计时
        this.inGameUI.init(this.betDuration);
        this.inGameUI.startCountDown();

        //初始化下注筹码按钮
        this.betUI.init();

        //初始化爆牌的UI
        this.dealer = this.dealer.getComponent('Dealer');
        this.dealer.init();

        //创建玩家
        this.player = null;
        this.createPlayers();

        //获取GameUI上的节点
        this.info = this.inGameUI.resultTxt;//游戏结果展示的文字
        this.totalChips = this.inGameUI.labelTotalChips;//用户拥有的总的钱币数量的label

        //创建一副扑克牌
        this.decks = new Decks(this.numberOfDecks);
        this.fsm = Fsm;
        this.fsm.init(this);

        this.updateTotalChips();

        this.audioMng.playMusic();
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
            this.player.addStake(delta);//更新玩家下注钱币数，这个是更新头像黄色金币旁的钱数的
            this.audioMng.playChips();//播放扔钱币的音效
            this.info.enabled = false;//enabled 表示该组件自身是否启用。
            this.info.string = "请下注";
            return true;//这个决定了Bet里的回调函数是否启用

        }
    },

    updateTotalChips: function () {
        this.totalChips.string = this.totalChipsNum;//总的钱币数
        this.player.renderer.updateTotalStake(this.totalChipsNum);//更新玩家剩余钱币数，每个玩家头像旁边的钱币数

    },

    createPlayers: function () {
        for (var i = 0; i < 5; ++i){
            var playerNode = cc.instantiate(this.playerPrefab);//通过预制资源获取玩家对象
            var anchor = this.playerAnchors[i];//获取每个玩家的锚图层
            anchor.addChild(playerNode);//将玩家对象放到玩家图层上
            playerNode.position = cc.p(0,0);//设置玩家对象在图层上的位置

            var switchSide = (i>2);//从第四个玩家起要调整玩家的筹码托盘的位置

            //玩家头像的位置
            var playerInfoPos = cc.find('anchorPlayerInfo',anchor).getPosition();//从anchor图层上获取anchorPalyerInfo图层位置
            //筹码的位置
            var stakePos = cc.find('anchorStake',anchor).getPosition();//从anchor图层上获取anchorStake图层位置
            //获取玩家节点上绑定的脚本
            var actorRenderer = playerNode.getComponent("ActorRenderer");//玩家UI渲染
            actorRenderer.init(players[i],playerInfoPos,stakePos, this.turnDuration, switchSide);

            //将第三位玩家作为自己
            if (i === 2){
                this.player = playerNode.getComponent('Player');//获取Player组件
                this.player.init();
            }

        }
    },

    //结算
    onEndState: function (enter) {
      if (enter){
          this.dealer.revealHoldCard();//显示手中的牌
          this.inGameUI.showResultState();//显示游戏结束时的UI

          var  outcome = this._getPlayerResult(this.player, this.dealer);//比牌结果
          switch (outcome){
              case Types.Outcome.Win:
                  this.info.string = "你赢了！";
                  this.audioMng.pauseMusic();//暂停背景音乐的播放
                  this.audioMng.playWin();//播放赢的音效
                  //拿回自己原先的筹码
                  this.totalChipsNum += this.player.stakeNum;
                  //奖励自己的筹码
                  var winChipsNum = this.player.stakeNum;
                  //奖励的筹码根据手中的牌型进行加倍处理
                  if (!this.player.state === Types.ActorPlayingState.Report){
                      if (this.player.hand === Types.Hand.BlackJack){//如果是21点 那么奖励翻1.5倍
                          winChipsNum *= 1.5;
                      } else {//如果是五小龙 那么翻2倍
                          winChipsNum *= 2.0;
                      }
                  }
                  this.totalChipsNum += winChipsNum;
                  this.updateTotalChips();
                  break;
              case Types.Outcome.Lose:
                   this.info.string = "你输啦！";
                   this.audioMng.pauseMusic();
                   this.audioMng.playLose();//播放输的音效
                  break;
              case Types.Outcome.Tie:
                  this.info.string = "平局";
                  //退还筹码
                  this.totalChipsNum += this.player.stakeNum;
                  this.updateTotalChips();
                  break;

          }
      }
      this.info.enabled = enter;
    },

    //下注
    onBetState: function (enter) {
        if (enter){
            this.decks.reset();//重置扑克牌
            this.player.reset();//重置玩家
            this.dealer.reset();
            this.info.string = '请下注';
            this.inGameUI.showBetState();//显示下注界面

            this.inGameUI.startCountDown();//开始倒计时

            this.audioMng.resumeMusic();//重新播放背景音乐
        }
        this.info.enabled = enter;
    },

    //判断玩家输赢
    _getPlayerResult: function (player, dealer) {
        var OutCome = Types.Outcome;//输赢平 的枚举
        //如果是玩家爆牌了 那么输了
        if (player.state === ActorPlayingState.Bust){
            return OutCome.Lose;
        }
        else  if (dealer.state === ActorPlayingState.Bust){//如果是庄家爆牌了 那么玩家赢了
            return OutCome.Win;
        }
        else {
            //比
            if (player.state === ActorPlayingState.Report){
                return OutCome.Win;
            }
            else {
                //比牌型
                if (player.hand > dealer.hand){
                    return OutCome.Win;
                }
                else  if (player.hand < dealer.hand){
                    return OutCome.Lose;
                }
                else {
                    //都没有爆牌也不是牌型 那么就比手里的点数大小
                    if (player.bestPoint === dealer.bestPoint){
                        return OutCome.Tie;
                    }
                    else if (player.bestPoint < dealer.bestPoint){
                        return OutCome.Lose;
                    }
                     else {
                        return OutCome.Win;
                    }
                }
            }
        }

    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
