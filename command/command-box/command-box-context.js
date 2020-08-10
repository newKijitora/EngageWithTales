// コマンドボックスのコンテキスト（コマンド関連オブジェクトのルート）
class CommandBoxContext extends Context {

  // コンストラクタ
  constructor(town, zIndexBase) { super();
    // 町オブジェクト
    this.town = town;

    // 一コマのサイズと文字のサイズ
    this.squareSize = this.town.settings.squareSize;
    this.textSize = this.town.settings.textSize;

    // コマンドボックスの背景色
    this.backgroundColor = this.town.settings.commandBoxBackgroundColor;

    // コマンドボックスの左上位置
    this.commandBoxPosition = new Position(6, 2);

    // コマンドのメニュー
    this.commandMenus = [
      [
        ["はなす", true, false],
        ["まほう", false, true],
      ],
      [
        ["つよさ", false, true],
        ["どうぐ", false, true],
      ],
      [
        ["そうび", false, true],
        ["しらべる", false, false],
      ],
      [
        ["とびら", false, false],
        ["ちず", false, false],
      ]
    ];

    // コマンドフレームのサイズ
    this.commandBoxRows = this.commandMenus.length + 1;
    this.commandBoxColumns = 6; // 変数を検討

    // コマンドフレームのテクスチャー
    this.commandTextures = this.town.resource.commandTextures;

    // テキスト用のテクスチャーと文字エレメント
    this.textTextures = this.town.resource.textTextures;
    this.textElements = this.town.resource.textElements;

    // テキストのスピード
    this.textSpeed = this.town.settings.textSpeed;

    // ビューの状態
    this.viewState = "closed";
    this.zIndexBase = zIndexBase;

    // キー
    this.leftKey = new Key(this.town.settings.keyCodes["left"], "left", "keyup");
    this.rightKey = new Key(this.town.settings.keyCodes["right"], "right", "keyup");
    this.bottomKey = new Key(this.town.settings.keyCodes["bottom"], "bottom", "keyup");
    this.topKey = new Key(this.town.settings.keyCodes["top"], "top", "keyup");
    this.openKey = new Key(this.town.settings.keyCodes["open"], "open", "keyup");
    this.closeKey = new Key(this.town.settings.keyCodes["close"], "close", "keyup");
    
    // 冒険のパーティ
    this.memberCharacters = this.town.memberCharacters;

    // 方向ごとの進み具合
    this.destinations = {
      "top": new Destination(-1, 0),
      "left": new Destination(0, -1),
      "right": new Destination(0, 1),
      "bottom": new Destination(1, 0),
    };

    // テキストエリアのコンテキスト
    this.textAreaContext = new TextAreaContext(this, this.zIndexBase);

    // 選択中のコマンドメニュー
    this.currentCommandMenu = null;

    // コマンドメニューのコントローラーを生成する
    this.commandMenuControllers = new Array(this.commandMenus.length);

    for (let i = 0; i < this.commandMenuControllers.length; i++) {
      this.commandMenuControllers[i] = new Array(this.commandMenus[i].length);
      for (let j = 0; j < this.commandMenuControllers[i].length; j++) {
        const commandMenuName = this.commandMenus[i][j][0];
        const isSelected = this.commandMenus[i][j][1];
        const isMemberSelectCommand = this.commandMenus[i][j][2];
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
    if (this.textAreaContext.viewState == "opened") {
      return false;
    }

    // メンバーセレクターメニューが選択されていて、そのステータスがopendeであればカット
    const memberSelecterContext = this.currentCommandMenu.memberSelecterContext;
    if (memberSelecterContext && memberSelecterContext.viewState == "opened") {
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
    if (this.textAreaContext && this.textAreaContext.isProgress) {
      return false;
    }

    if (this.currentCommandMenu.isMemberSelectCommand && this.currentCommandMenu.memberSelecterContext.viewState == "opened") {
      return false;
    }

    return true;
  }
}
