// ------------------------------------------------------------------
// コマンドメニューのコンテキストクラス
// ------------------------------------------------------------------

class MenuContext {
  // コンストラクタ
  constructor(obj) {
    // 外部オブジェクトによる定義
    this.commandBox = obj.commandBox; // コマンドボックス
    this.menu = obj.menu; // メニュー
    this.position = obj.position; // ポジション
    this.size = obj.size; // サイズ
    this.label = obj.label; // ラベル

    // 町オブジェクト
    this.town = this.commandBox.town;

    // 一コマのサイズと文字サイズ
    this.squareSize = this.commandBox.squareSize;
    this.textSize = this.commandBox.textSize;

    // コマンドメニュー名
    this.menuName = this.menu.commandName;

    // このメニューが選択されているかどうか
    this.isSelected = this.menu.isSelected;

    this.memberSelecterPosition = null;
    this.isMemberSelectCommand = this.menu.isMemberSelectorCommand;

    // 冒険のパーティ
    this.memberCharacters = this.commandBox.memberCharacters;

    this.memberSelecterContext = null;

    if (this.label == 'first' && this.isMemberSelectCommand) {
      this.memberSelecterContext = new MemberSelectContext(this, new Position(0, 1));
      this.memberSelecterPosition = new Position(0, 0);
    }

    // 装備部位のコンテキスト
    if (this.label == 'equipment-select') {
      this.contexts = {
        'equipment-select': new SelectMenuContext(this, this.town, new Position(4, 0), [
          [
            new GameCommand("equip", "そうび", true, false),
          ],
          [
            new GameCommand("out", "はずす", false, false),
          ],
        ], 'equipselect'),
      };
    }

    if (this.menu.label == 'equipment' && this.label == 'equipment-item') {
      this.contexts = {
        'equipment-item': new EquipmentItemListContext(this),
      }
    }

    // 「はなす」コマンドの子のセレクターにはメンバーステータス
    if (this.menu.label == "door") {
      // サブコンテキスト
      this.textAreaContext = new TextAreaContext(this, this.zIndexBase, new Position(5, 11));
    }

    // 「はなす」コマンドの子のセレクターにはメンバーステータス
    if (this.menu.label == "map") {
      // サブコンテキスト
      this.textAreaContext = new TextAreaContext(this, this.zIndexBase, new Position(5, 11));
    }

    // 「はなす」コマンドの子のセレクターにはメンバーステータス
    if (this.menu.label == "search") {
      // サブコンテキスト
      this.textAreaContext = new TextAreaContext(this, this.zIndexBase, new Position(5, 11));
    }

    // 「はなす」コマンドの子のセレクターにはメンバーステータス
    if (this.menu.label == "talk") {
      // サブコンテキスト
      this.textAreaContext = new TextAreaContext(this, this.zIndexBase, new Position(5, 11));
    }

    // 「つよさ」コマンドの子のセレクターにはメンバーステータス
    if (this.label != 'first' && this.isMemberSelectCommand && this.menu.label == "status") {
      this.memberStatusContext = new MemberStatusContext(this);
    }

    // 「どうぐ」コマンドの子のセレクターにはツールリスト
    if (this.label != 'first' && this.menu.label == "item") {
      this.itemListContext = new ItemListContext(this);
    }

    // 「まほう」コマンドの子のセレクターにはマジックリスト
    if (this.label != 'first' && this.menu.label == "magic") {
      this.magicListContext = new MagicListContext(this);
    }

    // 「そうび」コマンドの子のセレクターにはエクイプメントリスト
    if (this.label != 'first' && this.menu.label == 'equipment' && this.label != 'equipment-select' && this.label != 'equipment-item') {
      this.equipmentPartsContext = new EquipmentPartListContext(this);
    }
  }
}
