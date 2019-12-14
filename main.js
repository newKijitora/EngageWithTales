// bodyのロード時に起動するスクリプト

function main() {
  /***********************************************
  * フィールドをインスタンス化する (rf: wld.js)
  ************************************************/
  
  // 世界をインスタンス化
  var world = new World("abi").cnstIn();
  // フィールドをオープン
  world.open();
  
  /***********************************************
  * ゲームのパーティを編成
  ************************************************/
  
  // インスタンス化に必要な引数: new Stt(name, sx, strng, speed, physcl, intl, luck, mxHp, mxMp, ofs, dfs, ex, lvl, hp, mp, swrd, arm, shld, helm);
  new Stt("むう", "おとこ", 10, 100, 100, 100, 100, 100, 100, 100, 100, 0, 1, 50, 50, "ひのきのぼう", "ぬののふく", "きのたて", "かわのぼうし").cnstIn();
  new Stt("マオ", "おんな", 10, 100, 100, 100, 100, 100, 100, 100, 100, 0, 1, 50, 50, "ひのきのぼう", "ぬののふく", "きのたて", "かわのぼうし").cnstIn();
  new Stt("ニコ", "おんな", 10, 100, 100, 100, 100, 100, 100, 100, 100, 0, 1, 50, 50, "ひのきのぼう", "ぬののふく", "きのたて", "かわのぼうし").cnstIn();
  
  /***********************************************
  * ゲームに必要な要素の初期化
  ************************************************/
  
  // 主人公をマップ上に配置
  var hero = new Hero().cnstIn();
  // コマンドの初期化
  var cmd = new Cmd().cnstIn();
  // トークイベントの初期化
  var tlk = new Tlk().cnstIn();
  // ウェブストレージ利用時(コメントアウト中)
  // var storage = new Storage();
  
  /***********************************************
  * イベントリスナの登録
  ************************************************/
  
  // コマンドを開く
  window.addEventListener("keydown", function(event) {
    Cmd.inst[0].opn(event);
  }, false);

  // カーソルを動かす
  window.addEventListener("keydown", function(event) {
    Cmd.inst[0].mvPntr(event);
  }, false);

  // 背景を動かすイベント
  //window.addEventListener("keydown", function(evt) {Bg.inst[0].move(evt);}, false);
  
  /***********************************************
  * キーダウン、キーアップイベントの制御
  ************************************************/
  
  // キーダウンイベントの制御
  addEventListener("keydown", function(event) {
    let background = Bg.inst[0];
    if (background.powered == false && background.poweredParts.loop == 0) {
      if (Cmd.inst[0].bl == false) {
        background.interface.distribute(event.keyCode);
        background.move(background);
      }
    }
  }, false);

  // キーアップイベントの制御
  addEventListener("keyup", function() {
    let background = Bg.inst[0];
    background.powered = false;
  }, false);
};
