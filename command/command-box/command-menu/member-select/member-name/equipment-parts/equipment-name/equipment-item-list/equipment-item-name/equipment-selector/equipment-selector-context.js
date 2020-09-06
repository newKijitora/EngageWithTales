// ------------------------------------------------------------------
// 装備部位のコンテキスト
// ------------------------------------------------------------------

class EquipmentSelectorContext extends KeyManageContext {

  // コンストラクタ
  constructor(memberName) { super(memberName.memberSelecter.memberName.memberSelecter.memberName.memberSelecter.commandMenu.commandBox.town);
    // 親コンテキスト：メンバーネーム
    this.memberName = memberName;

    // 一コマのサイズ
    this.squareSize = this.memberName.squareSize;

    // 文字のサイズ
    this.textSize = this.memberName.textSize;

    // キー
    this.openKey = memberName.memberSelecter.openKey;
    this.closeKey = memberName.memberSelecter.closeKey;

    // アイテムリストの左上位置
    this.itemListPosition = new Position(4, 0);

    this.memberCharacters = memberName.memberSelecter.memberCharacters;

    // メニューの名前
    this.title = this.memberName.menuName;
    this.maxTitleLength = 4;

    // アイテムリストの背景色
    this.backgroundColor = this.memberName.memberSelecter.backgroundColor;

    // 初期ステータス
    this.viewState = "closed";

    // 選択中のコマンドメニュー
    this.currentCommandMenu = null;

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
    this.commandBoxRows = this.commandMenus.length + 1;
    this.commandBoxColumns = (this.maxTitleLength / 2) + 2; // 変数を検討（+2 はコマンドポインターの分）

    // 子要素が開いているかどうか
    this.isChildOpened = false;

    // コマンドメニューのコンテキストを生成する
    this.equipmentNameContexts = new Array(this.commandMenus.length);

    for (let i = 0; i < this.equipmentNameContexts.length; i++) {
      this.equipmentNameContexts[i] = new Array(this.commandMenus[i].length);
      for (let j = 0; j < this.equipmentNameContexts[i].length; j++) {
        this.equipmentNameContexts[i][j] = new EquipmentSelectMenuContext(this, this.commandMenus[i][j], new Position(j, i));
        

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
    if (this.memberName.memberSelecter.commandMenu.commandBox.textAreaContext.viewState == "opened") {
      return false;
    }

    return true;
  }
}