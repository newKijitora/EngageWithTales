// イベントクラス
class GameEvent {
  // コンストラクタ
  constructor(target, eventIndex) {
    this.target = target;
    this.eventIndex = eventIndex;
    this.script = GameEvent.scripts[eventIndex];
    this.isProgress = false;

    // 一度きりのイベントかどうか
    this.isOnce = true;
    this.isDone = false;
  }

  action() {
    this.script(this.target, this);
  }

  // イベント台本
  static scripts = {
    // マップを暗闇にする
    "nextField": (target) => {
      if (target.style.display != "none") {
        target.style.display = "none";
      } else {
        target.style.display = "block";
      }
    },
    // 地震を起こす
    "earthQuake": (target, event) => {
      if (event.isProgress || (event.isOnce && event.isDone)) {
        return;
      }

      event.isProgress = true;

      const originalTargetStyleLeft = target.style.left;
      const quakeWidth = 2;
      const quakeLimit = 16;
      
      let quakeTurn = quakeWidth;
      let quakeCount = 0;
      let baseTime = null;

      const quake = (now) => {
        if (!baseTime) {
          baseTime = now;
        }

        if (now - baseTime > 100) {
          if (quakeTurn == quakeWidth) {
            quakeTurn = quakeWidth * -1;
          } else {
            quakeTurn = quakeWidth;
          }

          target.style.left = (parseInt(originalTargetStyleLeft) + quakeTurn) + "px";
          
          baseTime = now;
          quakeCount++;
        }

        if (quakeCount < quakeLimit) {
          window.requestAnimationFrame(quake);
        } else {
          target.style.left = originalTargetStyleLeft;
          event.isProgress = false;
          event.isDone = true;
        }
      }
      window.requestAnimationFrame(quake);
    },
  };
}