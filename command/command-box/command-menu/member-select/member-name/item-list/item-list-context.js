// ------------------------------------------------------------------
// アイテムリストのコンテキスト
// ------------------------------------------------------------------

class ItemListContext extends CommandBoxContextBase {
  
  // コンストラクタ
  constructor(memberName) { super(memberName.memberSelecter.commandMenu.commandBox.town);
    // 親コンテキスト：メンバーネーム
    this.memberName = memberName;

    // アイテムリストの左上位置
    this.itemListPosition = new Position(6, -2);

    // メニューの名前
    this.title = this.memberName.menuName;
    this.maxTitleLength = 8;

    // どうぐのリスト
    for (let i = 0; i < this.memberName.memberSelecter.memberCharacters.length; i++) {
      if (this.memberName.memberSelecter.memberCharacters[i].name == this.title) {
        this.items = this.memberName.memberSelecter.memberCharacters[i].items;
      }
    }

    // コマンドフレームのサイズ
    this.commandBoxRows = this.items.length + 1;
    this.commandBoxColumns = (this.maxTitleLength / 2) + 2; // 変数を検討（+2 はコマンドポインターの分）

    // 子要素が開いているかどうか
    this.isChildOpened = false;

    // コマンドのメニュー（どうぐの名前で生成）
    this.commandMenus = new Array(this.items.length);

    for (let i = 0; i < this.commandMenus.length; i++) {
      this.commandMenus[i] = new Array(1);
      for (let j = 0; j < this.commandMenus[i].length; j++) {
        let isSelected = false;
        if (i == 0) { // 初回は先頭のアイテムが選択状態
          isSelected = true;
        }

        this.commandMenus[i][j] = new GameCommand("", this.items[i].name, isSelected, false);
      }
    }

    // コマンドメニューのコンテキストを生成する
    this.memberNameContexts = new Array(this.commandMenus.length);

    for (let i = 0; i < this.memberNameContexts.length; i++) {
      this.memberNameContexts[i] = new Array(this.commandMenus[i].length);
      for (let j = 0; j < this.memberNameContexts[i].length; j++) {
        this.memberNameContexts[i][j] = new ItemNameContext(this, this.commandMenus[i][j], new Position(j, i));
        
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
    if (this.memberName.memberSelecter.commandMenu.commandBox.subContexts['text-area'].viewState == "opened") {
      return false;
    }

    return true;
  }
}