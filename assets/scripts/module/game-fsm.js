
var State = require('state.com');

var instance;
var model;
var playing;

function on (message){
    return function (msgToEvaluate) {
        return msgToEvaluate === message;
    };
}

var evaluating = false;

exports = {
    init: function (target) {
        State.console = console;

        model = new State.StateMachine("root");
        var initial = new State.PseudoState("init-root", model, State.PseudoStateKind.Initial);

        //当前这一把的状态
        var bet = new State.State("下注", model);
        playing = new State.State("已开局", model);
        var  settled = new State.State("结算", model);

        initial.to(bet);
        bet.to(playing).when(on("deal"));
        playing.to(settled).when(on("end"));
        settled.to(bet).when(on("bet"));

        bet.entry(function () {
            target.onBetState(true);
        });
        bet.exit(function () {
            target.onBetState(false);
        });
        settled.entry(function () {
            target.onEndState(true);
        });
        settled.exit(function () {
            target.onEndState(false);
        });

        //开局后的子状态

        var initialP = new State.PseudoStateKind("init 已开局", playing, State.PseudoStateKind.Initial);
        var deal = new State.State("发牌", playing);
        var playersTurn = new State.State("玩家决策", playing);
        var dealersTurn = new State.State("庄家决策", playing);

        initialP.to(deal);
        deal.to(playersTurn).when(on("dealed"));
        playersTurn.to(dealersTurn).when(on("player acted"));

        deal.entry(function () {
            target.onEnterDealState();
        });
        playersTurn.entry(function () {
            target.onPlayerTurnState(false);
        });
        playersTurn.exit(function () {
            target.onPlayersTurnState(false);
        });
        dealersTurn.entry(function () {
            target.onEnterDealersTurnState();
        });

        //create a State machine instance
        instance = new State.StateMachineInstance("fsm");
        State.initialise(model, instance);

    },

    toDeal: function () {
        this._evaluate('deal');
    },

    toBet: function () {
        this._evaluate('bet');
    },

    onDealed: function () {
        this._evaluate('dealed');
    },
    onPlayerActed: function () {
        this._evaluate('player acted');
    },
    onDealerActed: function () {
        this._evaluate('end');
    },

    _evaluate: function (message) {
        if  (evaluating){
            setTimeout(function () {
                State.evaluate(model, instance, message);
            }, 1);
            return;
        }
        evaluating = true;
        State.evaluate(model, instance, message);
        evaluating = false;
    },

    _getInstance: function () {
        return instance;
    },

    _getModel: function () {
        return model;
    }
};

module.exports = exports;