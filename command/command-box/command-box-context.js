// ------------------------------------------------------------------
// コマンドボックスのコンテキスト
// ------------------------------------------------------------------

class CommandBoxContext extends SelectMenuContext {

  // コンストラクタ
  constructor(town, zIndexBase, position) { super(null, town, position); // コマンドメニューはnull
    // 重ね位置
    this.zIndexBase = zIndexBase;

    // サブコンテキスト
    this.subContexts['text-area'] = new TextAreaContext(this, this.zIndexBase, new Position(5, 11));

    this.commandMenuContexts = this.createMenuContexts(this.commandMenus);
  }

  // コマンドメニューのコンテキストを生成する
  createMenuContexts(menus) {
    const contexts = new Array(menus.length);

    for (let i = 0; i < contexts.length; i++) {
      contexts[i] = new Array(menus[i].length);
      for (let j = 0; j < contexts[i].length; j++) {

        // コマンドメニュー
        contexts[i][j] = new CommandMenuContext({
          commandBox: this,
          menu: menus[i][j],
          size: this.menuSize,
          position: new Position(j, i),
          label: 'first'
        });

        if (menus[i][j].isSelected) {
          this.currentCommandMenuContext = contexts[i][j];
        }
      }
    }

    return contexts;
  }

  // コマンドボックスを開くことができるかどうか
  get canOpen() {
    // ビュー状態がオープンならカット
    if (this.viewState == 'opened') {
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
