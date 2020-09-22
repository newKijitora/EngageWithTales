// メンバーセレクターのビュークラス
class EquipmentItemListView extends CommandBoxViewBase {

  // コンストラクタ
  constructor(context, frameCanvases, charCanvases) { super(context, frameCanvases, charCanvases);
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

    // コマンドメニューを生成
    const commandMenus = this.createCommandMenus(this.context.commandMenus);

    // コマンドボックスにメニューを追加していく
    for (let i = 0; i < commandMenus.length; i++) {
      for (let j = 0; j < commandMenus[i].length; j++) {
        selectField.appendChild(commandMenus[i][j].commandMenuDOM);
      }
    }

    commandBox.appendChild(commandFrameDOM);
    commandBox.appendChild(selectField);

    // どうぐをもっていればフレームを描画
    if (this.context.commandMenus.length != 0) {
      this.drawFrame(commandFrameDOM, this.context.squareSize, this.frameCanvases, this.context.commandBoxRows, this.context.commandBoxColumns)
    } else {
      // どうぐをもっていない場合
      // テキストエリアでメッセージを出すようにする
    }

    this.memberSelecter = commandBox;
    this.memberSelectFrame = commandFrameDOM;

    // DOMではない
    this.commandMenus = commandMenus;
  }

  // コマンドメニューを生成する
  createCommandMenus(menus) {
    const commandMenus = new Array(menus.length);

    for (let i = 0; i < commandMenus.length; i++) {
      commandMenus[i] = new Array(menus[i].length);
      for (let j = 0; j < commandMenus[i].length; j++) {
        commandMenus[i][j] = new EquipmentItemNameView(this.context.commandMenuContexts[i][j], menus[i][j].commandName, this.frameCanvases, this.charCanvases);
        commandMenus[i][j].initialize(this.charCanvases);
      }
    }

    return commandMenus;
  }

  // オープン
  open(keyCode) {
    if (keyCode == this.context.openKey.keyCode && this.context.canOpen) {
      this.memberSelecter.style.display = "block";
      this.context.viewState = "opened";
      this.context.commandMenu.commandBox.commandMenu.commandBox.isChildChildOpened = true;
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
}