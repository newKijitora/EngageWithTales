// ------------------------------------------------------------------
// 装備候補リストのコンテキスト
// ------------------------------------------------------------------

class EquipmentItemListContext extends CommandBoxContextBase {
  
  // コンストラクタ
  constructor(commandMenu) { super(commandMenu, commandMenu.town);
    // アイテムリストの左上位置
    this.itemListPosition = new Position(5, -3);

    // メニューの名前
    this.title = this.commandMenu.commandBox.commandMenu.menuName;
    this.maxTitleLength = 8;

    // どうぐのリスト
    for (let i = 0; i < this.commandMenu.commandBox.memberCharacters.length; i++) {
      if (this.commandMenu.commandBox.memberCharacters[i].name == this.title) {
        this.items = this.commandMenu.commandBox.memberCharacters[i].items;
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

        this.commandMenus[i][j] = new GameCommand('equipment', this.items[i].name, isSelected, false);
      }
    }

    // コマンドメニューのコンテキストを生成する
    this.memberNameContexts = this.createMenus2(this.commandMenus);
  }

  // オープンできるかどうか
  get canOpen() {
    if (this.viewState == 'opened' || this.commandMenu.commandBox.viewState != 'opened' || !this.commandMenu.isSelected) {
      return false;
    }
    return true;
  }

  // クローズできるかどうか
  get canClose() {
    
    if (this.viewState == 'closed' || this.isChildOpened) {
      this.isChildOpened = false;
      return false;
    }
    return true;
  }

  get canSelectionChange() {
    // ビュー状態がclosedであればカット
    if (this.viewState == 'closed') {
      return false;
    }
    
    if (this.isChildOpened) {
      return false;
    }

    // テキストエリアのビュー状態がopenedであればカット
    if (this.commandMenu.commandBox.commandMenu.commandBox.commandMenu.commandBox.subContexts['text-area'].viewState == 'opened') {
      return false;
    }

    return true;
  }
}