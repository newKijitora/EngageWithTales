// コマンドメニューのコントローラー
class MemberNameContext extends CommandMenuContextBase {

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
      this.itemListContext = new ItemListContext(this);
    }

    // 「まほう」コマンドの子のセレクターにはマジックリスト
    if (menu.label == "magic") {
      this.magicListContext = new MagicListContext(this);
    }

    // 「そうび」コマンドの子のセレクターにはエクイプメントリスト
    if (menu.label == "equipment") {
      this.equipmentPartsContext = new EquipmentPartsContext(this);
    }
  }
}
