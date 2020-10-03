// 設定を保持するミックスイン
class Settings {
  
  // コンストラクタ
  constructor(settings) {
    // テキストの速度と１フレームの移動距離
    if (settings.textSpeed) {
      this.textSpeed = settings.textSpeed;
    } else {
      this.textSpeed = 16; // デフォルト
    }
    
    // 一コマのサイズ
    if (settings.squareSize) {
      this.squareSize = settings.squareSize;
    } else {
      this.squareSize = new Size(32, 32); // デフォルト
    }
    
    // 文字サイズ
    this.textSize = new Size(this.squareSize.x / 2, this.squareSize.y);

    // 1フレームの移動距離
    if (settings.distance) {
      this.distance = settings.distance;
    } else {
      this.distance = 2; // デフォルト
    }

    // マップサイズ
    this.mapWidth = 27;
    this.mapHeight = 21;

    // ゲームのビュー（モニター）のサイズとウィンドウ上の位置
    this.worldViewSize = new Size(this.squareSize.x * 25, this.squareSize.y * 19);
    this.worldViewPosition = new Position(5, 2);

    // コマンド関連の背景色
    this.commandBoxBackgroundColor = '#020202';

    // キーコード
    this.keyCodes = settings.keyCodes;

    // キーコード
    this.leftKeyCode = this.keyCodes['left'];
    this.rightKeyCode = this.keyCodes['right'];
    this.bottomKeyCode = this.keyCodes['bottom'];
    this.topKeyCode = this.keyCodes['top'];
    this.openKeyCode = this.keyCodes['open'];
    this.closeKeyCode = this.keyCodes['close'];
  }
}