// 設定を保持するミックスイン
class Settings {
  
  // コンストラクタ
  constructor() {
    // テキストの速度と１フレームの移動距離
    this.textSpeed = 16;

    // 1フレームの移動距離
    this.distance = 2;

    // 一コマのサイズ
    this.squareWidth = 32;
    this.squareHeight = 32;
    this.squareSize = new Size(this.squareWidth, this.squareHeight);

    // マップサイズ
    this.mapWidth = 27;
    this.mapHeight = 21;

    // キーコード
    this.keyCodes = {
      "left": 65,
      "right": 68,
      "bottom": 83,
      "top": 87,
      "open": 74,
      "close": 75
    };
  }
}