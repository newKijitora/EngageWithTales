// メイン関数

function main() {

  /***********************************************
  * フィールドをインスタンス化する (rf: wld.js)
  ************************************************/
  
  // フィールドの開始
  const world = new World("abi");
  world.open();
  
  /***********************************************
  * ゲームのパーティを編成
  ************************************************/
  
  // インスタンス化に必要な引数: new Stt(name, sx, strng, speed, physcl, intl, luck, mxHp, mxMp, ofs, dfs, ex, lvl, hp, mp, swrd, arm, shld, helm);
  const character1 = new Status("むう", "おとこ", 10, 100, 100, 100, 100, 100, 100, 100, 100, 0, 1, 50, 50, "ひのきのぼう", "ぬののふく", "きのたて", "かわのぼうし").cnstIn();
  const character2 = new Status("マオ", "おんな", 10, 100, 100, 100, 100, 100, 100, 100, 100, 0, 1, 50, 50, "ひのきのぼう", "ぬののふく", "きのたて", "かわのぼうし").cnstIn();
  const character3 = new Status("ニコ", "おんな", 10, 100, 100, 100, 100, 100, 100, 100, 100, 0, 1, 50, 50, "ひのきのぼう", "ぬののふく", "きのたて", "かわのぼうし").cnstIn();
  const character4 = new Status("ルナ", "おんな", 10, 100, 100, 100, 100, 100, 100, 100, 100, 0, 1, 50, 50, "ひのきのぼう", "ぬののふく", "きのたて", "かわのぼうし").cnstIn();
  
  const party = new Party();
  party.add(character1);
  party.add(character2);
  party.add(character3);
  party.add(character4);

  // 「つよさ」コマンドのメンバーメニュー
  const box = document.getElementById("chrName_box");
  for (let i = 0; i < party.member.length; i++) {
    const member = document.createElement("p");
    member.innerText = party.member[i].name;
    member.setAttribute("class", "chrName");
    box.appendChild(member);
  }

  // 「どうぐ」コマンドのメンバーメニュー
  const box2 = document.getElementById("chrName_box2");
  for (let i = 0; i < party.member.length; i++) {
    const member = document.createElement("p");
    member.innerText = party.member[i].name;
    member.setAttribute("class", "chrName");
    box2.appendChild(member);
  }

  /***********************************************
  * ゲームに必要な要素の初期化
  ************************************************/
  
  // 主人公をマップ上に配置
  const hero = new Hero("hero");
  // コマンドの初期化
  const command = new Command("command");
  // トークイベントの初期化
  const talk = new Talk("txtArea", "txtCell", "mntr");
  // ウェブストレージ利用時(コメントアウト中)
  // const storage = new Storage();
  
  /***********************************************
  * イベントリスナの登録
  ************************************************/
  
  // コマンドを開く
  window.addEventListener("keydown", function(event) {
    command.open(event);
  }, false);

  // カーソルを動かす
  window.addEventListener("keydown", function(event) {
    command.movePointer(event);
  }, false);
  
  /***********************************************
  * キーダウン、キーアップイベントの制御
  ************************************************/
  
  // キーダウンイベントの制御
  window.addEventListener("keydown", function(event) {  
    // 背景オブジェクトを取得
    let background = Background.inst[0];
    // キーコード
    let keyCode = event.keyCode;

    if (background.powered == false && background.poweredParts.loop == 0) {
      if (command.bool == false) { 
        // 背景を動かす
        background.interface.distribute(keyCode);
        background.move(background);

        // 主人公の画像を切り替える
        hero.directionChange(keyCode);
      }
    }
  }, false);

  // キーアップイベントの制御
  window.addEventListener("keyup", function() {
    // 背景オブジェクトを取得
    const background = Background.inst[0];
    background.powered = false;
  }, false);
};
