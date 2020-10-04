// ピープルのコントローラークラス
class PeopleContext extends MovableContext {
  // コンストラクタ
  constructor(town, peopleName, position, canMove, isAuto, moveTimeSpan, isActive, action, zIndexBase, text) { super(town);
    // 町と設定
    this.town = town;
    this.settings = town.settings;
    
    // 進行方向の設定
    this.setDestinationStyle("forward");

    // キャラクターの種類
    this.peopleName = peopleName;
    this.basePosition = position;
    this.isProgress = false;
    
    this.textSet = text;
    this.readIndex = 0;

    // 現在のキャラクター位置
    this.currentPosition = new Position(this.basePosition.x, this.basePosition.y);
    this.mapUpperLeftPosition = this.town.mapPosition;

    // 動くキャラクターかどうか
    this._canMove = canMove;
    this.isAuto = isAuto;
    this.moveTimeSpan = moveTimeSpan;
    this.isActive = isActive;
    this.action = action;

    this.zIndexBase = zIndexBase;
  }

  // キーコードの乱数
  get randomKey() {
    switch (Math.floor(Math.random() * 4)) {
      case 0:
        return this.leftKey;
      case 1:
        return this.rightKey;
      case 2:
        return this.bottomKey;
      case 3:
        return this.topKey;
    }
  }

  // 動作が可能かどうか
  get canMove() {
    if (this.isProgress ) {
      return false;
    }

    // コンテキストのチェック
    return this.checkContextForMove();
  }

  // 動作が可能かどうか：コンテキストのチェック
  checkContextForMove() {
    // コマンドボックスが表示中であれば動作は不可
    if (this.town.commandBoxController.viewState == "opened") {
      return false;
    }

    return this._canMove;
  }

  static actions = {
    "talk": () => {
      console.log("はなしはじめる");
    },
  }
}
