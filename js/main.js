// メイン関数

function main() {

  /***********************************************
  * フィールドをインスタンス化する (rf: wld.js)
  ************************************************/
  
  // フィールドの開始
  var world = new World("abi").cnstIn();
  world.open();
  
  /***********************************************
  * ゲームのパーティを編成
  ************************************************/
  
  // インスタンス化に必要な引数: new Stt(name, sx, strng, speed, physcl, intl, luck, mxHp, mxMp, ofs, dfs, ex, lvl, hp, mp, swrd, arm, shld, helm);
  new Status("むう", "おとこ", 10, 100, 100, 100, 100, 100, 100, 100, 100, 0, 1, 50, 50, "ひのきのぼう", "ぬののふく", "きのたて", "かわのぼうし").cnstIn();
  new Status("マオ", "おんな", 10, 100, 100, 100, 100, 100, 100, 100, 100, 0, 1, 50, 50, "ひのきのぼう", "ぬののふく", "きのたて", "かわのぼうし").cnstIn();
  new Status("ニコ", "おんな", 10, 100, 100, 100, 100, 100, 100, 100, 100, 0, 1, 50, 50, "ひのきのぼう", "ぬののふく", "きのたて", "かわのぼうし").cnstIn();
  new Status("ルナ", "おんな", 10, 100, 100, 100, 100, 100, 100, 100, 100, 0, 1, 50, 50, "ひのきのぼう", "ぬののふく", "きのたて", "かわのぼうし").cnstIn();
  
  /***********************************************
  * ゲームに必要な要素の初期化
  ************************************************/
  
  // 主人公をマップ上に配置
  var hero = new Hero().cnstIn();
  // コマンドの初期化
  var command = new Command().cnstIn();
  // トークイベントの初期化
  var talk = new Talk().cnstIn();
  // ウェブストレージ利用時(コメントアウト中)
  // var storage = new Storage();
  
  /***********************************************
  * イベントリスナの登録
  ************************************************/
  
  // コマンドを開く
  window.addEventListener("keydown", function(event) {
    Command.inst[0].opn(event);
  }, false);

  // カーソルを動かす
  window.addEventListener("keydown", function(event) {
    Command.inst[0].mvPntr(event);
  }, false);
  
  /***********************************************
  * キーダウン、キーアップイベントの制御
  ************************************************/
  
  // キーダウンイベントの制御
  window.addEventListener("keydown", function(event) {
    
    // 背景オブジェクトを取得
    let background = Bg.inst[0];
    // キーコード
    let keyCode = event.keyCode;

    if (background.powered == false && background.poweredParts.loop == 0) {
      if (Command.inst[0].bool == false) {
        
        // 背景を動かす
        background.interface.distribute(keyCode);
        background.move(background);

        // 主人公の画像を切り替える
        Hero.inst[0].directionChange(keyCode);
      }
    }
  }, false);

  // キーアップイベントの制御
  window.addEventListener("keyup", function() {

    // 背景オブジェクトを取得
    let background = Bg.inst[0];
    background.powered = false;
  }, false);
};
