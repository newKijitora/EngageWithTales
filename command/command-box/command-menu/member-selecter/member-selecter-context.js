// ------------------------------------------------------------------
// メンバーセレクターのコンテキスト
// ------------------------------------------------------------------

class MemberSelecterContext extends KeyManageContext {
  
  // コンストラクタ
  constructor(commandMenu) { super(commandMenu.commandBox.town);
    // コマンドメニュー
    this.commandMenu = commandMenu;

    // 一コマのサイズと文字サイズ
    this.squareSize = commandMenu.squareSize;
    this.textSize = commandMenu.textSize;

    // キー
    this.openKey = commandMenu.commandBox.openKey;
    this.closeKey = commandMenu.commandBox.closeKey;

    // コマンドボックスの左上位置
    this.memberSelecterPosition = new Position(0, 1);

    // メニューの名前
    this.title = this.commandMenu.menu.name;

    // メンバーセレクターの背景色
    this.backgroundColor = this.commandMenu.commandBox.backgroundColor;

    // 初期ステータス
    this.viewState = "closed";

    // 冒険のパーティ
    this.memberCharacters = this.commandMenu.memberCharacters;

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

    this.currentCommandMenu = null;

    // コマンドフレームのサイズ
    this.commandBoxRows = this.memberCharacters.length + 1;
    this.commandBoxColumns = 4; // 変数を検討

    //this.memberStatusController = new MemberStatusContext(this);
    this.isChildOpened = false;

    // コマンドメニューのコンテキストを生成する
    this.memberNameContexts = new Array(this.commandMenus.length);

    for (let i = 0; i < this.memberNameContexts.length; i++) {
      this.memberNameContexts[i] = new Array(this.commandMenus[i].length);
      for (let j = 0; j < this.memberNameContexts[i].length; j++) {
        this.memberNameContexts[i][j] = new MemberNameContext(this, this.commandMenus[i][j], new Position(j, i));
        
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
    if (this.commandMenu.commandBox.textAreaContext.viewState == "opened") {
      return false;
    }

    return true;
  }
}