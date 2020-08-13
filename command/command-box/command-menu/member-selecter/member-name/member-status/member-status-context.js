// メンバーステータスのコントローラークラス
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
    this.viewState = "closed";

    this.memberSelecter = this.memberName.memberSelecter;
  }

  // オープンできるかどうか
  get canOpen() {
    if (this.viewState == "opened"|| this.memberSelecter.viewState != "opened") {
      return false;
    }

    return true;
  }

  // クローズできるかどうか
  get canClose() {
    if (this.viewState == "closed") {
      return false;
    }

    return true;
  }
}