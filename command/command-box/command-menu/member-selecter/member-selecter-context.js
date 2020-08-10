// キャラクターセレクタ―のコントローラークラス
class MemberSelecterContext extends Context {
  
  // コンストラクタ
  constructor(commandMenu) { super();
    // コマンドメニュー
    this.commandMenu = commandMenu;

    // 一コマのサイズと文字サイズ
    this.squareSize = commandMenu.commandBox.squareSize;
    this.textSize = commandMenu.commandBox.textSize;

    // キー
    this.openKey = commandMenu.commandBox.openKey;
    this.closeKey = commandMenu.commandBox.closeKey;

    // メニューの名前
    this.title = this.commandMenu.menuName;

    // メンバーセレクターの背景色
    this.backgroundColor = this.commandMenu.commandBox.backgroundColor;

    // 初期ステータス
    this.viewState = "closed";

    // 冒険のパーティ
    this.memberCharacters = this.commandMenu.memberCharacters;

    // コマンドのメニュー（冒険のパーティの名前で生成）
    this.commandMenus = new Array(this.memberCharacters.length);

    for (let i = 0; i < this.commandMenus.length; i++) {
      this.commandMenus[i] = new Array(1);
      for (let j = 0; j < this.commandMenus[i].length; j++) {
        let isSelected = false;
        if (i == 0) {
          isSelected = true;
        }

        this.commandMenus[i][j] = [this.memberCharacters[i].name, isSelected, false];
      }
    }

    // キー
    this.leftKey = new Key(this.commandMenu.commandBox.town.settings.keyCodes["left"], "left", "keyup");
    this.rightKey = new Key(this.commandMenu.commandBox.town.settings.keyCodes["right"], "right", "keyup");
    this.bottomKey = new Key(this.commandMenu.commandBox.town.settings.keyCodes["bottom"], "bottom", "keyup");
    this.topKey = new Key(this.commandMenu.commandBox.town.settings.keyCodes["top"], "top", "keyup");
    this.openKey = new Key(this.commandMenu.commandBox.town.settings.keyCodes["open"], "open", "keyup");
    this.closeKey = new Key(this.commandMenu.commandBox.town.settings.keyCodes["close"], "close", "keyup");
    
    // 方向ごとの進み具合
    this.destinations = {
      "top": new Destination(-1, 0),
      "left": new Destination(0, -1),
      "right": new Destination(0, 1),
      "bottom": new Destination(1, 0),
    };

    this.currentCommandMenu = null;

    // コマンドフレームのサイズ
    this.commandBoxRows = this.memberCharacters.length + 1;
    this.commandBoxColumns = 4; // 変数を検討

    //this.memberStatusController = new MemberStatusContext(this);
    this.isChildOpened = false;

    // コマンドメニューのコンテキストを生成する
    this.commandMenuContexts = new Array(this.commandMenus.length);

    for (let i = 0; i < this.commandMenuContexts.length; i++) {
      this.commandMenuContexts[i] = new Array(this.commandMenus[i].length);
      for (let j = 0; j < this.commandMenuContexts[i].length; j++) {
        const commandMenuName = this.commandMenus[i][j][0];
        const isSelected = this.commandMenus[i][j][1];
        const isMemberSelectCommand = this.commandMenus[i][j][2];
        const position = new Position(j, i);

        this.commandMenuContexts[i][j] = new CommandMenuContext(this, commandMenuName, isSelected, isMemberSelectCommand, position);
        
        if (isSelected) {
          this.currentCommandMenu = this.commandMenuContexts[i][j];
        }
      }
    }
  }

  // オープンできるかどうか
  get canOpen() {
    if (this.viewState == "opened" || !this.commandMenu.isSelected) {
      return false;
    }
    return true;
  }

  // クローズできるかどうか
  get canClose() {
    if (this.viewState == "closed" || this.isChildOpened) {
      this.isChildOpened = false;
      return false;
    }
    return true;
  }

  get canSelectionChange() {
    // ビュー状態がclosedであればカット
    if (this.viewState == "closed") {
      return false;
    }
    
    // テキストエリアのビュー状態がopenedであればカット
    if (this.commandMenu.commandBox.textAreaContext.viewState == "opened") {
      return false;
    }

    return true;
  }
}