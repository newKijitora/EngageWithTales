// メンバーステータスのコントローラークラス
class MemberStatusController {
  // コンストラクタ
  constructor(context) {
    this.context = context;

    this.openKey = new Key(74, "keyup");
    this.closeKey = new Key(75, "keyup");

    this.characters = this.context.characters;
    this.state = "closed";
  }

  // オープンできるかどうか
  get canOpen() {
    if (this.state == "opened"|| this.context.state != "opened") {
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