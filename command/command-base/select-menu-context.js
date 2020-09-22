// ------------------------------------------------------------------
// コマンドボックスのコンテキスト基底クラス
// ------------------------------------------------------------------

class SelectMenuContext extends KeyManageContext {

  // コンストラクタ
  constructor(commandMenu, town, position, commandMenus, name) { super(town);
    // コマンドメニュー
    this.commandMenu = commandMenu;
    
    if (commandMenu) {
      this.commandMenu = commandMenu;
      
      // メニューの名前
      if (this.commandMenu.menuName) {
        this.title = this.commandMenu.menuName;
      }
    }

    // 町オブジェクト
    this.town = town;

    // 文字のサイズ
    this.textSize = this.town.settings.textSize;
    this.squareSize = this.town.settings.squareSize;

    // テキストのスピード
    this.textSpeed = this.town.settings.textSpeed;

    // テキスト用の文字テクスチャーと文字オブジェクト
    this.textTextures = this.town.resource.textTextures;
    this.textElements = this.town.resource.textElements;

    // フレーム描画用テクスチャー
    this.commandTextures = this.town.resource.commandFrameTextures;

    // コマンドボックスの背景色
    this.backgroundColor = this.town.settings.commandBoxBackgroundColor;

    // 冒険のパーティ
    this.memberCharacters = this.town.memberCharacters;

    // サブコンテキスト
    this.subContexts = {};

    // 選択中のコマンドメニューのコンテキスト
    this.currentCommandMenuContext = null;

    // ビューの初期状態
    this.viewState = 'closed';

    // コマンドボックスの左上位置（画面上での配置）
    this.commandBoxPosition = position;

    // メニューのサイズ
    this.menuSize = new Size(this.textSize.x * this.commandMenuLength, this.textSize.y);

    // コマンドのメニュー
    // 1次配列は行、2次配列は列を表す
    this.commandMenus = this.town.commandMenus;

    if (commandMenus) {
      this.commandMenus = commandMenus;
    }

    // コマンドボックスのサイズ（行数）
    this.commandBoxRows = this.commandMenus.length + 1;
    // コマンドボックスのサイズ（列数）
    this.commandBoxColumns = 7; // 変数を検討

    this.isChidOpened = false;

    if (name == 'equipselect') {
      this.maxTitleLength = 4;

      // コマンドフレームのサイズ
      this.commandBoxColumns = (this.maxTitleLength / 2) + 2; // 変数を検討（+2 はコマンドポインターの分）

      this.menuContexts =  this.createMenus(commandMenus);
    }
  }

  createMenus(commandMenus) {
    // コマンドメニューのコンテキストを生成する
    const contexts = new Array(commandMenus.length);

    for (let i = 0; i < contexts.length; i++) {
      contexts[i] = new Array(commandMenus[i].length);
      for (let j = 0; j < contexts[i].length; j++) {
        contexts[i][j] = new MenuContext({
          commandBox: this,
          menu: commandMenus[i][j],
          size: new Size(80, 32),
          position: new Position(j, i)
        });

        if (commandMenus[i][j].isSelected) {
          this.currentCommandMenuContext = contexts[i][j];
        }
      }
    }

    return contexts;
  }

  // 子ウィンドウが開いているかどうかを表す
  childOpened() {
    this.isChildOpened++;
    parent.childOpened();
  }

  // オープンできるかどうか
  get canOpen() {
    if (this.viewState == 'opened' || this.commandMenu.commandBox.viewState != 'opened' || !this.commandMenu.isSelected) {
      return false;
    }
    return true;
  }

  // クローズできるかどうか
  get canClose() {
    
    if (this.viewState == 'closed' || this.isChildOpened) {
      this.isChildOpened = false;
      return false;
    }
    return true;
  }

  get canSelectionChange() {
    // ビュー状態がclosedであればカット
    if (this.viewState == 'closed') {
      return false;
    }
    
    if (this.isChildOpened) {
      return false;
    }
    
    // テキストエリアのビュー状態がopenedであればカット
    if (this.commandMenu.commandBox.commandMenu.commandBox.commandMenu.commandBox.commandMenu.commandBox.subContexts['text-area'].viewState == 'opened') {
      return false;
    }

    return true;
  }
}