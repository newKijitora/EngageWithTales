// ------------------------------------------------------------------
// マジックリストのコンテキスト
// ------------------------------------------------------------------

class MagicListContext extends CommandBoxContextBase {
  
  // コンストラクタ
  constructor(commandMenu) { super(commandMenu, commandMenu.town);
    // メンバーネーム
    this.commandMenu = commandMenu;

    // コマンドボックスの左上位置
    this.itemListPosition = new Position(6, -1);

    // メニューの名前
    this.title = this.commandMenu.menuName;

    // どうぐのリスト
    for (let i = 0; i < this.commandMenu.commandBox.memberCharacters.length; i++) {
      if (this.commandMenu.commandBox.memberCharacters[i].name == this.title) {
        this.magics = this.commandMenu.commandBox.memberCharacters[i].magics;
      }
    }

    // コマンドのメニュー（冒険のパーティの名前で生成）
    this.commandMenus = new Array(this.magics.length);

    for (let i = 0; i < this.commandMenus.length; i++) {
      this.commandMenus[i] = new Array(1);
      for (let j = 0; j < this.commandMenus[i].length; j++) {
        let isSelected = false;
        if (i == 0) {
          isSelected = true;
        }

        this.commandMenus[i][j] = new GameCommand("", this.magics[i].name, isSelected, false);
      }
    }

    this.currentCommandMenu = null;

    // コマンドフレームのサイズ
    this.commandBoxRows = this.magics.length + 1;
    this.commandBoxColumns = 6; // 変数を検討

    //this.memberStatusController = new MemberStatusContext(this);
    this.isChildOpened = false;

    // コマンドメニューのコンテキストを生成する
    this.memberNameContexts = new Array(this.commandMenus.length);

    for (let i = 0; i < this.memberNameContexts.length; i++) {
      this.memberNameContexts[i] = new Array(this.commandMenus[i].length);
      for (let j = 0; j < this.memberNameContexts[i].length; j++) {
        this.memberNameContexts[i][j] = new CommandMenuContext({
          commandBox: this,
          menu: this.commandMenus[i][j],
          size: this.menuSize,
          position: new Position(j, i)
        });
        
        if (this.commandMenus[i][j].isSelected) {
          this.currentCommandMenu = this.memberNameContexts[i][j];
        }
      }
    }
  }

  // オープンできるかどうか
  get canOpen() {
    if (this.viewState == "opened" || this.commandMenu.commandBox.viewState != "opened" || !this.commandMenu.isSelected) {
      return false;
    }
    return true;
  }

  // クローズできるかどうか
  get canClose() {
    
    if (this.viewState == "closed" || this.isChildOpened) {
      this.isChildOpened = false;
      return false;
    }
    return true;
  }

  get canSelectionChange() {
    // ビュー状態がclosedであればカット
    if (this.viewState == "closed") {
      return false;
    }
    
    if (this.isChildOpened) {
      return false;
    }

    // テキストエリアのビュー状態がopenedであればカット
    if (this.commandMenu.commandBox.commandMenu.commandBox.subContexts['text-area'].viewState == "opened") {
      return false;
    }

    return true;
  }
}