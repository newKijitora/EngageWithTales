// コマンドメニューのコントローラー
class CommandMenuContext {
  // コンストラクタ
  constructor(context, menuName, isSelected, isMemberSelectCommand, position) {
    this.context = context;
    this.characters = this.context.textTextures;

    this.menuName = menuName;
    this.isSelected = isSelected;
    this.isMemberSelectCommand = isMemberSelectCommand;
    this.position = position;
    this.memberSelecterPosition = null;
    this.size = new Size(80, 32);

    this.characters = this.context.characters;

    this.memberSelecterController = null;
    
    if (isMemberSelectCommand) {
      this.memberSelecterController = new MemberSelecterContext(this);
      this.memberSelecterPosition = new Position(this.position.x == 0 ? -5 : 0, 0);
    }
  }
}
