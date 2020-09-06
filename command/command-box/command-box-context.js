// ------------------------------------------------------------------
// コマンドボックスのコンテキスト（コマンド関連オブジェクトのルート）
// ------------------------------------------------------------------

class CommandBoxContext extends CommandBoxContextBase {

  // コンストラクタ
  constructor(town, zIndexBase) { super(town);
    // コマンドボックスのサイズ（列数）
    this.commandBoxColumns = 7; // 変数を検討

    // コマンドボックスの左上位置
    this.commandBoxPosition = new Position(5, 2);

    this.zIndexBase = zIndexBase;

    // サブコンテキスト
    this.subContexts['text-area'] = new TextAreaContext(this, this.zIndexBase);

    // コマンドメニューのコンテキストを生成する
    this.commandMenuContexts = this.createMenuContexts(this.commandMenus);
  }

  // コマンドメニューのコンテキストを生成する
  createMenuContexts(menus) {
    const menuContexts = new Array(menus.length);

    for (let i = 0; i < menuContexts.length; i++) {
      
      menuContexts[i] = new Array(menus[i].length);

      for (let j = 0; j < menuContexts[i].length; j++) {

        menuContexts[i][j] = new CommandMenuContext(this, menus[i][j], this.menuSize, new Position(j, i));

        if (menus[i][j].isSelected) {
          this.currentCommandMenuContext = menuContexts[i][j];
        }
      }
    }

    return menuContexts;
  }

  // コマンドボックスを開くことができるかどうか
  get canOpen() {
    // ビュー状態がオープンならカット
    if (this.viewState == 'opened') {
      return false;
    }

    return true;
  }

  // コマンドボックスを閉じることができるかどうか
  get canClose() {
    // ビュー状態がクローズならカット
    if (this.viewState == 'closed') {
      return false;
    }

    // テキストボックスが進行中であればカット
    if (this.subContexts['text-area'] && this.subContexts['text-area'].isProgress) {
      return false;
    }

    // メンバーセレクトコマンドが選択中で、かつオープン状態ならカット
    if (this.currentCommandMenuContext.isMemberSelectCommand &&
      this.currentCommandMenuContext.memberSelecterContext.viewState == 'opened') {
      return false;
    }

    return true;
  }

  // コマンドの選択を変更することができるかどうか
  get canSelectionChange() {
    // ビュー状態がclosedであればカット
    if (this.viewState == 'closed') {
      return false;
    }
    
    // テキストエリアのビュー状態がopenedであればカット
    if (this.subContexts['text-area'].viewState == 'opened') {
      return false;
    }

    // メンバーセレクトコマンドが選択中で、かつオープン状態ならカット
    if (this.currentCommandMenuContext.isMemberSelectCommand &&
      this.currentCommandMenuContext.memberSelecterContext.viewState == 'opened') {
      return false;
    }

    return true;
  }
}
