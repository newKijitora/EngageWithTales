class FrameContext extends Context {
    
  // コンストラクタ
  constructor(town, position) { super();
    // 町のオブジェクト
    this.town = town;
  
    // 設定
    this.settings = town.settings;

    // 一コマのサイズ
    this.squareSize = town.settings.squareSize;
    
    // コマンドボックスの背景色
    this.backgroundColor = this.town.settings.commandBoxBackgroundColor;

    // 冒険のパーティ
    this.memberCharacters = this.town.memberCharacters;

    // コマンドボックスの左上位置（画面上での配置）
    this.commandBoxPosition = position;

    // 文字のサイズ
    this.textSize = this.town.settings.textSize;

    // ビューの初期状態
    this.viewState = 'closed';

    // テキストのスピード
    this.textSpeed = this.town.settings.textSpeed;

    // サブコンテキスト
    this.subContexts = {};

    this.openKey = new Key(this.settings.keyCodes['open'], 'open', 'keyup');
    this.closeKey = new Key(this.settings.keyCodes['close'], 'close', 'keyup');
  }

  // クローズできるかどうか
  get canClose() {
  
    if (this.viewState == 'closed') {
      return false;
    }

    // if (this.isChildOpened > 0) {
    //   this.isChildOpened--;
    //   return false;
    // }

    
    

    return true;
  }

  // ウィンドウが開いたことを親ウィンドウに通知する
  notifyChildOpened(parent) {
    // 親ウィンドウの子ウィンドウ管理変数をインクリメント
    parent.isChildOpened++;

    // 親ウィンドウに親ウィンドウがあればメソッドを伝達する
    if (parent.parent) {
      parent.notifyChildOpened(parent.parent);
    }
  }

  // キーコードからキー（オープンorクローズ）を取得する
  getKey(keyCode) {
    switch (keyCode) {
      case this.settings.keyCodes['open']:
        return this.settings.openKey;
      case this.settings.keyCodes['close']:
        return this.settings.closeKey;
      default:
        return null;
    }
  }
}