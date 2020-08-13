// ワールドのコントローラークラス
class WorldContext extends Context {

  // コンストラクタ
  constructor() { super();
    // リソース
    this.resource = new Resources();

    // ゲームの設定
    this.settings = new Settings();

    // キーコード
    this.leftKeyCode = this.settings.keyCodes["left"];
    this.rightKeyCode = this.settings.keyCodes["right"];
    this.bottomKeyCode = this.settings.keyCodes["bottom"];
    this.topKeyCode = this.settings.keyCodes["top"];
    this.openKeyCode = this.settings.keyCodes["open"];
    this.closeKeyCode = this.settings.keyCodes["close"];

    // ゲームのビュー（モニター）のサイズとウィンドウ上の位置
    this.worldViewSize = new Size(this.settings.squareSize.x * 25, this.settings.squareSize.y * 19);
    this.worldViewPosition = new Position(5, 2);

    // 町のJSONファイルURL
    this.townJsonUrl = "town/town.json";

    // 現在の町
    this.currentTown = null;

    // 主人公のパーティー
    this.memberCharacters = [
      new Character(0, "ろかりと", 5, 5, 2, 15, 5),
      new Character(1, "エリス", 3, 3, 3, 10, 12),
      new Character(2, "とらまな", 7, 7, 1, 23, 0),
      new Character(3, "けしゃ", 2, 4, 3, 12, 20),
    ];

    this.memberCharacters[0].items = [
      new GameItem("やくそう"),
      new GameItem("どくけしそう"),
      new GameItem("またたび"),
      new GameItem("かわのよろい"),
      new GameItem("いかずちのつるぎ"),
      new GameItem("せいすい")
    ];

    this.memberCharacters[0].magics = [
      new Magic("ホイミ"),
      new Magic("ベホイミ"),
      new Magic("トヘロス"),
      new Magic("ルーラ"),
      new Magic("パルプンテ"),
    ];

    this.memberCharacters[1].items = [
      new GameItem("やくそう"),
      new GameItem("どくけしそう"),
      new GameItem("はやぶさのけん"),
    ];

    this.memberCharacters[2].items = [
      new GameItem("やくそう"),
      new GameItem("どうのつるぎ"),
      new GameItem("せいすい")
    ];

    this.memberCharacters[3].items = [
      new GameItem("よろい"),
      new GameItem("みかがみのたて"),
      new GameItem("せいすい")
    ];

    this.memberCharacters[3].magics = [
      new Magic("メラ"),
      new Magic("ギラ"),
      new Magic("ベギラマ"),
      new Magic("ヒャド"),
      new Magic("ベギラゴン"),
    ];

    // ビューの生成
    this.entry(this);
  }

  // ゲーム世界のオープン
  open() {
    this.currentTown = new Town(this, "rokarito");
  }
}
