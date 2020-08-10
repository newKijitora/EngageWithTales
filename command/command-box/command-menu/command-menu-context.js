// コマンドメニューのコントローラー
class CommandMenuContext {

  // コンストラクタ
  constructor(commandBox, menuName, isSelected, isMemberSelectCommand, position) {
    // コマンドボックス
    this.commandBox = commandBox;

    // コマンドメニュー名
    this.menuName = menuName;

    // このメニューが選択されているかどうか
    this.isSelected = isSelected;

    this.position = position;
    this.memberSelecterPosition = null;

    // コマンドメニューのサイズ
    this.size = new Size(80, 32);

    // 冒険のパーティ
    this.memberCharacters = this.commandBox.memberCharacters;

    this.memberSelecterContext = null;
    
    // メンバーセレクターコマンドかどうか
    this.isMemberSelectCommand = isMemberSelectCommand;
    
    // メンバーセレクターメニューであれば、メンバーセレクターを生成
    if (this.isMemberSelectCommand) {
      this.memberSelecterContext = new MemberSelecterContext(this);
      this.memberSelecterPosition = new Position(0, 0);
    }
  }
}
