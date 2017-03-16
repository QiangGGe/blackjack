"use strict";
cc._RFpush(module, '79f9a47zblKKq1VDjUl7wTX', 'RankList');
// scripts/UI/RankList.js

var players = require('PlayerDatas').players;
cc.Class({
    'extends': cc.Component,

    properties: {
        scrollView: cc.ScrollView,
        prefabRankItem: cc.Prefab,
        rankCount: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.content = this.scrollView.content;
        this.populateList();
    },
    populateList: function populateList() {
        for (var i = 0; i < this.rankCount; ++i) {
            var playerInfo = players[i];
            var item = cc.instantiate(this.prefabRankItem);
            item.getComponent('RankItem').init(i, playerInfo);

            cc.log(this.content);

            this.content.addChild(item);
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();