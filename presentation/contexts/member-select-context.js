// ------------------------------------------------------------------
// メンバーセレクターのコンテキスト
// ------------------------------------------------------------------

class MemberSelectContext extends SelectMenuContext {
  
  // コンストラクタ
  constructor(menu, position) { super(menu, menu.town, position);
    // メニューの名前
    this.title = this.commandMenu.menu.name;

    // コマンドのメニュー（冒険のパーティの名前で生成）
    this.commandMenus = new Array(this.memberCharacters.length);

    for (let i = 0; i < this.commandMenus.length; i++) {
      this.commandMenus[i] = new Array(1);
      for (let j = 0; j < this.commandMenus[i].length; j++) {
        let isSelected = false;
        if (i == 0) {
          isSelected = true;
        }

        this.commandMenus[i][j] = new GameCommand(this.commandMenu.menu.label, this.memberCharacters[i].name, isSelected, false);
      }
    }

    // コマンドフレームのサイズ
    this.commandBoxRows = this.memberCharacters.length + 1;
    this.commandBoxColumns = 4; // 変数を検討

    // メンバー名のコンテキストを生成する
    this.memberNameContexts = new Array(this.commandMenus.length);

    for (let i = 0; i < this.memberNameContexts.length; i++) {
      this.memberNameContexts[i] = new Array(this.commandMenus[i].length);
      for (let j = 0; j < this.memberNameContexts[i].length; j++) {
        this.memberNameContexts[i][j] = new MemberNameContext({
          commandBox: this,
          menu: this.commandMenus[i][j],
          size: new Size(80, 32),
          position: new Position(j, i),
        });
        
        if (this.commandMenus[i][j].isSelected) {
          this.currentCommandMenu = this.memberNameContexts[i][j];
        }
      }
    }
  }

  // オープンできるかどうか
  get canOpen() {
    if (this.viewState == "opened" || !this.commandMenu.isSelected) {
      return false;
    }

    return true;
  }

  get canSelectionChange() {
    if (this.currentCommandMenu.equipmentPartsContext && this.currentCommandMenu.equipmentPartsContext.isChildOpened > 0) {
      return false;
    }

    // ビュー状態がclosedであればカット
    if (this.viewState == "closed") {
      return false;
    }
    
    if (this.isChildOpened) {
      return false;
    }

    // テキストエリアのビュー状態がopenedであればカット
    // if (this.commandMenu.commandBox.subContexts['text-area'].viewState == "opened") {
    //   return false;
    // }

    return true;
  }
}
