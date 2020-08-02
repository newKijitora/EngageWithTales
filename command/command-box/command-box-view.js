// コマンドボックスのビュー
class CommandBoxView {

  constructor(controller) {
    // コントローラー 
    this.controller = controller;

    this.commandBoxRows = 4;
    this.commandBoxColumns = 6;

    // HTML要素
    this.commandBox = null;
    this.commandFrame = null;
    this.commandMenus = null;

    this.commandTextureCanvases = new Array(this.controller.commandTextures.length);
    
    // 文字キャンバスのオブジェクト
    this.charCanvases = {};

    // HTML要素の組成
    this.assemblingElements();    

    // 画像の読み込みと描画
    this.loadImageChars();
    this.loadImages();

    // イベントリスナ
    window.addEventListener("keydown", (event) => this.open(event.keyCode), false);
    window.addEventListener("keydown", (event) => this.close(event.keyCode), false);
    window.addEventListener("keydown", (event) => this.selectionChange(event.keyCode), false);
  }

  // コマンドボックスのオープン
  open(keyCode) {
    if (keyCode == this.controller.openKey.keyCode && this.controller.canOpen) {
      this.controller.viewState = "opened";
      this.showView();
    } else if (keyCode == this.controller.openKey.keyCode && !this.controller.currentCommandMenu.isMemberSelectCommand) {
      this.close(this.controller.closeKey.keyCode);
    }
  }

  // コマンドボックスのクローズ
  close(keyCode) {
    if (keyCode == this.controller.closeKey.keyCode && this.controller.canClose) {
      this.hideView();
      this.resetCommandMenuSelection();
      this.controller.viewState = "closed";
    }
  }

  // コマンドメニューの選択状態をリセットする
  resetCommandMenuSelection() {
    for (let i = 0; i < this.commandMenus.length; i++) {
      for (let j = 0; j < this.commandMenus[i].length; j++) {
        if (!this.commandMenus[i][j].controller.isSelected) {
          continue;
        }

        this.commandMenus[i][j].controller.isSelected = false;
        this.commandMenus[i][j].hideCommandPointer();

        this.commandMenus[0][0].controller.isSelected = true;
        this.commandMenus[0][0].showCommandPointer();
        this.controller.currentCommandMenu = this.commandMenus[0][0].controller;
        this.controller.textAreaController.firstThrough = true;

        return;
      }
    }
  }

  // 選択状態の変更
  selectionChange(keyCode) {
    if (!this.controller.canSelectionChange) {
      return;
    }

    let key = null;
    let destination = null;

    switch (keyCode) {
      case this.controller.leftKey.keyCode:
        key = this.controller.leftKey;
        destination = this.controller.destinations["left"];
        break;
      case this.controller.rightKey.keyCode:
        key = this.controller.rightKey;
        destination = this.controller.destinations["right"];
        break;
      case this.controller.topKey.keyCode:
        key = this.controller.topKey;
        destination = this.controller.destinations["top"];
        break;
      case this.controller.bottomKey.keyCode:
        key = this.controller.bottomKey;
        destination = this.controller.destinations["bottom"];
        break;
      default:
        return;
    }

    for (let i = 0; i < this.commandMenus.length; i++) {
      for (let j = 0; j < this.commandMenus[i].length; j++) {
        if (!this.commandMenus[i][j].controller.isSelected) {
          continue;
        }

        const currentCommand = this.commandMenus[i][j];
        const currentPosition = currentCommand.controller.position;

        const nextPosition = new Position(currentPosition.x + destination.left, currentPosition.y + destination.top);
        const nextPositionIsOutOfRange = !((0 <= nextPosition.x && nextPosition.x <= 1) && (0 <= nextPosition.y && nextPosition.y <= 2));

        if (nextPositionIsOutOfRange) {
          return;
        }

        const nextCommand = this.commandMenus[nextPosition.y][nextPosition.x];
        
        currentCommand.controller.isSelected = false;
        currentCommand.hideCommandPointer();
        
        nextCommand.controller.isSelected = true;
        nextCommand.showCommandPointer();
        
        this.controller.currentCommandMenu = nextCommand.controller;

        return;
      }
    }
  }

  // ビューの表示
  showView() {
    this.commandBox.style.display = "block";
  }

  // ビューの非表示
  hideView() {
    this.commandBox.style.display = "none";
  }

  // HTML要素の生成
  assemblingElements() {
    const commandFrame = document.createElement("canvas");
    commandFrame.style.display = "block"
    commandFrame.width = this.controller.squareSize.x * 6;
    commandFrame.height = this.controller.squareSize.y * 4;

    const selectField = document.createElement("div");
    selectField.style.position = "absolute";
    selectField.style.top = 0;
    selectField.style.left = 0;
    selectField.style.padding = "16px";
    selectField.style.display = "flex";
    selectField.style.flexWrap = "wrap";
    selectField.style.width = "160px";

    const commandMenus = new Array(3);

    for (let i = 0; i < commandMenus.length; i++) {
      commandMenus[i] = new Array(2);
      for (let j = 0; j < commandMenus[i].length; j++) {
        commandMenus[i][j] = new CommandMenuView(this.controller.commandMenuControllers[i][j], this.controller.menus[i][j]);
        selectField.appendChild(commandMenus[i][j].commandMenu);
      }
    }
    
    // const commandTitle = document.createElement("div");
    // commandTitle.classList.add("command-title");
    // commandTitle.innerText = "コマンド";

    // commandBox.appendChild(commandTitle);
    // commandBox.appendChild(selectField);

    const commandBox = document.createElement("div");
    commandBox.style.position = "absolute";
    commandBox.style.zIndex = this.controller.zIndexBase;
    commandBox.style.backgroundColor = "#020202";
    commandBox.style.left = 6 * this.controller.squareSize.x + "px";
    commandBox.style.top = 3 * this.controller.squareSize.y + "px";
    commandBox.style.display = "none";

    commandBox.appendChild(commandFrame);
    commandBox.appendChild(selectField);

    const monitor = document.getElementById("world");
    monitor.appendChild(commandBox);

    this.commandBox = commandBox;
    this.commandFrame = commandFrame;
    this.commandMenus = commandMenus;
  }

  // 画像を読み込んでキャッシュする
  loadImages() {
    const images = new Array(this.controller.commandTextures.length);
    const mapChipSize = this.controller.squareSize;
    let loadedImageCount = 0;

    for (let i = 0; i < this.controller.commandTextures.length; i++) {
      images[i] = new Image();
      images[i].src = "resources/images/" + this.controller.commandTextures[i].texture + ".png";

      // 画像ロードごとのイベントハンドラー
      images[i].addEventListener("load", (event) => {
        if (++loadedImageCount < this.commandTextureCanvases.length) {
          return;
        }
        
        for (let i = 0; i < this.commandTextureCanvases.length; i++) {
          const textureCanvas = document.createElement("canvas");
          textureCanvas.width = mapChipSize.x;
          textureCanvas.height = mapChipSize.y;         

          const textureContext = textureCanvas.getContext("2d");
          textureContext.mozImageSmoothingEnabled = false;
          textureContext.webkitImageSmoothingEnabled = false;
          textureContext.msImageSmoothingEnabled = false;
          textureContext.imageSmoothingEnabled = false;

          textureContext.drawImage(images[i], 0, 0, images[i].width, images[i].height, 0, 0, mapChipSize.x, mapChipSize.y);
          this.commandTextureCanvases[i] = textureCanvas;
        }

        this.drawCommandFrame();

      }, false);
    }
  }

  // 文字画像を読み込んでキャッシュする
  loadImageChars() {

    // 文字画像をすべて取得する
    const images = new Array(this.controller.textTextures.length);
    let loadedImageCount = 0;

    // 画像の読み込みとロードイベントハンドラーの設定
    for (let i = 0; i < this.controller.textTextures.length; i++) {
      images[i] = new Image();
      images[i].src = "resources/images/" + this.controller.textTextures[i].texture + ".png";

      // 画像ロードごとのイベントハンドラー
      images[i].addEventListener("load", (event) => {
        if (++loadedImageCount < this.controller.textTextures.length) {
          return;
        }

        // すべての文字テクスチャーのキャンバスを生成する
        const soloCharCanvases = {};

        for (let i = 0; i < this.controller.textTextures.length; i++) {
          
          const textureCanvas = document.createElement("canvas");
          textureCanvas.width = this.controller.squareSize.x / 2;
          textureCanvas.height = this.controller.squareSize.y / 2;         

          const textureContext = textureCanvas.getContext("2d");
          textureContext.mozImageSmoothingEnabled = false;
          textureContext.webkitImageSmoothingEnabled = false;
          textureContext.msImageSmoothingEnabled = false;
          textureContext.imageSmoothingEnabled = false;

          textureContext.drawImage(images[i], 0, 0, images[i].width, images[i].height, 0, 0, textureCanvas.width, textureCanvas.height);
          soloCharCanvases[this.controller.textTextures[i].texture] = textureCanvas;
        }

        // ソロ文字を組み合わせて一文字分のキャンバスを生成する
        for (let i = 0; i < this.controller.mojis.length; i++) {

          const textureCanvas = document.createElement("canvas");
          textureCanvas.width = this.controller.squareSize.x / 2;
          textureCanvas.height = this.controller.squareSize.y;    
          
          const mainChar = soloCharCanvases[this.controller.mojis[i].texture1];
          const subChar = soloCharCanvases[this.controller.mojis[i].texture2];
          
          const context = textureCanvas.getContext("2d");
          context.drawImage(subChar, 0, 0);
          context.drawImage(mainChar, 0, this.controller.squareSize.y / 2);

          this.charCanvases[this.controller.mojis[i].read] = textureCanvas;
        }

        // コマンドメニューに文字を描画する
        for (let i = 0; i < this.controller.menus.length; i++) {
          for (let j = 0; j < this.controller.menus[i].length; j++) {
            this.commandMenus[i][j].draw(this.charCanvases);
          }
        }
      }, false);
    }
  }

  // コマンドのフレームを描画する
  drawCommandFrame() {
    const context = this.commandFrame.getContext("2d");
    const mapChipSize = this.controller.squareSize;

    for (let i = 0; i < this.commandBoxRows; i++) {
      for (let j = 0; j < this.commandBoxColumns; j++) {
        const textureIndex = this.controller.commandMap[i][j];
        if (textureIndex == -1) {
          continue;
        }

        context.drawImage(this.commandTextureCanvases[textureIndex], j * mapChipSize.x, i * mapChipSize.y);
      }
    }
  }
}
