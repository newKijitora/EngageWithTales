// ------------------------------------------------------------------
// コマンドボックスのコンテキスト基底クラス
// ------------------------------------------------------------------

class CommandBoxContextBase extends KeyManageContext {

  // コンストラクタ
  constructor(town) { super(town);
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
    this.commandBoxPosition = null;

    // メニューのサイズ
    this.menuSize = new Size(this.textSize.x * this.commandMenuLength, this.textSize.y);

    // コマンドのメニュー
    // 1次配列は行、2次配列は列を表す
    this.commandMenus = this.town.commandMenus;

    // コマンドボックスのサイズ
    this.commandBoxRows = this.commandMenus.length + 1;
  }

  // 子ウィンドウが開いているかどうかを表す
  childOpened() {
    this.isChildOpened++;
    parent.childOpened();
  }
}