// コマンドメニューのビュー
class EquipmentNameView extends CommandBoxViewBase {

  // コンストラクタ
  constructor(context, commandText, frameCanvases, charCanvases) { super(context);
    // コンテキスト
    this.context = context;

    // フレームキャンバスと文字キャンバス
    this.frameCanvases = frameCanvases;
    this.charCanvases = charCanvases;

    // このコマンドメニューのテキスト
    this.commandTitle = commandText;

    // HTML要素
    this.commandMenuDOM = null;
    this.commandPointer = null;
    this.memberSelecter = null;

    // HTML要素の生成
    this.assemblingElements();
  }
  
  // HTML要素の生成
  assemblingElements() {
    // コマンドメニューのコンテナ
    const commandMenu = document.createElement("div");
    commandMenu.style.display = "flex";

    // コマンドポインター要素
    const commandPointer = document.createElement("canvas");
    commandPointer.width = 32;
    commandPointer.height = 32;

    // コマンドメニュー要素
    const commandText = document.createElement("canvas");
    commandText.width = 128; // 8文字分
    commandText.height = 32;

    // コマンドメニューのコンテナにポインターとメニューを格納
    commandMenu.appendChild(commandPointer);
    commandMenu.appendChild(commandText);

    // 参照を保存
    this.commandMenuDOM = commandMenu;
    this.commandPointer = commandPointer;
    this.commandText = commandText;

    if (this.context.itemListContext) {
      const toolList = new EquipmentItemListView(this.context.itemListContext, this.frameCanvases, this.charCanvases);
      this.commandMenuDOM.appendChild(toolList.memberSelecter);
    }
  }

  // コマンドメニューの文字を初期化する
  initialize(textures) {
    // コマンドのタイトルを描画する
    const commandTitleContext = this.commandText.getContext("2d");
    for (let i = 0; i < this.commandTitle.length; i++) {
      commandTitleContext.drawImage(textures[this.commandTitle[i]], i * 16, 0);
    }

    // 自身が選択されていればコマンドポインターを表示する
    if (this.context.isSelected) {
      const commandPointerContext = this.commandPointer.getContext("2d");
      commandPointerContext.drawImage(textures["commandPointer"], 16, 0);
    }
  }

  // コマンドポインターを表示
  showCommandPointer(textures) {
    const context = this.commandPointer.getContext("2d");
    context.drawImage(textures["commandPointer"], 16, 0);
  }

  // コマンドポインターを非表示
  hideCommandPointer() {
    const context = this.commandPointer.getContext("2d");
    context.clearRect(0, 0, 32, 32);
  }
}
