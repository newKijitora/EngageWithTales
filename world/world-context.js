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
      new Character(1, "みーみる", 3, 3, 3, 10, 12),
      new Character(2, "とらまな", 7, 7, 1, 23, 0),
      new Character(3, "けしゃ", 2, 4, 3, 12, 20),
    ];

    this.memberCharacters[0].items = [
      new GameItem("とねりこのぼう"),
      new GameItem("あおのハーブ"),
      new GameItem("みどりのハーブ"),
      new GameItem("なげまたたび"),
      new GameItem("かわよろい"),
      new GameItem("いなずまのしるし"),
      new GameItem("なつめぐのみ")
    ];

    this.memberCharacters[0].magics = [
      new Magic("プル"),
      new Magic("プルプル"),
      new Magic("プルプリン"),
      new Magic("ラクーナ"),
      new Magic("フレバス"),
    ];

    this.memberCharacters[1].items = [
      new GameItem("あかのハーブ"),
      new GameItem("あかのハーブ"),
      new GameItem("まよけのみ"),
      new GameItem("じゃあくのめ"),
      new GameItem("きとうしのかざり"),
      new GameItem("せいじょのローブ"),
      new GameItem("ほしのみみかざり"),
      new GameItem("ひるとよるのつえ"),
      new GameItem("つちのしるし"),
    ];

    this.memberCharacters[2].items = [
      new GameItem("あおのハーブ"),
      new GameItem("どうのけん"),
      new GameItem("まじないのかけら"),
      new GameItem("おもいでのしずく"),
      new GameItem("おれたつるぎ"),
      new GameItem("くちはてたよろい"),
      new GameItem("さびたかぶと"),
      new GameItem("ひびわれたたて"),
      new GameItem("ぐんしんのたて"),
      new GameItem("せんしのこころ"),
    ];

    this.memberCharacters[3].items = [
      new GameItem("くさりかたびら"),
      new GameItem("めがみのほほえみ"),
      new GameItem("ぐんしんのおの"),
      new GameItem("ぐんしんのよろい"),
      new GameItem("ぐんしんのたて"),
      new GameItem("ぐんしんのかぶと"),
      new GameItem("はやがけのあし"),
      new GameItem("ひかりのしるし"),
      new GameItem("くらやみのしるし"),
      new GameItem("ときのしるし"),
      new GameItem("がくしのビオロン"),
      new GameItem("きのカギ"),
    ];

    this.memberCharacters[3].magics = [
      new Magic("ドロ"),
      new Magic("オテロ"),
      new Magic("オテルナ"),
      new Magic("ナルニス"),
      new Magic("アイスラ"),
      new Magic("アレス"),
    ];

    this.towns = null;
    this.currentTown = null;

    // 町の情報を読み込み
    this.requestInformation(this, "rokarito");
  }

  // JSONから町の情報を取得する
  requestInformation(world, townName) {
    const request = new XMLHttpRequest();
    request.responseType = "json";

    request.onload = () => {
      // JSONにあるすべての町の情報を保存
      this.towns = request.response;

      // 最初の町の情報を取得
      this.townInformation = this.towns[townName];

      // 町の生成
      this.currentTown = new TownContext(this);
      this.currentTown.requestInformation(this);

      // ビューの生成
      this.entry(this);
    };

    request.open("GET", world.townJsonUrl);
    request.send();
  }
}
