// ------------------------------------------------------------------
// コマンドメニューのコンテキストクラス
// ------------------------------------------------------------------

class CommandMenuContext {

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
      this.memberSelecterContext = new MemberSelectContext(this);
      this.memberSelecterPosition = new Position(0, 0);
    }

    if (this.label == 'equipment-select') {
      this.contexts = {
        'equipment-select': new EquipmentSelectorContext(this),
      };
    }

    if (this.menu.label == 'equipment' && this.label == 'equipment-item') {
      this.contexts = {
        'equipment-item': new EquipmentItemListContext(this),
      }
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
      this.equipmentPartsContext = new EquipmentPartsContext(this);
    }
  }
}
