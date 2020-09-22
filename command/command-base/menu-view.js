// コマンドメニューのビュー
class MenuView {

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
