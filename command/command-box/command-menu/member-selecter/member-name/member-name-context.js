// コマンドメニューのコントローラー
class MemberNameContext {

  // コンストラクタ
  constructor(memberSelecter, menu, position) {
    // メンバーセレクター
    this.memberSelecter = memberSelecter;

    // 一コマのサイズと文字サイズ
    this.squareSize = memberSelecter.squareSize;
    this.textSize = memberSelecter.textSize;

    // コマンドメニュー名
    this.menuName = menu.commandName;

    // このメニューが選択されているかどうか
    this.isSelected = menu.isSelected;

    this.position = position;
    this.memberSelecterPosition = null;

    // コマンドメニューのサイズ
    this.size = new Size(80, 32);

    // 冒険のパーティ
    this.memberCharacters = this.memberSelecter.memberCharacters;

    this.memberSelecterContext = null;
    
    // メンバーセレクターコマンドかどうか
    this.isMemberSelectCommand = menu.isMemberSelectorCommand;
    
    // 「つよさ」コマンドの子のセレクターにはメンバーステータス
    if (menu.label == "status") {
      this.memberStatusContext = new MemberStatusContext(this);
    }

    // 「どうぐ」コマンドの子のセレクターにはツールリスト
    if (menu.label == "item") {
      this.itemListContext = new ItemListContext(this);
    }

    // 「まほう」コマンドの子のセレクターにはマジックリスト
    if (menu.label == "magic") {
      this.magicListContext = new MagicListContext(this);
    }

    // 「そうび」コマンドの子のセレクターにはエクイプメントリスト
    if (menu.label == "equipment") {
      console.log("そうび");
    }
  }
}
