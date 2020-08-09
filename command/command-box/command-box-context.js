// コマンドボックスのコントローラー
// コマンド関連オブジェクトのルート
class CommandBoxContext extends Context {

  constructor(town, zIndexBase) { super();
    // コンテキスト
    this.town = town;

    // 一コマのサイズ
    this.squareSize = town.settings.squareSize;

    this.menus = [
      ["はなす", "じゅもん"],
      ["つよさ", "どうぐ"],
      ["そうび", "しらべる"]
    ];

    // 文字のテクスチャー
    this.textures = this.town.textTextures;
    this.commandTextures = this.town.resource.commandTextures;

    // テキストのスピード
    this.textSpeed = town.settings.textSpeed;

    this.textTextures = this.town.resource.characters;

    this.mojis = this.town.resource.textElements;

    // ビューの状態
    this.viewState = "closed";
    this.zIndexBase = zIndexBase;
    this.position = new Position(5, 2);

    // キー
    this.leftKey = new Key(this.town.settings.keyCodes["left"], "left", "keyup");
    this.rightKey = new Key(this.town.settings.keyCodes["right"], "right", "keyup");
    this.bottomKey = new Key(this.town.settings.keyCodes["bottom"], "bottom", "keyup");
    this.topKey = new Key(this.town.settings.keyCodes["top"], "top", "keyup");
    this.openKey = new Key(this.town.settings.keyCodes["open"], "open", "keyup");
    this.closeKey = new Key(this.town.settings.keyCodes["close"], "close", "keyup");
    
    // キャラクター
    this.characters = this.town.characters;

    // 方向ごとの進み具合
    this.destinations = {
      "top": new Destination(-1, 0),
      "left": new Destination(0, -1),
      "right": new Destination(0, 1),
      "bottom": new Destination(1, 0),
    };

    // テキストエリアのコンテキスト
    this.textAreaController = new TextAreaContext(this, this.zIndexBase);

    this.currentCommandMenu = null;

    // コマンドメニューのコントローラー
    this.commandMenuControllers = new Array(3);
    for (let i = 0; i < this.commandMenuControllers.length; i++) {
      this.commandMenuControllers[i] = new Array(2);
      for (let j = 0; j < this.commandMenuControllers[i].length; j++) {
        const commandMenuName = this.commandTexts[i][j][0];
        const isSelected = this.commandTexts[i][j][1];
        const isMemberSelectCommand = this.commandTexts[i][j][2];
        const position = new Position(j, i);

        this.commandMenuControllers[i][j] = new CommandMenuContext(this, commandMenuName, isSelected, isMemberSelectCommand, position);
        
        if (isSelected) {
          this.currentCommandMenu = this.commandMenuControllers[i][j];
        }
      }
    }

    // エントリー
    this.entry(this);
  }

  // オープンできるかどうか
  get canOpen() {
    if (this.viewState == "opened") {
      return false;
    }
    // コンテキストのチェック
    return this.checkContextForOpen();
  }

  // クローズできるかどうか
  get canClose() {
    if (this.viewState == "closed") {
      return false;
    }
    // コンテキストのチェック
    return this.checkContextForClose();
  }

  get canSelectionChange() {
    // ビュー状態がclosedであればカット
    if (this.viewState == "closed") {
      return false;
    }
    
    // テキストエリアのビュー状態がopenedであればカット
    if (this.textAreaController.viewState == "opened") {
      return false;
    }

    const memberSelecterController = this.currentCommandMenu.memberSelecterController;
    
    if (memberSelecterController && memberSelecterController.state == "opened") {
      return false;
    }

    return true;
  }

  // オープンできるかどうか：コンテキストのチェック
  checkContextForOpen() {
    return true;
  }

  // クローズできるかどうか：コンテキストのチェック
  checkContextForClose() {
    // テキストボックスが進行中であれば不可
    if (this.textAreaController && this.textAreaController.isProgress) {
      return false;
    }
    if (this.currentCommandMenu.isMemberSelectCommand && this.currentCommandMenu.memberSelecterController.state == "opened") {
      return false;
    }
    return true;
  }

  commandTexts = [
    [
      ["はなす", true, false],
      ["じゅもん", false, true],
    ],
    [
      ["つよさ", false, true],
      ["どうぐ", false, true],
    ],
    [
      ["そうび", false, true],
      ["しらべる", false, false],
    ]
  ];
}