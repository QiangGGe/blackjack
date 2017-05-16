"use strict";
cc._RFpush(module, '883a9oS9hJLI5HCUeaERJtf', 'TossChip');
// scripts/TossChip.js

'use strict';

/**
 * Created by BDGame_qiang on 17/3/29.
 */
cc.Class({
  extends: cc.Component,
  properties: {
    anim: cc.Animation
  },
  //播放投掷动画
  play: function play() {
    this.anim.play('chipToss');
  }
});

cc._RFpop();