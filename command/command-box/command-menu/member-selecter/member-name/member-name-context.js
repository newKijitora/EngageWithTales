// コマンドメニューのコントローラー
class MemberNameContext {

  // コンストラクタ
  constructor(memberSelecter, menuName, isSelected, isMemberSelectCommand, position) {
    // メンバーセレクター
    this.memberSelecter = memberSelecter;

    // 一コマのサイズと文字サイズ
    this.squareSize = memberSelecter.squareSize;
    this.textSize = memberSelecter.textSize;

    // コマンドメニュー名
    this.menuName = menuName;

    // このメニューが選択されているかどうか
    this.isSelected = isSelected;

    this.position = position;
    this.memberSelecterPosition = null;

    // コマンドメニューのサイズ
    this.size = new Size(80, 32);

    // 冒険のパーティ
    this.memberCharacters = this.memberSelecter.memberCharacters;

    this.memberSelecterContext = null;
    
    // メンバーセレクターコマンドかどうか
    this.isMemberSelectCommand = isMemberSelectCommand;
    
    this.memberStatusContext = new MemberStatusContext(this);
  }
}
