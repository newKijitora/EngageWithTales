// ------------------------------------------------------------------
// キー操作系ビューのコンテキスト基底クラス
// ------------------------------------------------------------------

class KeyManageContext extends Context {

  // コンストラクタ
  constructor(town) { super();
    // 設定
    this.settings = town.settings;

    // 一コマのサイズ
    this.squareSize = town.settings.squareSize;

    // キー
    this.leftKey = new Key(this.settings.keyCodes['left'], 'left', 'keyup');
    this.rightKey = new Key(this.settings.keyCodes['right'], 'right', 'keyup');
    this.bottomKey = new Key(this.settings.keyCodes['bottom'], 'bottom', 'keyup');
    this.topKey = new Key(this.settings.keyCodes['top'], 'top', 'keyup');
    this.openKey = new Key(this.settings.keyCodes['open'], 'open', 'keyup');
    this.closeKey = new Key(this.settings.keyCodes['close'], 'close', 'keyup');

    // 進行方向コレクションの初期化
    this.destinations = {
      'top': new Destination(-1, 0),
      'left': new Destination(0, -1),
      'right': new Destination(0, 1),
      'bottom': new Destination(1, 0)
    };
  }

  // 進行方向を取得する
  getDestination(destination) {
    // 方向オブジェクトに値を設定して返す
    switch (destination) {
      case 'top':
        return this.destinations[destination];
      case 'left':
        return this.destinations[destination];
      case 'right':
        return this.destinations[destination];
      case 'bottom':
        return this.destinations[destination];
      default:
        return null;
    }
  }
  
  // キーコードからキーを取得する
  getKey(keyCode, keyAll) {
    // キーコードの振り分け（移動キー以外はカット）
    switch (keyCode) {
      case this.settings.keyCodes['left']:
        return this.leftKey;
      case this.settings.keyCodes['right']:
        return this.rightKey;
      case this.settings.keyCodes['top']:
        return this.topKey;
      case this.settings.keyCodes['bottom']:
        return this.bottomKey;
      case this.settings.keyCodes['open']:
        return !keyAll ? null : this.settings.openKey;
      case this.settings.keyCodes['close']:
        return !keyAll ? null : this.settings.closeKey;
      default:
        return null;
    }
  }
}