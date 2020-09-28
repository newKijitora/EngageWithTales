// コマンドメニューのビュー
class MemberNameView extends MenuView {

  // コンストラクタ
  constructor(context, commandText, frameCanvases, charCanvases) { super(context, commandText, frameCanvases, charCanvases);
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
    commandText.width = 64; // 4文字分
    commandText.height = 32;

    // コマンドメニューのコンテナにポインターとメニューを格納
    commandMenu.appendChild(commandPointer);
    commandMenu.appendChild(commandText);

    // 参照を保存
    this.htmlElement = commandMenu;
    this.commandPointer = commandPointer;
    this.commandText = commandText;

    // メンバーステータスの生成
    if (this.context.memberStatusContext) {
      const memberStatus = new MemberStatusView(this.context.memberStatusContext, this.frameCanvases, this.charCanvases);
      this.htmlElement.appendChild(memberStatus.htmlElement);
    }

    if (this.context.itemListContext) {
      const itemList = new ToolListView(this.context.itemListContext, this.frameCanvases, this.charCanvases);
      this.htmlElement.appendChild(itemList.htmlElement);
    }

    if (this.context.magicListContext) {
      const magicList = new MagicListView(this.context.magicListContext, this.frameCanvases, this.charCanvases);
      this.htmlElement.appendChild(magicList.htmlElement);
    }

    if (this.context.equipmentPartsContext) {
      const equipmentParts = new EquipmentPartListView(this.context.equipmentPartsContext, this.frameCanvases, this.charCanvases);
      this.htmlElement.appendChild(equipmentParts.htmlElement);
    }
  }
}
