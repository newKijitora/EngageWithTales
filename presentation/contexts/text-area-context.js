// ------------------------------------------------------------------
// テキストエリアのコンテキストクラス
// ------------------------------------------------------------------

class TextAreaContext extends FrameContext {
  // コンストラクタ
  constructor(commandMenu, zIndexBase, position) { super(commandMenu.town, position);
    // コンテキスト
    this.commandBox = commandMenu.commandBox;
    this.commandMenu = commandMenu;
    this.parent = this.commandBox;

    // ビューが進行中かどうか（テキストエリア固有）
    this.isProgress = false;
    
    // 最初にコマンドボックスが開いたときのオープン操作はキャンセルする
    this.firstThrough = true;

    this.readIndex = 0;
    this.canReadContinue = false;
    
    this.textAreaRows = 5;
    this.textAreaColumns = 15;

    // 行数と一行あたりの文字数
    this.numberOfRows = 4;
    this.numberOfCells = 22;
    this.zIndexBase = 500;
  }

  // オープンできるかどうか
  get canOpen() {
    if (this.firstThrough) {
      this.firstThrough = false;
      return false;
    }

    if (!this.commandMenu.isSelected) {
      return false;
    }
    

    if (this.viewState == 'opened') {
      return false;
    }

    return this.checkContextForOpen();
  }

  // オープンできるかどうか：コンテキストのチェック
  checkContextForOpen() {
    // 選択中のコマンドメニューが「はなす」でなければカット
    if (this.commandBox.currentCommandMenuContext.menuName != 'はなす' && this.commandBox.currentCommandMenuContext.menuName != 'しらべる' &&
    this.commandBox.currentCommandMenuContext.menuName != 'とびら' && this.commandBox.currentCommandMenuContext.menuName != 'ちず') {     
      return false;
    }

    return true;
  }
}