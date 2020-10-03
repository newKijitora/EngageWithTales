// ------------------------------------------------------------------
// コマンドメニューのビュー基底クラス
// ------------------------------------------------------------------

class MenuView {
  // コンストラクタ
  constructor(context, canvases) {
    // コンテキストとキャンバス
    this.context = context;
    this.canvases = canvases;

    // このコマンドメニューのテキスト
    this.commandTitle = this.context.menu.commandName;

    // HTML要素
    this.commandMenuDOM = null;
    this.commandPointer = null;
    this.memberSelecter = null;
  }

  // コマンドメニューの文字を初期化する
  initialize(textures) {
    // コマンドのタイトルを描画する
    const commandTitleContext = this.commandText.getContext('2d');
    for (let i = 0; i < this.commandTitle.length; i++) {
      commandTitleContext.drawImage(textures[this.commandTitle[i]], i * 16, 0);
    }

    // 自身が選択されていればコマンドポインターを表示する
    if (this.context.isSelected) {
      const commandPointerContext = this.commandPointer.getContext('2d');
      commandPointerContext.drawImage(textures['commandPointer'], 16, 0);
    }
  }

  // コマンドポインターを表示
  showCommandPointer(textures) {
    const context = this.commandPointer.getContext('2d');
    context.drawImage(textures['commandPointer'], 16, 0);
  }

  // コマンドポインターを非表示
  hideCommandPointer() {
    const context = this.commandPointer.getContext('2d');
    context.clearRect(0, 0, 32, 32);
  }
}
