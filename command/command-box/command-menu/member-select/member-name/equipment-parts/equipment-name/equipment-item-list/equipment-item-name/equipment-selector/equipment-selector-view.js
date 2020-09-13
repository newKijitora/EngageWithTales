// ------------------------------------------------------------------
// 装備部位のビュー
// ------------------------------------------------------------------

class EquipmentSelectorView extends CommandBoxViewBase {

  // コンストラクタ
  constructor(context, frameCanvases, charCanvases) { super(context);
    // コンテキスト
    this.context = context;

    // フレームキャンバスと文字キャンバス
    this.frameCanvases = frameCanvases;
    this.charCanvases = charCanvases;

    // HTML要素
    this.memberSelecter = null;

    this.memberSelectFrame = null;
    this.commandMenus = null;

    // HTML要素の生成
    this.assemblingElements();

    // イベントリスナの設定
    window.addEventListener("keydown", (event) => this.open(event.keyCode), false);
    window.addEventListener("keyup", (event) => this.close(event.keyCode), false);
    window.addEventListener("keydown", (event) => this.selectionChange(event.keyCode), false);
  }
  
  // HTML要素の生成
  assemblingElements() {
    // コマンドのコンテナ
    const commandBox = document.createElement("div");
    commandBox.style.position = "absolute";
    commandBox.style.left = this.context.itemListPosition.x * this.context.squareSize.x + "px";
    commandBox.style.top = this.context.itemListPosition.y * this.context.squareSize.y + "px";
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
    //selectField.style.width = "64px";

    // コマンドメニューを生成
    const commandMenus = new Array(this.context.commandMenus.length);

    for (let i = 0; i < commandMenus.length; i++) {
      commandMenus[i] = new Array(this.context.commandMenus[i].length);
      for (let j = 0; j < commandMenus[i].length; j++) {
        commandMenus[i][j] = new EquipmentSelectMenuView(this.context.equipmentNameContexts[i][j], this.context.commandMenus[i][j].commandName, this.frameCanvases, this.charCanvases);
        selectField.appendChild(commandMenus[i][j].commandMenuDOM);
        commandMenus[i][j].initialize(this.charCanvases);
      }
    }

    commandBox.appendChild(commandFrameDOM);
    commandBox.appendChild(selectField);

    // どうぐをもっていればフレームを描画
    if (this.context.commandMenus.length != 0) {
      super.drawFrame(commandFrameDOM, this.context.squareSize, this.frameCanvases, this.context.commandBoxRows, this.context.commandBoxColumns)
    } else {
      // どうぐをもっていない場合
    }

    this.memberSelecter = commandBox;
    this.memberSelectFrame = commandFrameDOM;

    // DOMではない
    this.commandMenus = commandMenus;
  }

  // フレームを描画する
  drawFrame(textures) {
    // 基底クラスのフレーム描画呼び出し
    super.drawFrame(this.memberSelectFrame, this.context.squareSize, textures, this.context.commandBoxRows, this.context.commandBoxColumns);
  }

  // オープン
  open(keyCode) {
    if (keyCode == this.context.openKey.keyCode && this.context.canOpen) {
      this.memberSelecter.style.display = "block";
      this.context.viewState = "opened";
      this.context.commandMenu.commandBox.isChildOpened = true;
    }
  }

  // クローズ
  close(keyCode) {
    if (keyCode == this.context.closeKey.keyCode && this.context.canClose) {
      this.memberSelecter.style.display = "none";
      this.resetCommandMenuSelection();
      this.context.viewState = "closed";
    }
  }

  // 選択状態の変更
  selectionChange(keyCode) {
    if (!this.context.canSelectionChange) {
      return;
    }

    let key = null;
    let destination = null;

    key = this.context.getKey(keyCode);
    if (!key) {
      return;
    }

    destination = key.name;

    for (let i = 0; i < this.commandMenus.length; i++) {
      for (let j = 0; j < this.commandMenus[i].length; j++) {
        if (!this.commandMenus[i][j].context.isSelected) {
          continue;
        }

        // 現在のコマンドメニューと位置情報
        const currentCommand = this.commandMenus[i][j];
        const currentPosition = currentCommand.context.position;

        // キー入力に応じた次の状態
        const nextPosition = new Position(currentPosition.x + this.context.getDestination(destination).left, currentPosition.y + this.context.getDestination(destination).top);
        const nextPositionIsOutOfRange = !((0 <= nextPosition.x && nextPosition.x <= this.context.commandMenus[0].length - 1) && (0 <= nextPosition.y && nextPosition.y <= this.context.commandMenus.length - 1));

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
        //this.context.textAreaContext.firstThrough = true;
      }
    }
  }
}