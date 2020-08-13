// ------------------------------------------------------------------
// コマンドボックスのコンテキスト（コマンド関連オブジェクトのルート）
// ------------------------------------------------------------------

class CommandBoxContext extends KeyManageContext {

  // コンストラクタ
  constructor(town, zIndexBase) { super(town);
    // 町オブジェクト
    this.town = town;

    // 文字のサイズ
    this.textSize = this.town.settings.textSize;

    // コマンドのメニュー
    this.commandMenus = [
      [
        // new Command(label, commandName, isSelected, isMemberSelector);
        new Command("talk", "はなす", true, false),
        new Command("magic", "まほう", false, true),
      ],
      [
        new Command("status", "つよさ", false, true),
        new Command("tools", "もちもの", false, true),
      ],
      [
        new Command("equipment", "そうび", false, true),
        new Command("search", "しらべる", false, false),
      ],
      [
        new Command("door", "とびら", false, false),
        new Command("map", "ちず", false, false),
      ]
    ];

    // コマンドボックスのサイズ（行数と列数）
    this.commandBoxRows = this.commandMenus.length + 1;
    this.commandBoxColumns = 7; // 変数を検討

    // コマンドボックスのフレーム用テクスチャーを格納した配列
    this.commandTextures = this.town.resource.commandFrameTextures;

    // コマンドボックスの背景色
    this.backgroundColor = this.town.settings.commandBoxBackgroundColor;

    // コマンドボックスの左上位置
    this.commandBoxPosition = new Position(5, 2);
    
    // テキスト用の文字テクスチャーと文字エレメント
    this.textTextures = this.town.resource.textTextures;
    this.textElements = this.town.resource.textElements;

    // テキストのスピード
    this.textSpeed = this.town.settings.textSpeed;

    // ビューの初期状態
    this.viewState = "closed";
    this.zIndexBase = zIndexBase;

    // 冒険のパーティ
    this.memberCharacters = this.town.memberCharacters;

    // テキストエリアのコンテキスト
    this.textAreaContext = new TextAreaContext(this, this.zIndexBase);

    // 選択中のコマンドメニューのコンテキスト
    this.currentCommandMenuContext = null;

    // コマンドメニューのコンテキストを生成する
    this.commandMenuContexts = new Array(this.commandMenus.length);

    for (let i = 0; i < this.commandMenuContexts.length; i++) {
      this.commandMenuContexts[i] = new Array(this.commandMenus[i].length);
      for (let j = 0; j < this.commandMenuContexts[i].length; j++) {

        // コマンドメニューのコンテキスト
        this.commandMenuContexts[i][j] = new CommandMenuContext(this, this.commandMenus[i][j], new Position(j, i));
        
        // 初期状態で選択されるコマンドメニューをカレントに設定
        if (this.commandMenus[i][j].isSelected) {
          this.currentCommandMenuContext = this.commandMenuContexts[i][j];
        }
      }
    }

    // エントリー
    this.entry(this);
  }

  // コマンドボックスを開くことができるかどうか
  get canOpen() {
    // ビュー状態がオープンならカット
    if (this.viewState == "opened") {
      return false;
    }

    return true;
  }

  // コマンドボックスを閉じることができるかどうか
  get canClose() {
    // ビュー状態がクローズならカット
    if (this.viewState == "closed") {
      return false;
    }

    // テキストボックスが進行中であればカット
    if (this.textAreaContext && this.textAreaContext.isProgress) {
      return false;
    }

    // メンバーセレクトコマンドが選択中で、かつオープン状態ならカット
    if (this.currentCommandMenuContext.isMemberSelectCommand &&
      this.currentCommandMenuContext.memberSelecterContext.viewState == "opened") {
      return false;
    }

    return true;
  }

  // コマンドの選択を変更することができるかどうか
  get canSelectionChange() {
    // ビュー状態がclosedであればカット
    if (this.viewState == "closed") {
      return false;
    }
    
    // テキストエリアのビュー状態がopenedであればカット
    if (this.textAreaContext.viewState == "opened") {
      return false;
    }

    // メンバーセレクトコマンドが選択中で、かつオープン状態ならカット
    if (this.currentCommandMenuContext.isMemberSelectCommand &&
      this.currentCommandMenuContext.memberSelecterContext.viewState == "opened") {
      return false;
    }

    return true;
  }
}
