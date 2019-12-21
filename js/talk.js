/*****************************
 * トーククラス            *
 *****************************/

class Talk {
  // コンストラクタ
  constructor() {
    this.area = document.getElementById("txtArea");
    this.textCells = document.getElementsByClassName("txtCell");
    this.pare = document.getElementById("mntr");
    this.pare.appendChild(this.area);
    this.count = 0;
    this.timeId = 0;
    this.bl = false;
    this.fin = true;
    this.speed = 10;
  }

  // コンストイン
  cnstIn() {
    Talk.inst.push(this);
    return this;
  }
  
  // トークを開始する
  open(num) { // 呼び出し元: Ppl.prototype.tlk();
    console.log(this.speed);
    // ウィンドウを表示
    this.area.style.display = "block";
    this.fin = false;
    this.timeId = setInterval(function() {
      Talk.start(num);
    }, this.speed);
  }

  // トークを終了する
  close() { // 呼び出し元: Cmd.prototype.cls();
    this.bl = false;
    
    // ウィンドウを非表示にする
    this.area.style.display = "none";

    // 文字をすべて消去する
    for (var i = 0; i < this.textCells.length; i++) {
      this.textCells.item(i).innerText = "";
    }
  }

  static start(num) {
    Talk.inst[0].textCells.item(Talk.inst[0].count).innerText = Talk.list[num][Talk.inst[0].count];
    Talk.inst[0].count++;
    
    if (Talk.inst[0].count == Talk.list[num].length || Talk.inst[0].count == Talk.inst[0].textCells.length) {
      window.clearInterval(Talk.inst[0].timeId);
      Talk.inst[0].count = 0;
      Talk.inst[0].fin = true;
    }
  }

  static inst = [];

  // トークのリスト
  static list = [
    "なにも　みつからなかった",
    "＊「ぼくは　キングです！　　　　　　　このまちに　きてくれて　　　　　　とても　うれしいです　　　　　　　どうも　ありがとう！",
    "＊「このまちの　ことなら　　　　　　　なんでも　きいてね！　　　　　　　いろいろ　おしえるよ",
    "かれらと　はなしをするには　　　　　ほんやくどうぐが　ひつようになるよ",
    "つかえる　どうぐを　もっていない",
    "なにも　みにつけていない",
    "はなす　あいてが　だれもいない",
    "つかえる　じゅもんがない"
  ];
}