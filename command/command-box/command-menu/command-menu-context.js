// コマンドメニューのコントローラー
class CommandMenuContext extends CommandMenuContextBase {

  // コンストラクタ
  constructor(commandBox, menu, size, position) { super(commandBox, menu, size, position);
    // メンバーセレクターメニューであれば、メンバーセレクターを生成
    if (this.isMemberSelectCommand) {
      this.memberSelecterContext = new MemberSelectContext(this);
      this.memberSelecterPosition = new Position(0, 0);
    }
  }
}
