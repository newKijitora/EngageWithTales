// ------------------------------------------------------------------
// コマンドメニューのコンテキスト基底クラス
// ------------------------------------------------------------------

class CommandMenuContextBase {

  // コンストラクタ
  constructor(commandBox, menu, size, position) {
    // コマンドボックス
    this.commandBox = commandBox;

    // 町オブジェクト
    this.town = this.commandBox.town;

    // 一コマのサイズと文字サイズ
    this.squareSize = this.commandBox.squareSize;
    this.textSize = this.commandBox.textSize;
    this.menu = menu;

    // コマンドメニュー名
    this.menuName = menu.commandName;

    // このメニューが選択されているかどうか
    this.isSelected = menu.isSelected;

    this.position = position;
    this.memberSelecterPosition = null;
    this.isMemberSelectCommand = menu.isMemberSelectorCommand;

    // コマンドメニューのサイズ
    this.size = size;

    // 冒険のパーティ
    this.memberCharacters = this.commandBox.memberCharacters;

    this.memberSelecterContext = null;

    this.contexts = {};
  }
}
