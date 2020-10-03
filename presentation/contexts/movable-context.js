// ------------------------------------------------------------------
// 移動系ビューのコンテキスト基底クラス
// （KeyManageContextを継承すると動作がすこし鈍くなるので単独実装）
// ------------------------------------------------------------------

class MovableContext extends Context {

  // コンストラクタ
  constructor(town) { super();
    // 設定
    this.settings = town.settings;

    // 一コマのサイズ
    this.squareSize = town.settings.squareSize;
    
    // 1フレームの移動距離
    this.distance = town.settings.distance;

    // 衝突マップ
    this.collisionMap = town.collisionMap;

    // キーの制御
    this.currentKey = null;
    this.nextKey = null;
    this.continue = true;

    // 進行方向（既定は前進）
    this.destinationCoefficient1 = -1;
    this.destinationCoefficient2 = 1;

    // キー
    this.leftKey = new Key(this.settings.keyCodes["left"], "left", "keyup");
    this.rightKey = new Key(this.settings.keyCodes["right"], "right", "keyup");
    this.bottomKey = new Key(this.settings.keyCodes["bottom"], "bottom", "keyup");
    this.topKey = new Key(this.settings.keyCodes["top"], "top", "keyup");

    // 進行方向コレクションの初期化
    this.destinations = {
      "top": new Destination(0, 0),
      "left": new Destination(0, 0),
      "right": new Destination(0, 0),
      "bottom": new Destination(0, 0)
    };
  }

  // 進行方向の設定
  setDestinationStyle(destination) {
    if (destination == "forward") {
      this.destinationCoefficient1 = -1;
      this.destinationCoefficient2 = 1;
    } else if (destination == "backward") {
      this.destinationCoefficient1 = 1;
      this.destinationCoefficient2 = -1;
    } else {
      this.destinationCoefficient1 = -1; // 不正な文字列は前進とみなす
      this.destinationCoefficient2 = 1; // 不正な文字列は前進とみなす
    }
  }

  // 進行方向を取得する
  getDestination(destination) {
    // 方向オブジェクトに値を設定して返す
    switch (destination) {
      case "top":
        const destTop = this.destinations[destination];
        destTop.top = this.squareSize.y * this.destinationCoefficient1;
        destTop.left = 0;
        return destTop;
      case "left":
        const destLeft = this.destinations[destination];
        destLeft.top = 0;
        destLeft.left = this.squareSize.x * this.destinationCoefficient1;
        return destLeft;
      case "right":
        const destRight = this.destinations[destination];
        destRight.top = 0;
        destRight.left = this.squareSize.x * this.destinationCoefficient2;
        return destRight;
      case "bottom":
        const destBottom = this.destinations[destination];
        destBottom.top = this.squareSize.y * this.destinationCoefficient2;
        destBottom.left = 0;
        return destBottom;
      default:
        return null;
    }
  }
  
  // キーコードからキーを取得する
  getKey(keyCode) {
    // キーコードの振り分け（移動キー以外はカット）
    switch (keyCode) {
      case this.settings.keyCodes["left"]:
        return this.leftKey;
      case this.settings.keyCodes["right"]:
        return this.rightKey;
      case this.settings.keyCodes["top"]:
        return this.topKey;
      case this.settings.keyCodes["bottom"]:
        return this.bottomKey;
      default:
        return null;
    }
  }
}