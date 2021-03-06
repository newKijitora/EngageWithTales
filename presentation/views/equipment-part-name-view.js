// コマンドメニューのビュー
class EquipmentPartNameView extends MenuView {

  // コンストラクタ
  constructor(context, canvases) { super(context, canvases);
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

    if (this.context.contexts['equipment-item']) {
      const toolList = new EquipmentItemListView(this.context.contexts['equipment-item'], this.canvases);
      this.commandMenuDOM.appendChild(toolList.htmlElement);
    }
  }
}
