// コマンドメニューのコントローラー
class CommandMenuContext {

  // コンストラクタ
  constructor(commandBox, menu, position) {
    // コマンドボックス
    this.commandBox = commandBox;

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
    this.size = new Size(80, 32);

    // 冒険のパーティ
    this.memberCharacters = this.commandBox.memberCharacters;

    this.memberSelecterContext = null;
    
    // メンバーセレクターメニューであれば、メンバーセレクターを生成
    if (this.isMemberSelectCommand) {
      this.memberSelecterContext = new MemberSelecterContext(this);
      this.memberSelecterPosition = new Position(0, 0);
    }
  }
}
