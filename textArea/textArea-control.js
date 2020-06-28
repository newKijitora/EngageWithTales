/*****************************
 * トーククラス            *
 *****************************/

class Talk {
  // コンストラクタ
  constructor() {
    this.textArea = new textAreaView();
    
    this.count = 0;
    this.timeId = 0;
    this.bl = false;
    this.fin = true;
    this.speed = 10;

    Talk.inst.push(this);
  }
  
  // トークを開始する
  open(num) { // 呼び出し元: Ppl.prototype.tlk();
    this.textArea.open();
    this.fin = false;
    this.timeId = window.setInterval(function() {
      Talk.start(num);
    }, this.speed);
  }

  // トークを終了する
  close() { // 呼び出し元: Cmd.prototype.cls();
    this.bl = false;
    this.textArea.close();
  }

  static start(num) {
    Talk.inst[0].textArea.textCells.item(Talk.inst[0].count).innerText = Talk.list[num][Talk.inst[0].count];
    Talk.inst[0].count++;
    
    if (Talk.inst[0].count == Talk.list[num].length || Talk.inst[0].count == Talk.inst[0].textArea.textCells.length) {
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