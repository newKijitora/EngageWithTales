// ------------------------------------------------------------------
// コマンドボックスのコンテキスト基底クラス
// ------------------------------------------------------------------

class SelectMenuContext extends KeyManageContext {

  // コンストラクタ
  constructor(commandMenu, town, position, commandMenus, name) { super(town, position);
    // コマンドメニュー
    this.commandMenu = null;

    // 親コマンドボックス
    this.parent = null;

    if (commandMenu) {
      this.commandMenu = commandMenu;
      this.parent = this.commandMenu.commandBox;

      // メニューの名前
      if (this.commandMenu.menuName) {
        this.title = this.commandMenu.menuName;
      }
    }

    // 選択中のコマンドメニューのコンテキスト
    this.currentCommandMenuContext = null;

    // メニューのサイズ
    this.menuSize = new Size(this.textSize.x * this.commandMenuLength, this.textSize.y);

    // コマンドのメニュー
    // 1次配列は行、2次配列は列を表す
    this.commandMenus = this.town.commandMenus;

    if (commandMenus) {
      this.commandMenus = commandMenus;
    }

    // コマンドボックスのサイズ（行数）
    this.commandBoxRows = this.commandMenus.length + 1;
    // コマンドボックスのサイズ（列数）
    this.commandBoxColumns = 7; // 変数を検討

    this.isChildOpened = 0;

    if (name == 'equipselect') {
      this.maxTitleLength = 4;

      // コマンドフレームのサイズ
      this.commandBoxColumns = (this.maxTitleLength / 2) + 2; // 変数を検討（+2 はコマンドポインターの分）

      this.menuContexts =  this.createMenus(commandMenus);
    }
  }

  createMenus(commandMenus) {
    // コマンドメニューのコンテキストを生成する
    const contexts = new Array(commandMenus.length);

    for (let i = 0; i < contexts.length; i++) {
      contexts[i] = new Array(commandMenus[i].length);
      for (let j = 0; j < contexts[i].length; j++) {
        contexts[i][j] = new MenuContext({
          commandBox: this,
          menu: commandMenus[i][j],
          size: new Size(80, 32),
          position: new Position(j, i)
        });

        if (commandMenus[i][j].isSelected) {
          this.currentCommandMenuContext = contexts[i][j];
        }
      }
    }

    return contexts;
  }

  // オープンできるかどうか
  get canOpen() {
    if (this.viewState == 'opened' || this.commandMenu.commandBox.viewState != 'opened' || !this.commandMenu.isSelected) {
      return false;
    }
    return true;
  }

  get canSelectionChange() {
    // ビュー状態がclosedであればカット
    if (this.viewState == 'closed') {
      return false;
    }
    
    if (this.isChildOpened > 0) {
      return false;
    }

    return true;
  }
}