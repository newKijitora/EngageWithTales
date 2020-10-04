// ------------------------------------------------------------------
// メインメソッド
// ------------------------------------------------------------------

// ゲームオブジェクトの初期化
const world = new WorldContext({
  title: 'EngageWithTales -Eroded Muse-',
  version: '0.0.0.0',
  url: 'resources/town.json',
  settings: {
    textSpeed: 16,
    squareSize: new Size(32, 32),
    distance: 2,
    keyCodes: {
      'left': 65,
      'right': 68,
      'bottom': 83,
      'top': 87,
      'open': 74,
      'close': 75
    }
  }
});

// ゲームの開始
world.run();
