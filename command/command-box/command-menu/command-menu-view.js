// コマンドメニューのビュー
class CommandMenuView extends MenuView {

  // コンストラクタ
  constructor(context, commandText, frameCanvases, charCanvases) { super(context, commandText, frameCanvases, charCanvases);
    // HTML要素の生成
    this.assemblingElements();
  }
  
  // HTML要素の生成
  assemblingElements() {
    // コマンドメニューのコンテナ
    const commandMenu = document.createElement("div");
    commandMenu.style.position = "relative";
    commandMenu.style.display = "flex";

    // コマンドポインター要素
    const commandPointer = document.createElement("canvas");
    commandPointer.style.zIndex = 0;
    commandPointer.width = 32;
    commandPointer.height = 32;

    // コマンドメニュー要素
    const commandText = document.createElement("canvas");
    commandPointer.style.zIndex = 0;
    commandText.width = 64; // 4文字分
    commandText.height = 32;

    // コマンドメニューのコンテナにポインターとメニューを格納
    commandMenu.appendChild(commandPointer);
    commandMenu.appendChild(commandText);

    // 参照を保存
    this.commandMenuDOM = commandMenu;
    this.commandPointer = commandPointer;
    this.commandText = commandText;

    if (this.context.textAreaContext) {
      this.textAreaView = new TextAreaView(this.context.textAreaContext, this.frameCanvases, this.charCanvases);
    }

    // メンバーセレクターの生成
    if (this.context.isMemberSelectCommand) {
      const memberSelecter = new MemberSelectView(this.context.memberSelecterContext, this.frameCanvases, this.charCanvases);
      memberSelecter.htmlElement.style.zIndex = 1;
      commandMenu.appendChild(memberSelecter.htmlElement);

      this.htmlElement = memberSelecter;
    }
  }
}
