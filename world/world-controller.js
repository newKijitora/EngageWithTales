// ワールドのコントローラークラス
class WorldController extends Controller {

  constructor(context) { super();
    // リソース
    this.context = context;
    this.resource = new Resources();

    // キーコード
    this.leftKeyCode = 65;
    this.rightKeyCode = 68;
    this.bottomKeyCode = 83;
    this.topKeyCode = 87;
    this.openKeyCode = 74;
    this.closeKeyCode = 75;

    // ビュー上のサイズ単位
    this.squareSize = new Size(32, 32);
    
    // ゲームのビュー（モニター）のサイズと位置
    this.worldViewSize = new Size(this.squareSize.x * 25, this.squareSize.y * 19);
    this.worldViewPosition = new Position(5, 2);

    // テキストの速度
    this.textSpeed = 16;
    this.distance = 2;

    // 色の設定
    this.textColor = "#fefefe"
    this.textAreaBackgroundColor = "#222222";

    // 町のJSONファイルURL
    this.townJsonUrl = "world/town.json";

    this.currentMap = null;
    this.currentTown = null;

    // 主人公のパーティー
    this.characters = [
      new Character(0, "ろかりと", 5, 5, 2, 15, 5),
      new Character(1, "エリス", 3, 3, 3, 10, 12),
      new Character(2, "アーサー", 7, 7, 1, 23, 0),
      new Character(3, "リンダ", 2, 4, 3, 12, 20),
    ];
    
    // ビューの生成
    this.entry(this);
  }

  // ゲーム世界のオープン
  open() {
    this.currentTown = new Town(this, "rokarito");
  }
}
