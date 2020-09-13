// ------------------------------------------------------------------
// 装備部位のコンテキスト
// ------------------------------------------------------------------

class EquipmentPartsContext extends CommandBoxContextBase {
  
  // コンストラクタ
  constructor(commandMenu) { super(commandMenu, commandMenu.town);
    // アイテムリストの左上位置
    this.itemListPosition = new Position(4, 0);

    // メニューの名前
    this.title = this.commandMenu.menuName;
    this.maxTitleLength = 4;

    this.commandMenus = this.town.equipmentCommandMenus;
    
    // コマンドフレームのサイズ
    this.commandBoxColumns = (this.maxTitleLength / 2) + 2; // 変数を検討（+2 はコマンドポインターの分）

    // 子要素が開いているかどうか
    this.isChildOpened = false;

    // コマンドメニューのコンテキストを生成する
    this.equipmentNameContexts = this.createMenus3(this.commandMenus);
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