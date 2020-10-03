class Map {
  // コンストラクタ
  constructor(mapField, context) {
    this.mapField = mapField;
    this.context = context;
  }
}

// マップエリアクラス
class MapAreaView extends MovableView {
  // コンストラクタ
  constructor(context) { super();
    // コンテキスト
    this.context = context;

    // マップ
    this.mapAreas = new Array(2);

    // 各レイヤー
    this.mapLayer = null;
    this.peopleLayer = null;
    this.peopleField = null;

    // テクスチャー画像のキャンバス要素
    this.textureCanvases = new Array(this.context.textures.length);

    // HTML要素の組成
    this.assemblingElements();
    
    // ゲームイベントの設定
    this.earthQuake = new GameEvent(this.mapLayer, "earthQuake");

    // スタンバイマップを非表示
    this.mapAreas[this.context.stanbyMapIndex].mapField.style.display = "none";
    this.drawnRows = 0;

    // イベントリスナー
    window.addEventListener("keydown", (event) => this.moveOn(event.keyCode), false);
    window.addEventListener("keyup", (event) => this.stop(event.keyCode), false);

    // 画像のロード：初回のマップ描画を含む
    const imageLoader = new ImageLoader();

    imageLoader.loadImages(this.context.textures, (images) => {
      for (let i = 0; i < this.textureCanvases.length; i++) {
        const textureCanvas = document.createElement("canvas");
        textureCanvas.width = this.context.squareSize.x;
        textureCanvas.height = this.context.squareSize.y;         

        const textureContext = textureCanvas.getContext("2d");
        imageLoader.setSmoothingEnabled(textureContext, false);

        textureContext.drawImage(images[i], 0, 0, images[i].width, images[i].height, 0, 0, this.context.squareSize.x, this.context.squareSize.y);
        this.textureCanvases[i] = textureCanvas;
      }

      this.drawMapRows(this.context.activeMapIndex, this.context.mapRows, false);
    });
  }

  // アクティブなマップシートを交代する
  swapMap() {
    this.drawnRows = 0;
    this.mapAreas[this.context.stanbyMapIndex].mapField.style.display = "block";
    this.mapAreas[this.context.activeMapIndex].mapField.style.display = "none";
    this.mapAreas[this.context.activeMapIndex].mapField.style.top = this.mapAreas[this.context.stanbyMapIndex].mapField.style.top;
    this.mapAreas[this.context.activeMapIndex].mapField.style.left = this.mapAreas[this.context.stanbyMapIndex].mapField.style.left;
    const workIndex = this.context.activeMapIndex;
    this.context.activeMapIndex = this.context.stanbyMapIndex;
    this.context.stanbyMapIndex = workIndex;
  }

  // HTML要素を組成
  assemblingElements() {
    const world = document.getElementById("world");
    const squareSize = this.context.squareSize;
    const mapSize = this.context.mapSize;

    // マップ用のレイヤー
    const mapLayer = document.createElement("div");
    mapLayer.classList.add("layer");
    mapLayer.style.zIndex = this.context.zIndexBase + 0;
    mapLayer.style.top = (squareSize.y * -1) + "px";
    mapLayer.style.left = (squareSize.x * -1) + "px";

    // キャラクター用のレイヤー
    const peopleLayer = document.createElement("div");
    peopleLayer.classList.add("layer");
    peopleLayer.style.zIndex = ++this.context.zIndexBase;

    // マップエリアを生成する
    for (let i = 0; i < this.mapAreas.length; i++) {
      const mapField = document.createElement("canvas");
      mapField.width = mapSize.x;
      mapField.height = mapSize.y;
      mapField.style.position = "absolute";
      mapField.style.top = "0px";
      mapField.style.left = "0px";

      mapLayer.appendChild(mapField);
      world.appendChild(mapLayer);

      this.mapAreas[i] = new Map(mapField, mapField.getContext("2d"));
    }

    // キャラクター配置用のフィールド
    const peopleField = document.createElement("div");
    peopleField.setAttribute("id", "people-Field");
    peopleField.style.width = mapSize.x + "px";
    peopleField.style.height = mapSize.y + "px";
    peopleField.style.position = "absolute";
    peopleField.style.top = (squareSize.y * -1) + "px";
    peopleField.style.left = (squareSize.x * -1) + "px";

    peopleLayer.appendChild(peopleField);
    world.appendChild(peopleLayer);

    this.peopleField = peopleField;
    
    // レイヤー
    this.mapLayer = mapLayer;
    this.peopleLayer = peopleLayer;
  }

  // マップの行を描画する
  drawMapRows(mapIndex, numberOfLines, stanby) {
    if (this.drawnRows > this.context.mapRows) {
      return;
    }

    const context = this.mapAreas[mapIndex].context;
    const mainTextureIndex = this.context.mainTextureIndex;
    
    if (this.drawnRows == 0) {
      const pattern = context.createPattern(this.textureCanvases[mainTextureIndex], "repeat");
      context.fillStyle = pattern;
      context.fillRect(0, 0, 972, 672);
    }

    const x = this.context.upperLeftPosition.x;
    const y = this.context.upperLeftPosition.y;

    let startRow = 0;
    let endRow = 0;

    if (stanby) {
      startRow = this.drawnRows;
      endRow = this.drawnRows + numberOfLines;
      this.drawnRows = endRow;
    } else {
      endRow = this.context.mapRows;
    }

    for (let i = startRow; i < endRow; i++) {
      for (let j = 0; j < this.context.mapColumns; j++) {
        const textureIndex = this.context.map[y + i][x + j];
        if (textureIndex == mainTextureIndex) {
          continue;
        }
        const mapChipSize = this.context.squareSize;

        context.clearRect(j * mapChipSize.x, i * mapChipSize.y, mapChipSize.x, mapChipSize.y);
        context.drawImage(this.textureCanvases[textureIndex], j * mapChipSize.x, i * mapChipSize.y);
      }
    }
  }

  // マップが動く => TODO：canvasに変更する
  move(destination) {
    // 起点位置
    const startPositionTop = parseInt(this.mapAreas[this.context.activeMapIndex].mapField.style.top);
    const startPositionLeft = parseInt(this.mapAreas[this.context.activeMapIndex].mapField.style.left);

    // 終点位置
    const endPositionTop = startPositionTop + destination.top;
    const endPositionLeft = startPositionLeft + destination.left;
    
    // 進行中の位置
    let presentPositionTop = startPositionTop;
    let presentPositionLeft = startPositionLeft;

    // キャラクターフィールド ==> 分割できる？
    let presentPositionTopForPeopleField = parseInt(this.peopleField.style.top);
    let presentPositionLeftForPeopleField = parseInt(this.peopleField.style.left);

    let baseTime = 0;
    let keyCode = 0;

    // 動作のフレーム
    const moveFrame = (now) => {
      // タイムスタンプの初期化
      if (!baseTime) {
        baseTime = now;
      }

      if (now - baseTime > 0) {
        // 動作方向が上下方向の場合
        if (destination.top > 0) {
          presentPositionTop += this.context.distance;
          presentPositionTopForPeopleField += this.context.distance;
        } else if (destination.top < 0) {
          presentPositionTop -= this.context.distance;
          presentPositionTopForPeopleField -= this.context.distance;
        }

        // 動作方向が左右方向の場合
        if (destination.left > 0) {
          presentPositionLeft += this.context.distance;
          presentPositionLeftForPeopleField += this.context.distance;
        } else if (destination.left < 0) {
          presentPositionLeft -= this.context.distance;
          presentPositionLeftForPeopleField -= this.context.distance;
        }

        // DOMの位置更新
        this.mapAreas[this.context.activeMapIndex].mapField.style.top = presentPositionTop + "px";
        this.mapAreas[this.context.activeMapIndex].mapField.style.left = presentPositionLeft + "px";

        // DOMの位置更新（キャラクターフィールド）
        this.peopleField.style.top = presentPositionTopForPeopleField + "px";
        this.peopleField.style.left = presentPositionLeftForPeopleField + "px";

        // スタンバイマップのバックグラウンド描画（マップ行を2行ずつ描画）
        // 描画する行は、32ピクセルに対するsquareSizeの係数を、settingsのdistanceに掛ける
        this.drawMapRows(this.context.stanbyMapIndex, 2, true);
      }

      // 終点まで動いていなければフレーム更新
      if (presentPositionTop != endPositionTop || presentPositionLeft != endPositionLeft) {
        window.requestAnimationFrame(moveFrame);

      // 終点まで動いていて、次のキーが登録されている
      } else if (this.context.nextKey) {
        if (this.context.textures[this.context.map[this.context.centerPosition.y][this.context.centerPosition.x]].next) {
          // ここで次のマップへ移行すること
          this.earthQuake.action();
        }
        this.swapMap();
        if (this.context.nextKey.state == "keyup") {
          this.context.continue = false;
        }
        keyCode = this.context.nextKey.keyCode;
        this.context.nextKey = null;
        this.context.isProgress = false;
        this.moveOn(keyCode);

      // 終点まで動いていて、以前のキーが押しっぱなし
      } else if (this.context.currentKey.state == "keydown") {
        if (this.context.textures[this.context.map[this.context.centerPosition.y][this.context.centerPosition.x]].next) {
          // ここで次のマップへ移行すること
          this.earthQuake.action();
        }
        this.swapMap();
        keyCode = this.context.currentKey.keyCode;
        this.context.currentKey = null;
        this.context.isProgress = false;
        this.moveOn(keyCode);

      // 次のキー操作がない
      } else {
        if (this.context.textures[this.context.map[this.context.centerPosition.y][this.context.centerPosition.x]].next) {
          // ここで次のマップへ移行すること
          this.earthQuake.action();
        }
        this.swapMap();
        this.context.currentKey = null;
        this.context.nextKey = null;
        this.context.isProgress = false;
      }
    };

    // 動作開始
    window.requestAnimationFrame(moveFrame);
  }

  // 動作の開始制御
  moveOn(keyCode) {
    let key = null;
    let destination = null;
    
    // キーコードの振り分け（移動キー以外はカット）
    key = this.context.getKey(keyCode);
    if (!key) {
      return;
    }

    // 進行方向
    destination = key.name;

    // 衝突検知
    if (this.context.canMove && !this.context.collisionMap
      [this.context.centerPosition.y - this.context.getDestination(destination).top / this.context.squareSize.y]
      [this.context.centerPosition.x - this.context.getDestination(destination).left / this.context.squareSize.x]) {
      return;
    }
    
    // 次のキーがすでに決まっている場合はカット
    if (this.context.nextKey && this.context.currentKey) {
      return;
    }

    // 同じキーの連打はカット
    if (this.context.currentKey == key && this.context.currentKey.state == "keydown") {
      return;
    }

    // 移動処理
    if (this.context.canMove) {
      this.context.upperLeftPosition.y -= this.context.getDestination(destination).top / this.context.squareSize.y;
      this.context.centerPosition.y = this.context.upperLeftPosition.y + Math.floor(this.context.mapRows / 2);
      this.context.upperLeftPosition.x -= this.context.getDestination(destination).left / this.context.squareSize.x;
      this.context.centerPosition.x = this.context.upperLeftPosition.x + Math.floor(this.context.mapColumns / 2);
      
      this.context.nextKey = null;
      this.context.isProgress = true;
      this.context.currentKey = key;
      
      if (this.context.continue) {
        this.context.currentKey.state = "keydown";
      } else {
        this.context.currentKey.state = "keyup";
        this.context.continue = true;
      }
      
      // 動作開始
      this.move(this.context.getDestination(destination));

    // 動作中の場合は次のキーを格納（最新のキーのみ）
    } else if (this.context.isProgress) {
      this.context.nextKey = key;
      this.context.nextKey.state = "keydown";
    }
  }

  // キーアップを検知する
  stop(keyCode) {
    switch (keyCode) {
      case this.context.leftKey.keyCode:
        this.context.leftKey.state = "keyup";
        break;
      case this.context.rightKey.keyCode:
        this.context.rightKey.state = "keyup";
        break;
      case this.context.topKey.keyCode:
        this.context.topKey.state = "keyup";
        break;
      case this.context.bottomKey.keyCode:
        this.context.bottomKey.state = "keyup";
        break;
    }
  }
}
