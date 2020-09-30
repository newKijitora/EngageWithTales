// ------------------------------------------------------------------
// コマンドボックスのコンテキスト
// ------------------------------------------------------------------

class CommandBoxContext extends SelectMenuContext {

  // コンストラクタ
  constructor(town, position) { super(null, town, position); // コマンドメニューはnull
    this.zIndexBase = 500;
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

  get canClose() {
    if (this.viewState == 'closed') {
      return false;
    }

    // if (this.isChildOpened > 0) {
    //   this.isChildOpened--;
    //   return false;
    // }

    for (let i = 0; i < this.commandMenuContexts.length; i++) {
      for (let j = 0; j < this.commandMenuContexts[i].length; j++) {
        if (this.commandMenuContexts[i][j].menu.label == "talk" ||
        this.commandMenuContexts[i][j].menu.label == "door" ||
        this.commandMenuContexts[i][j].menu.label == "search" ||
        this.commandMenuContexts[i][j].menu.label == "map") { // 整合性が取れてない。。。menu-context.jsと整合性をとる。。。
          if (this.commandMenuContexts[i][j].textAreaContext && this.commandMenuContexts[i][j].textAreaContext.isProgress) {
            return false;
          }
        }
      }
    }

    return true;
  }

  // コマンドの選択を変更することができるかどうか
  get canSelectionChange() {
    // ビュー状態がclosedであればカット
    if (this.viewState == 'closed') {
      return false;
    }
    
    for (let i = 0; i < this.commandMenuContexts.length; i++) {
      for (let j = 0; j < this.commandMenuContexts[i].length; j++) {
        if (this.commandMenuContexts[i][j].menu.label == "talk" ||
        this.commandMenuContexts[i][j].menu.label == "door" ||
        this.commandMenuContexts[i][j].menu.label == "search" ||
        this.commandMenuContexts[i][j].menu.label == "map") { // 整合性が取れてない。。。menu-context.jsと整合性をとる。。。
          if (this.commandMenuContexts[i][j].textAreaContext && this.commandMenuContexts[i][j].textAreaContext.viewState != "closed") {
            return false;
          }
        }
      }
    }

    // メンバーセレクトコマンドが選択中で、かつオープン状態ならカット
    if (this.currentCommandMenuContext.isMemberSelectCommand &&
      this.currentCommandMenuContext.memberSelecterContext.viewState == 'opened') {
      return false;
    }

    return true;
  }
}
