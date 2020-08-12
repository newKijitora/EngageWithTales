// コマンドメニューのビュー
class CommandMenuView {

  // コンストラクタ
  constructor(context, commandText, frameCanvases, charCanvases) {
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

    // メンバーセレクターの生成
    if (this.context.isMemberSelectCommand) {
      const memberSelecter = new MemberSelecterView(this.context.memberSelecterContext, this.frameCanvases, this.charCanvases);
      memberSelecter.memberSelecter.style.zIndex = 1;
      commandMenu.appendChild(memberSelecter.memberSelecter);

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
