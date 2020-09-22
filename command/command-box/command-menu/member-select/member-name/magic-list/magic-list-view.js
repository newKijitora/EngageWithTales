// ------------------------------------------------------------------
// 魔法名のリストのビュークラス
// ------------------------------------------------------------------

class MagicListView extends SelectMenuView {

  // コンストラクタ
  constructor(context, frameCanvases, charCanvases) { super(context, frameCanvases, charCanvases);
    // HTML要素の生成
    this.assemblingElements();

    // イベントリスナの設定
    window.addEventListener('keydown', (event) => this.open(event.keyCode), false);
    window.addEventListener('keydown', (event) => this.close(event.keyCode), false);
    window.addEventListener('keydown', (event) => this.selectionChange(event.keyCode), false);
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
        commandMenus[i][j] = new MagicNameView(this.context.memberNameContexts[i][j], this.context.commandMenus[i][j].commandName, this.frameCanvases, this.charCanvases);
        selectField.appendChild(commandMenus[i][j].commandMenuDOM);

        commandMenus[i][j].initialize(this.charCanvases);
      }
    }

    commandBox.appendChild(commandFrameDOM);
    commandBox.appendChild(selectField);

    // まほうをおぼえていればフレームを描画
    if (this.context.commandMenus.length != 0) {
      super.drawFrame(commandFrameDOM, this.context.squareSize, this.frameCanvases, this.context.commandBoxRows, 6)
    } else {
      // まほうをおぼえていない場合
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
}