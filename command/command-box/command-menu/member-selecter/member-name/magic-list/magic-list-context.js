// ------------------------------------------------------------------
// マジックリストのコンテキスト
// ------------------------------------------------------------------

class MagicListContext extends KeyManageContext {
  
  // コンストラクタ
  constructor(memberName) { super(memberName.memberSelecter.commandMenu.commandBox.town);
    // メンバーネーム
    this.memberName = memberName;

    // 一コマのサイズと文字サイズ
    this.squareSize = memberName.squareSize;
    this.textSize = memberName.textSize;

    // キー
    this.openKey = memberName.memberSelecter.openKey;
    this.closeKey = memberName.memberSelecter.closeKey;

    // コマンドボックスの左上位置
    this.itemListPosition = new Position(7, -1);

    // メニューの名前
    this.title = this.memberName.menuName;

    // メンバーセレクターの背景色
    this.backgroundColor = this.memberName.memberSelecter.backgroundColor;

    // 初期ステータス
    this.viewState = "closed";

    // どうぐのリスト
    for (let i = 0; i < this.memberName.memberSelecter.memberCharacters.length; i++) {
      if (this.memberName.memberSelecter.memberCharacters[i].name == this.title) {
        this.magics = this.memberName.memberSelecter.memberCharacters[i].magics;
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
    this.commandBoxColumns = 5; // 変数を検討

    //this.memberStatusController = new MemberStatusContext(this);
    this.isChildOpened = false;

    // コマンドメニューのコンテキストを生成する
    this.memberNameContexts = new Array(this.commandMenus.length);

    for (let i = 0; i < this.memberNameContexts.length; i++) {
      this.memberNameContexts[i] = new Array(this.commandMenus[i].length);
      for (let j = 0; j < this.memberNameContexts[i].length; j++) {
        this.memberNameContexts[i][j] = new MagicNameContext(this, this.commandMenus[i][j], new Position(j, i));
        
        if (this.commandMenus[i][j].isSelected) {
          this.currentCommandMenu = this.memberNameContexts[i][j];
        }
      }
    }
  }

  // オープンできるかどうか
  get canOpen() {
    if (this.viewState == "opened" || this.memberName.memberSelecter.viewState != "opened" || !this.memberName.isSelected) {
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
    if (this.memberName.memberSelecter.commandMenu.commandBox.textAreaContext.viewState == "opened") {
      return false;
    }

    return true;
  }
}