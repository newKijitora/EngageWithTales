// マップのコントローラークラス
class MapAreaContext extends MovableContext {
  // コンストラクタ
  constructor(town, zIndexBase) { super(town);
    // 町のオブジェクト
    this.town = town;

    // マップ
    this.map = this.town.map;
    this.mapSize = this.town.mapSize;
    this.mainTextureIndex = this.town.mainTextureIndex;

    // マップの左上位置情報と中央位置情報
    this.upperLeftPosition = this.town.mapPosition;
    this.centerPosition = this.town.mapCenterPosition;
    
    // マップの行数と列数
    this.mapRows = this.mapSize.y / this.squareSize.y;
    this.mapColumns = this.mapSize.x / this.squareSize.x;
    
    // アクティブマップとスタンバイマップのインデックス
    this.activeMapIndex = 0;
    this.stanbyMapIndex = 1;

    // テクスチャーの配列
    this.textures = town.resource.textures;

    // 排他的な進行状態
    this.isProgress = false;
    this.zIndexBase = zIndexBase;
    
    // 進行方向の設定
    this.setDestinationStyle("backward");

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
