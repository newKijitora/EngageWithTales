// キャラクターセレクタ―のコントローラークラス
class MemberSelecterController extends Controller {
  // コンストラクタ
  constructor(context) { super();
    this.context = context;

    this.openKey = new Key(74, "keyup");
    this.closeKey = new Key(75, "keyup");

    this.title = this.context.menuName;

    this.state = "closed";
    this.characters = this.context.characters;

    this.memberStatusController = new MemberStatusController(this);
    this.isChildOpened = false;
  }

  // オープンできるかどうか
  get canOpen() {
    if (this.state == "opened" || !this.context.isSelected) {
      return false;
    }
    return true;
  }

  // クローズできるかどうか
  get canClose() {
    if (this.state == "closed" || this.isChildOpened) {
      this.isChildOpened = false;
      return false;
    }
    return true;
  }
}