// ------------------------------------------------------------------
// 装備品目のアイテム名リストのコンテキスト
// ------------------------------------------------------------------

class EquipmentItemListContext extends SelectMenuContext {
  
  // コンストラクタ
  constructor(commandMenu) { super(commandMenu, commandMenu.town);
    // メニューの名前
    this.title = this.commandMenu.commandBox.commandMenu.menuName;

    // 装備品目のアイテム名のリスト
    this.items = null;

    for (let i = 0; i < this.memberCharacters.length; i++) {
      if (this.memberCharacters[i].name == this.title) {
        this.items = this.memberCharacters[i].items;
      }
    }

    //  装備品目のアイテム名のリストからコンテキストを生成する
    this.commandMenus = this.createMenus(this.items);
    this.commandMenuContexts = this.createMenuContexts(this.commandMenus);

    this.maxTitleLength = 8;

    // コマンドフレームのサイズ
    // コマンドボックスのサイズ（行数）
    this.commandBoxRows = this.commandMenus.length + 1;
    this.commandBoxColumns = (this.maxTitleLength / 2) + 2; // 変数を検討（+2 はコマンドポインターの分）

    // アイテムリストの左上位置
    this.itemListPosition = new Position(5, -3);

    // 子要素が開いているかどうか
    this.isChildOpened = false;
  }

  // 装備品目のアイテム名のリストを生成する
  createMenus(items) {
    const menus = new Array(items.length);

    for (let i = 0; i < menus.length; i++) {
      menus[i] = new Array(1);
      for (let j = 0; j < menus[i].length; j++) {
        let isSelected = false;

        if (i == 0) { // 初回は先頭のアイテムが選択状態
          isSelected = true;
        }

        menus[i][j] = new GameCommand('equipment', items[i].name, isSelected, false);
      }
    }

    return menus;
  }

  // 装備品目のアイテム名のリストをもとにコンテキストを生成する
  createMenuContexts(commandMenus) {
    const contexts = new Array(commandMenus.length);

    for (let i = 0; i < contexts.length; i++) {
      contexts[i] = new Array(commandMenus[i].length);
      for (let j = 0; j < contexts[i].length; j++) {
        contexts[i][j] = new EquipmentItemNameContext({
          commandBox: this,
          menu: commandMenus[i][j],
          size: new Size(80, 32),
          position: new Position(j, i),
          label: 'equipment-select',
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