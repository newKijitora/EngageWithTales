var Tlk = function() {
  this.area = document.getElementById("txtArea");
  this.txtCell = document.getElementsByClassName("txtCell");
  this.pare = document.getElementById("mntr");
  this.pare.appendChild(this.area);
  this.count = 0;
  this.tmId = 0;
  this.bl = false;
  this.fin = true;
  this.speed = 10;
}

Tlk.prototype = {
  cnstIn: function() {
    Tlk.inst.push(this);
    return this;
  },
  opn: function(num) { // 呼び出し元: Ppl.prototype.tlk();
    this.area.style.display = "block";
    this.fin = false;
    this.tmId = setInterval(function() {
      Tlk.pwrd(num);
    }, this.speed);
  },
  cls: function() { // 呼び出し元: Cmd.prototype.cls();
    this.bl = false;
    this.area.style.display = "none";
    for (var i = 0; i < this.txtCell.length; i++) {
      this.txtCell.item(i).innerText = "";
    }
  }
}

Tlk.pwrd =  function(num) {
  Tlk.inst[0].txtCell.item(Tlk.inst[0].count).innerText = Tlk.lst[num][Tlk.inst[0].count];
  Tlk.inst[0].count++;
  if (Tlk.inst[0].count == Tlk.lst[num].length || Tlk.inst[0].count == Tlk.inst[0].txtCell.length) {
    clearInterval(Tlk.inst[0].tmId );
    Tlk.inst[0].count = 0;
    Tlk.inst[0].fin = true;
  }
}

Tlk.inst = [];

Tlk.lst = [
  "なにも　みつからなかった",
  "＊「ぼくは　キングです！　　　　　　　このまちに　きてくれて　　　　　　とても　うれしいです　　　　　　　どうも　ありがとう！",
  "＊「このまちの　ことなら　　　　　　　なんでも　きいてね！　　　　　　　いろいろ　おしえるよ",
  "かれらと　はなしをするには　　　　　ほんやくどうぐが　ひつようになるよ"
];