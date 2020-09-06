// ------------------------------------------------------------------
// 装備部位のコンテキスト
// ------------------------------------------------------------------

class EquipmentPartsContext extends CommandBoxContextBase {
  
  // コンストラクタ
  constructor(memberName) { super(memberName.town);
    // 親コンテキスト：メンバーネーム
    this.memberName = memberName;

    // アイテムリストの左上位置
    this.itemListPosition = new Position(4, 0);

    // メニューの名前
    this.title = this.memberName.menuName;
    this.maxTitleLength = 4;

    // コマンドのメニュー
    this.commandMenus = [
      [
        // new Command(label, commandName, isSelected, isMemberSelector);
        new GameCommand("equipment", "ぶき", true, false),
      ],
      [
        new GameCommand("equipment", "ぼうぐ", false, true),
      ],
      [
        new GameCommand("equipment", "たて", false, true),
      ],
      [
        new GameCommand("equipment", "あたま", false, false),
      ]
    ];

    // コマンドフレームのサイズ
    this.commandBoxColumns = (this.maxTitleLength / 2) + 2; // 変数を検討（+2 はコマンドポインターの分）

    // 子要素が開いているかどうか
    this.isChildOpened = false;

    // コマンドメニューのコンテキストを生成する
    this.equipmentNameContexts = new Array(this.commandMenus.length);

    for (let i = 0; i < this.equipmentNameContexts.length; i++) {
      this.equipmentNameContexts[i] = new Array(this.commandMenus[i].length);
      for (let j = 0; j < this.equipmentNameContexts[i].length; j++) {
        this.equipmentNameContexts[i][j] = new EquipmentNameContext(this, this.commandMenus[i][j], new Position(j, i));
        

        if (this.commandMenus[i][j].isSelected) {
          this.currentCommandMenu = this.equipmentNameContexts[i][j];
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