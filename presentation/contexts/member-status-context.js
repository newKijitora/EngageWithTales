// ------------------------------------------------------------------
// メンバーのステータスのコンテキストクラス
// ------------------------------------------------------------------

class MemberStatusContext {
  // コンストラクタ
  constructor(memberName) {
    this.memberName = memberName;

    // 一コマのサイズと文字サイズ
    this.squareSize = this.memberName.squareSize;
    this.textSize = this.memberName.textSize;

    this.openKey = new Key(74, "keyup");
    this.closeKey = new Key(75, "keyup");

    this.memberCharacters = this.memberName.memberCharacters;

    this.memberSelecter = this.memberName.commandBox;

    this.canSelectionChange = false;
  }

  // オープンできるかどうか
  get canOpen() {
    if (this.viewState == "opened" || this.memberSelecter.viewState != "opened") {
      return false;
    }

    return true;
  }
}