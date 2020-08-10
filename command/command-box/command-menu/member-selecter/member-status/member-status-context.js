// メンバーステータスのコントローラークラス
class MemberStatusContext {
  // コンストラクタ
  constructor(memberSelecter) {
    this.memberSelecter = memberSelecter;

    this.openKey = new Key(74, "keyup");
    this.closeKey = new Key(75, "keyup");

    this.memberCharacters = this.memberSelecter.memberCharacters;
    this.state = "closed";
  }

  // オープンできるかどうか
  get canOpen() {
    if (this.state == "opened"|| this.memberSelecter.state != "opened") {
      return false;
    }
    return true;
  }

  // クローズできるかどうか
  get canClose() {
    if (this.state == "closed") {
      return false;
    }
    return true;
  }
}