// コマンドメニューのビュー
class CommandMenuView {

  // コンストラクタ
  constructor(controller, commandText) {
    
    // コントローラー
    this.controller = controller;

    // このコマンドメニューのテキスト
    this.commandTitle = commandText;

    // HTML要素
    this.commandMenu = null;
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
    commandPointer.width = 16;
    commandPointer.height = 32;

    // コマンドメニュー要素
    const commandText = document.createElement("canvas");
    commandText.width = 64; // 4文字分
    commandText.height = 32;

    // コマンドメニューのコンテナにポインターとメニューを格納
    commandMenu.appendChild(commandPointer);
    commandMenu.appendChild(commandText);

    // 参照を保存
    this.commandMenu = commandMenu;
    this.commandPointer = commandPointer;
    this.commandText = commandText;

    // メンバーセレクターの生成
    if (this.controller.isMemberSelectCommand) {
      const memberSelecter = new MemberSelecterView(this.controller.memberSelecterController);
      memberSelecter.memberSelecter.style.top = this.controller.memberSelecterPosition.y + "px";
      memberSelecter.memberSelecter.style.left = this.controller.memberSelecterPosition.x + "px";
    
      commandMenu.appendChild(memberSelecter.memberSelecter);
      memberSelecter.drawMemberName();

      this.memberSelecter = memberSelecter;
    }
  }

  // コマンドメニューの文字を初期化する
  initialize(textures) {

    // コマンドのタイトルを描画する
    const commandTitleContext = this.commandText.getContext("2d");
    for (let i = 0; i <this.commandTitle.length; i++) {
      commandTitleContext.drawImage(textures[this.commandTitle[i]], i * 16, 0);
    }

    // 自身が選択されていればコマンドポインターを表示する
    if (this.controller.isSelected) {
      const commandPointerContext = this.commandPointer.getContext("2d");
      commandPointerContext.drawImage(textures["commandPointer"], 0, 0);
    }
  }

  // コマンドポインターを表示
  showCommandPointer(textures) {
    const context = this.commandPointer.getContext("2d");
    context.drawImage(textures["commandPointer"], 0, 0);
  }

  // コマンドポインターを非表示
  hideCommandPointer() {
    const context = this.commandPointer.getContext("2d");
    context.clearRect(0, 0, 16, 32);
  }
}
