// ピープルのコントローラークラス
class PeopleController extends Controller {
  // コンストラクタ
  constructor(context, town, peopleName, position, canMove, isAuto, moveTimeSpan, isActive, action, zIndexBase) { super();
    // コンテキスト
    this.town = town;

    // 1マスのサイズ
    this.squareSize = this.town.world.squareSize;

    // キー
    this.leftKey = new Key(this.town.world.leftKeyCode, "keyup");
    this.rightKey = new Key(this.town.world.rightKeyCode, "keyup");
    this.bottomKey = new Key(this.town.world.bottomKeyCode, "keyup");
    this.topKey = new Key(this.town.world.topKeyCode, "keyup");
    
    // 方向ごとの進み具合
    this.destinations = {
      "top": new Destination(this.squareSize.y * -1, 0),
      "left": new Destination(0, this.squareSize.x * -1),
      "right": new Destination(0, this.squareSize.x),
      "bottom": new Destination(this.squareSize.y, 0),
    };
    
    // 1フレームの移動距離
    this.distance = this.town.world.distance;

    // キャラクターの種類
    this.peopleName = peopleName;
    this.basePosition = position;
    this.isProgress = false;
    
    // キーの制御
    this.currentKey = null;
    this.nextKey = null;
    this.continue = true;
    
    // 現在のキャラクター位置
    this.currentPosition = new Position(this.basePosition.x, this.basePosition.y);

    // 衝突マップ
    this.collisionMap = this.town.collisionMap;
    this.mapUpperLeftPosition = this.town.mapPosition;

    // 動くキャラクターかどうか
    this._canMove = canMove;
    this.isAuto = isAuto;
    this.moveTimeSpan = moveTimeSpan;
    this.isActive = isActive;
    this.action = action;

    this.zIndexBase = zIndexBase;
    
    // エントリー
    this.entry(this);
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
    if (this.isProgress) {
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
