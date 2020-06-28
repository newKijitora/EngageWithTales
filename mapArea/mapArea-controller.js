// マップのコントローラークラス
class MapAreaController extends Controller {
  // コンストラクタ
  constructor(context, town, zIndexBase) { super();
    // コンテキスト
    this.context = context;
    this.town = town;

    // 1マスのサイズ
    this.squareSize = this.context.squareSize;

    // 現在のマップの配列
    this.currentMap = this.town.map;
    this.mapSize = this.town.mapSize;
    this.mainBackgroundTextureIndex = this.town.mainBackgroundTextureIndex;
    this.upperLeftPosition = this.town.mapPosition;
    this.centerPosition = this.town.mapCenterPosition;
    
    // マップの行数と列数
    this.numberOfMapRows = this.mapSize.y / this.squareSize.y;
    this.numberOfMapColumns = this.mapSize.x / this.squareSize.y;
    
    // アクティブマップとスタンバイマップのインデックス
    this.activeMapIndex = 0;
    this.stanbyMapIndex = 1;

    // テクスチャーの配列
    this.textures = this.context.resource.textures;

    // キーコード
    this.leftKey = new Key(this.context.leftKeyCode, "keyup");
    this.rightKey = new Key(this.context.rightKeyCode, "keyup");
    this.bottomKey = new Key(this.context.bottomKeyCode, "keyup");
    this.topKey = new Key(this.context.topKeyCode, "keyup");
    
    this.currentKey = null;
    this.nextKey = null;
    this.continue = true;
    
    // 1フレームの移動距離
    this.distance = this.context.distance;

    // ビュー上の移動距離
    this.destinations = {
      "top": new Destination(this.squareSize.y, 0),
      "left": new Destination(0, this.squareSize.x),
      "right": new Destination(0, this.squareSize.x * -1),
      "bottom": new Destination(this.squareSize.y * -1, 0),
    };
    
    // 排他的な進行状態
    this.isProgress = false;
    
    // 衝突マップ
    this.collisionMap = this.town.collisionMap;

    this.zIndexBase = zIndexBase;
    
    // エントリー
    this.entry(this);
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
    return true;
  }
}
