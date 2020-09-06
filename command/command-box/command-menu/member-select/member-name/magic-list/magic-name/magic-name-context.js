// コマンドメニューのコントローラー
class MagicNameContext extends CommandMenuContextBase {

  // コンストラクタ
  constructor(memberSelecter, menu, size, position) { super(memberSelecter, menu, size, position);
    // メンバーセレクター
    this.memberSelecter = memberSelecter;

    // コマンドメニュー名
    this.menuName = menu.commandName;

    this.memberSelecterPosition = null;

    this.memberSelecterContext = null;
    
    // 「つよさ」コマンドの子のセレクターにはメンバーステータス
    if (menu.label == "status") {
      this.memberStatusContext = new MemberStatusContext(this);
    }

    // 「どうぐ」コマンドの子のセレクターにはツールリスト
    if (menu.label == "item") {
      this.itemListContext = new ToolListContext(this);
    }

    // 「まほう」コマンドの子のセレクターにはマジックリスト
    if (menu.label == "magic") {
      console.log("まほう");
    }

    // 「そうび」コマンドの子のセレクターにはエクイプメントリスト
    if (menu.label == "equipment") {
      console.log("そうび");
    }
  }
}
