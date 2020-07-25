class Map {
  // コンストラクタ
  constructor(mapField, context) {
    this.mapField = mapField;
    this.context = context;
  }
}

// マップエリアクラス
class MapAreaView {
  // コンストラクタ
  constructor(controller) {
    // コントローラー
    this.controller = controller;

    // マップとコンテキスト
    this.mapLayer = null;
    this.mapAreas = new Array(2);
    this.peopleLayer = null;
    this.peopleField = null;

    // テクスチャー画像のキャンバス要素
    this.textureCanvases = new Array(this.controller.textures.length);

    // HTML要素の組成
    this.assemblingElements();
    
    // 画像のロード：初回のマップ描画を含む
    this.loadImages();

    this.earthQuake = new GameEvent(this.mapLayer, "earthQuake");

    // スタンバイマップを非表示
    this.mapAreas[this.controller.stanbyMapIndex].mapField.style.display = "none";
    this.drawnRows = 0;

    // イベントリスナー
    window.addEventListener("keydown", (event) => this.moveOn(event.keyCode), false);
    window.addEventListener("keyup", (event) => this.stop(event.keyCode), false);
  }

  // アクティブなマップシートを交代する
  swapMap() {
    this.drawnRows = 0;
    this.mapAreas[this.controller.stanbyMapIndex].mapField.style.display = "block";
    this.mapAreas[this.controller.activeMapIndex].mapField.style.display = "none";
    this.mapAreas[this.controller.activeMapIndex].mapField.style.top = this.mapAreas[this.controller.stanbyMapIndex].mapField.style.top;
    this.mapAreas[this.controller.activeMapIndex].mapField.style.left = this.mapAreas[this.controller.stanbyMapIndex].mapField.style.left;
    const workIndex = this.controller.activeMapIndex;
    this.controller.activeMapIndex = this.controller.stanbyMapIndex;
    this.controller.stanbyMapIndex = workIndex;
  }

  // HTML要素を組成
  assemblingElements() {
    const world = document.getElementById("world");
    const squareSize = this.controller.squareSize;
    const mapSize = this.controller.mapSize;

    // マップ用のレイヤー
    const mapLayer = document.createElement("div");
    mapLayer.classList.add("layer");
    mapLayer.style.zIndex = this.controller.zIndexBase + 0;
    mapLayer.style.top = (squareSize.y * -1) + "px";
    mapLayer.style.left = (squareSize.x * -1) + "px";

    // キャラクター用のレイヤー
    const peopleLayer = document.createElement("div");
    peopleLayer.classList.add("layer");
    peopleLayer.style.zIndex = ++this.controller.zIndexBase;

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
    if (this.drawnRows > this.controller.numberOfMapRows) {
      return;
    }

    const context = this.mapAreas[mapIndex].context;
    const mainBackgroundTextureIndex = this.controller.mainBackgroundTextureIndex;
    
    if (this.drawnRows == 0) {
      const pattern = context.createPattern(this.textureCanvases[mainBackgroundTextureIndex], "repeat");
      context.fillStyle = pattern;
      context.fillRect(0, 0, 972, 672);
    }

    const x = this.controller.upperLeftPosition.x;
    const y = this.controller.upperLeftPosition.y;

    let startRow = 0;
    let endRow = 0;

    if (stanby) {
      startRow = this.drawnRows;
      endRow = this.drawnRows + numberOfLines;
      this.drawnRows = endRow;
    } else {
      endRow = this.controller.numberOfMapRows;
    }

    for (let i = startRow; i < endRow; i++) {
      for (let j = 0; j < this.controller.numberOfMapColumns; j++) {
        const textureIndex = this.controller.currentMap[y + i][x + j];
        if (textureIndex == mainBackgroundTextureIndex) {
          continue;
        }
        const mapChipSize = this.controller.squareSize;

        context.clearRect(j * mapChipSize.x, i * mapChipSize.y, mapChipSize.x, mapChipSize.y);
        context.drawImage(this.textureCanvases[textureIndex], j * mapChipSize.x, i * mapChipSize.y);
      }
    }
  }

  // 画像を読み込んでキャッシュする
  loadImages() {
    const images = new Array(this.controller.textures.length);
    const mapChipSize = this.controller.squareSize;
    let loadedImageCount = 0;

    for (let i = 0; i < this.controller.textures.length; i++) {
      images[i] = new Image();
      images[i].src = "resources/images/" + this.controller.textures[i].texture + ".png";
      
      // 画像ロードごとのイベントハンドラー
      images[i].addEventListener("load", (event) => {
        if (++loadedImageCount < this.textureCanvases.length) {
          return;
        }
          
        for (let i = 0; i < this.textureCanvases.length; i++) {
          const textureCanvas = document.createElement("canvas");
          textureCanvas.width = mapChipSize.x;
          textureCanvas.height = mapChipSize.y;         

          const textureContext = textureCanvas.getContext("2d");
          textureContext.drawImage(images[i], 0, 0, images[i].width, images[i].height, 0, 0, mapChipSize.x, mapChipSize.y);
          this.textureCanvases[i] = textureCanvas;
        }

        this.drawMapRows(this.controller.activeMapIndex, this.controller.numberOfMapRows, false);
      }, false);
    }
  }

  // マップが動く
  move(destination) {
    const startPositionTop = parseInt(this.mapAreas[this.controller.activeMapIndex].mapField.style.top);
    const startPositionLeft = parseInt(this.mapAreas[this.controller.activeMapIndex].mapField.style.left);
    const endPositionTop = startPositionTop + destination.top;
    const endPositionLeft = startPositionLeft + destination.left;
    
    let presentPositionTop = startPositionTop;
    let presentPositionLeft = startPositionLeft;

    // キャラクターフィールド
    let presentPositionTopForPeopleField = parseInt(this.peopleField.style.top);
    let presentPositionLeftForPeopleField = parseInt(this.peopleField.style.left);

    let baseTime = 0;
    let keyCode = 0;

    const moveFrame = (now) => {
      if (!baseTime) {
        baseTime = now;
      }

      if (now - baseTime > 0) {
        if (destination.top > 0) {
          presentPositionTop += this.controller.distance;
          presentPositionTopForPeopleField += this.controller.distance;
        } else if (destination.top < 0) {
          presentPositionTop -= this.controller.distance;
          presentPositionTopForPeopleField -= this.controller.distance;
        }

        if (destination.left > 0) {
          presentPositionLeft += this.controller.distance;
          presentPositionLeftForPeopleField += this.controller.distance;
        } else if (destination.left < 0) {
          presentPositionLeft -= this.controller.distance;
          presentPositionLeftForPeopleField -= this.controller.distance;
        }

        this.mapAreas[this.controller.activeMapIndex].mapField.style.top = presentPositionTop + "px";
        this.mapAreas[this.controller.activeMapIndex].mapField.style.left = presentPositionLeft + "px";

        // キャラクターフィールド
        this.peopleField.style.top = presentPositionTopForPeopleField + "px";
        this.peopleField.style.left = presentPositionLeftForPeopleField + "px";

        this.drawMapRows(this.controller.stanbyMapIndex, 2, true);
      }

      if (presentPositionTop != endPositionTop || presentPositionLeft != endPositionLeft) {
        window.requestAnimationFrame(moveFrame);

      } else if (this.controller.nextKey) {
        if (this.controller.textures[this.controller.currentMap[this.controller.centerPosition.y][this.controller.centerPosition.x]].next) {
          // ここで次のマップへ移行すること
          this.earthQuake.action();
        }
        this.swapMap();
        if (this.controller.nextKey.state == "keyup") {
          this.controller.continue = false;
        }
        keyCode = this.controller.nextKey.keyCode;
        this.controller.nextKey = null;
        this.controller.isProgress = false;
        this.moveOn(keyCode);

      } else if (this.controller.currentKey.state == "keydown") {
        if (this.controller.textures[this.controller.currentMap[this.controller.centerPosition.y][this.controller.centerPosition.x]].next) {
          // ここで次のマップへ移行すること
          this.earthQuake.action();
        }
        this.swapMap();
        keyCode = this.controller.currentKey.keyCode;
        this.controller.currentKey = null;
        this.controller.isProgress = false;
        this.moveOn(keyCode);

      } else {
        if (this.controller.textures[this.controller.currentMap[this.controller.centerPosition.y][this.controller.centerPosition.x]].next) {
          // ここで次のマップへ移行すること
          this.earthQuake.action();
        }
        this.swapMap();
        this.controller.currentKey = null;
        this.controller.nextKey = null;
        this.controller.isProgress = false;
      }
    };

    window.requestAnimationFrame(moveFrame);
  }

  // 動作の開始制御
  moveOn(keyCode) {
    let key = null;
    let destination = null;
    
    switch (keyCode) {
      case this.controller.leftKey.keyCode:
        key = this.controller.leftKey;
        destination = "left";
        break;
      case this.controller.rightKey.keyCode:
        key = this.controller.rightKey;
        destination = "right";
        break;
      case this.controller.topKey.keyCode:
        key = this.controller.topKey;
        destination = "top";
        break;
      case this.controller.bottomKey.keyCode:
        key = this.controller.bottomKey;
        destination = "bottom";
        break;
      default:
        return;
    }

    // 衝突検知
    if (this.controller.canMove && !this.controller.collisionMap
      [this.controller.centerPosition.y - this.controller.destinations[destination].top / this.controller.squareSize.y]
      [this.controller.centerPosition.x - this.controller.destinations[destination].left / this.controller.squareSize.x]) {
      return;
    }
    
    // 次のキーがすでに決まっている場合はカット
    if (this.controller.nextKey && this.controller.currentKey) {
      return;
    }

    // 同じキーの連打はカット
    if (this.controller.currentKey == key && this.controller.currentKey.state == "keydown") {
      return;
    }

    if (this.controller.canMove) {
      this.controller.upperLeftPosition.y -= this.controller.destinations[destination].top / this.controller.squareSize.y;
      this.controller.centerPosition.y = this.controller.upperLeftPosition.y + Math.floor(this.controller.numberOfMapRows / 2);
      this.controller.upperLeftPosition.x -= this.controller.destinations[destination].left / this.controller.squareSize.x;
      this.controller.centerPosition.x = this.controller.upperLeftPosition.x + Math.floor(this.controller.numberOfMapColumns / 2);
      
      
      this.controller.nextKey = null;
      this.controller.isProgress = true;
      this.controller.currentKey = key;
      
      if (this.controller.continue) {
        this.controller.currentKey.state = "keydown";
      } else {
        this.controller.currentKey.state = "keyup";
        this.controller.continue = true;
      }
      
      this.move(this.controller.destinations[destination]);

    } else if (this.controller.isProgress) {
      this.controller.nextKey = key;
      this.controller.nextKey.state = "keydown";
    }
  }

  // キーアップを検知する
  stop(keyCode) {
    switch (keyCode) {
      case this.controller.leftKey.keyCode:
        this.controller.leftKey.state = "keyup";
        break;
      case this.controller.rightKey.keyCode:
        this.controller.rightKey.state = "keyup";
        break;
      case this.controller.topKey.keyCode:
        this.controller.topKey.state = "keyup";
        break;
      case this.controller.bottomKey.keyCode:
        this.controller.bottomKey.state = "keyup";
        break;
    }
  }
}
