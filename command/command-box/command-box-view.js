// コマンドボックスのビュー
class CommandBoxView extends CommandBoxViewBase {

  // コンストラクタ
  constructor(context) { super(context);
    // コンテキスト
    this.context = context;

    // HTML要素
    this.commandBoxDOM = null;
    this.commandFrameDOM = null;

    // コマンドメニューオブジェクト
    this.commandMenus = null;

    this.commandTextureCanvases = new Array(this.context.commandTextures.length);
    
    // 文字キャンバスのオブジェクト
    this.charCanvases = {};

    // HTML要素の組成
    this.assemblingElements();    

    // イベントリスナの設定
    window.addEventListener("keydown", (event) => this.open(event.keyCode), false);
    window.addEventListener("keydown", (event) => this.close(event.keyCode), false);
    window.addEventListener("keydown", (event) => this.selectionChange(event.keyCode), false);
    
    // 画像の読み込みと描画
    const imageLoader = new ImageLoader();

    // 画像の読み込みと描画
    imageLoader.loadImages(this.context.commandTextures, (images) => {
      // キャッシュ用のキャンバス
      for (let i = 0; i < this.context.commandTextures.length; i++) {
        const textureCanvas = document.createElement("canvas");
        textureCanvas.width = this.context.squareSize.x;
        textureCanvas.height = this.context.squareSize.y;         
  
        const textureContext = textureCanvas.getContext("2d");
        imageLoader.setSmoothingEnabled(textureContext, false);
  
        textureContext.drawImage(images[i], 0, 0, images[i].width, images[i].height, 0, 0, this.context.squareSize.x, this.context.squareSize.y);
        this.commandTextureCanvases[i] = textureCanvas;
      }
  
      // コマンドボックスのフレーム描画
      this.drawFrame(this.commandFrameDOM, this.context.squareSize, this.commandTextureCanvases, this.context.commandBoxRows, this.context.commandBoxColumns);
      
      // 画像の読み込みと描画
      imageLoader.loadImages(this.context.textTextures, (images) => {
        
        const soloCharCanvases = {};
        const textureSize = new Size(this.context.textSize.x, this.context.textSize.y / 2); // テクスチャーはテキストの上半分か下半分 

        // キャッシュ用のキャンバス
        for (let i = 0; i < this.context.textTextures.length; i++) {
          const textureCanvas = document.createElement("canvas");
          textureCanvas.width = textureSize.x;
          textureCanvas.height = textureSize.y;

          const textureContext = textureCanvas.getContext("2d");
          imageLoader.setSmoothingEnabled(textureContext, false);

          textureContext.drawImage(images[i], 0, 0, images[i].width, images[i].height, 0, 0, textureCanvas.width, textureCanvas.height);
          soloCharCanvases[this.context.textTextures[i].texture] = textureCanvas;
        }

        // ソロ文字を組み合わせて一文字分のキャンバスを生成する
        for (let i = 0; i < this.context.textElements.length; i++) {
          const textureCanvas = document.createElement("canvas");
          textureCanvas.width = this.context.textSize.x;
          textureCanvas.height = this.context.textSize.y;    
          
          const mainChar = soloCharCanvases[this.context.textElements[i].texture1];
          const subChar = soloCharCanvases[this.context.textElements[i].texture2];
          
          const context = textureCanvas.getContext("2d");
          context.drawImage(subChar, 0, 0);
          context.drawImage(mainChar, 0, textureSize.y);

          this.charCanvases[this.context.textElements[i].read] = textureCanvas;
        }

        // コマンドメニューを生成
        const commandMenus = new Array(this.context.commandMenus.length);

        for (let i = 0; i < commandMenus.length; i++) {
          commandMenus[i] = new Array(this.context.commandMenus[i].length);
          for (let j = 0; j < commandMenus[i].length; j++) {
            commandMenus[i][j] = new CommandMenuView(this.context.commandMenuControllers[i][j], this.context.commandMenus[i][j].commandName, this.commandTextureCanvases, this.charCanvases);
            this.selectField.appendChild(commandMenus[i][j].commandMenuDOM);
          }
        }

        // DOMではない
        this.commandMenus = commandMenus;

        // コマンドボックスのコマンドメニューに文字を描画する
        for (let i = 0; i < this.context.commandMenus.length; i++) {
          for (let j = 0; j < this.context.commandMenus[i].length; j++) {
            this.commandMenus[i][j].initialize(this.charCanvases);

            // メンバーセレクトコマンド以外はカット
            if (!this.commandMenus[i][j].context.isMemberSelectCommand) {
              continue;
            }

            // メンバーセレクターのフレーム描画
            this.commandMenus[i][j].memberSelecter.drawFrame(this.commandTextureCanvases);

            // メンバーセレクターのコマンドメニューに文字を描画する
            for (let k = 0; k < this.commandMenus[i][j].memberSelecter.commandMenus.length; k++) {
              for (let l = 0; l < this.commandMenus[i][j].memberSelecter.commandMenus[k].length; l++) {
                this.commandMenus[i][j].memberSelecter.commandMenus[k][l].initialize(this.charCanvases);
              }
            }
          }
        }
      });
    });
  }

  // コマンドボックスのオープン
  open(keyCode) {
    if (keyCode == this.context.openKey.keyCode && this.context.canOpen) {
      this.context.viewState = "opened";
      this.showView();
    } else if (keyCode == this.context.openKey.keyCode && !this.context.currentCommandMenu.isMemberSelectCommand) {
      this.close(this.context.closeKey.keyCode);
    }
  }

  // コマンドボックスのクローズ
  close(keyCode) {
    if (keyCode == this.context.closeKey.keyCode && this.context.canClose) {
      this.hideView();
      this.resetCommandMenuSelection();
      this.context.viewState = "closed";
    }
  }

  // コマンドメニューの選択状態をリセットする
  resetCommandMenuSelection() {
    for (let i = 0; i < this.commandMenus.length; i++) {
      for (let j = 0; j < this.commandMenus[i].length; j++) {
        if (!this.commandMenus[i][j].context.isSelected) {
          continue;
        }

        this.commandMenus[i][j].context.isSelected = false;
        this.commandMenus[i][j].hideCommandPointer();

        this.commandMenus[0][0].context.isSelected = true;
        this.commandMenus[0][0].showCommandPointer(this.charCanvases);

        this.context.currentCommandMenu = this.commandMenus[0][0].context;
        this.context.textAreaContext.firstThrough = true;
      }
    }
  }

  // 選択状態の変更
  selectionChange(keyCode) {
    if (!this.context.canSelectionChange) {
      return;
    }

    let key = null;
    let destination = null;

    switch (keyCode) {
      case this.context.leftKey.keyCode:
        key = this.context.leftKey;
        destination = this.context.destinations["left"];
        break;
      case this.context.rightKey.keyCode:
        key = this.context.rightKey;
        destination = this.context.destinations["right"];
        break;
      case this.context.topKey.keyCode:
        key = this.context.topKey;
        destination = this.context.destinations["top"];
        break;
      case this.context.bottomKey.keyCode:
        key = this.context.bottomKey;
        destination = this.context.destinations["bottom"];
        break;
      default:
        return;
    }

    for (let i = 0; i < this.commandMenus.length; i++) {
      for (let j = 0; j < this.commandMenus[i].length; j++) {
        if (!this.commandMenus[i][j].context.isSelected) {
          continue;
        }

        // 現在のコマンドメニューと位置情報
        const currentCommand = this.commandMenus[i][j];
        const currentPosition = currentCommand.context.position;

        // キー入力に応じた次の状態
        const nextPosition = new Position(currentPosition.x + destination.left, currentPosition.y + destination.top);
        const nextPositionIsOutOfRange = !((0 <= nextPosition.x && nextPosition.x <= 1) && (0 <= nextPosition.y && nextPosition.y <= this.commandMenus.length - 1));

        // outOfRangeならカット
        if (nextPositionIsOutOfRange) {
          return;
        }

        // 次のコマンドに状態遷移
        const nextCommand = this.commandMenus[nextPosition.y][nextPosition.x];
        
        // 以前のコマンドのポインターを非表示
        currentCommand.context.isSelected = false;
        currentCommand.hideCommandPointer();
        
        // 現在のコマンドのポインターを表示
        nextCommand.context.isSelected = true;
        nextCommand.showCommandPointer(this.charCanvases);
        
        this.context.currentCommandMenu = nextCommand.context;

        return;
      }
    }
  }

  // ビューの表示
  showView() {
    this.commandBoxDOM.style.display = "block";
  }

  // ビューの非表示
  hideView() {
    this.commandBoxDOM.style.display = "none";
  }

  // HTML要素の生成
  assemblingElements() {
    // コマンドのコンテナ
    const commandBox = document.createElement("div");
    commandBox.style.position = "absolute";
    commandBox.style.zIndex = this.context.zIndexBase;
    commandBox.style.left = this.context.commandBoxPosition.x * this.context.squareSize.x + "px";
    commandBox.style.top = this.context.commandBoxPosition.y * this.context.squareSize.y + "px";
    commandBox.style.display = "none";

    // コマンドのフレーム（バックグラウンド）
    const commandFrameDOM = document.createElement("canvas");
    commandFrameDOM.style.display = "block"
    commandFrameDOM.width = this.context.squareSize.x * this.context.commandBoxColumns;
    commandFrameDOM.height = this.context.squareSize.y * this.context.commandBoxRows;

    // コマンドメニューのセットを格納するコンテナ
    const selectField = document.createElement("div");
    selectField.style.position = "absolute";
    selectField.style.top = 0;
    selectField.style.left = 0;
    selectField.style.paddingTop = this.context.squareSize.y / 2 + "px";
    selectField.style.display = "flex";
    selectField.style.flexWrap = "wrap";
    selectField.style.width = "192px";

    commandBox.appendChild(commandFrameDOM);
    commandBox.appendChild(selectField);

    // モニターにコマンドボックスを格納
    const monitor = document.getElementById("world");
    monitor.appendChild(commandBox);

    this.commandBoxDOM = commandBox;
    this.commandFrameDOM = commandFrameDOM;
    this.selectField = selectField;
  }
}
