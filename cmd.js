/*****************************
 * コマンドクラス            *
 *****************************/

var Cmd = function() {
  this.ent = document.getElementById("cmd");
  this.pntr = document.getElementById("cmd_pntr");
  this.chrNameBx = document.getElementById("chrName_box");
  this.cntBx = document.getElementById("cnt_bx");
  this.pntr.style.left = "0px";
  this.pntr.style.top = "0px";
  this.chrSlct = document.getElementById("chrSlct");
  this.pare = document.getElementById("mntr");
  this.pare.appendChild(this.ent);
  this.bl = false; // 真偽値の初期値
  this.stt = "cls"; // 状態の初期値
  this.kcd = 74; // キーボード「j」キー
  this.pntrNum = 0;
  this.blPos = 0;
};

/*****************************
 * クラスプロパティ           *
 *****************************/

  Cmd.inst = [];

/*****************************
 * インスタンスメソッド       *
 *****************************/

Cmd.prototype = {

  cnstIn: function() {
    Cmd.inst.push(this);
    return this;
  },
  
  mvPntr: function(evt) {
    if (this.bl == true && this.stt != "tlk") {
    switch (evt.keyCode) {
      case 65:
        if (parseInt(this.pntr.style.left) != 0 && this.stt != "slct")
          this.pntr.style.left = parseInt(this.pntr.style.left) - 120 + "px";
          break;
      case 68:
        if (parseInt(this.pntr.style.left) != 120 && this.stt != "slct")
          this.pntr.style.left = parseInt(this.pntr.style.left) + 120 + "px";
          break;
      case 83:
        if (parseInt(this.pntr.style.top) != 64)
          this.pntr.style.top = parseInt(this.pntr.style.top) + 32 + "px";
          break;
      case 87:
        if (parseInt(this.pntr.style.top) != 0)
          this.pntr.style.top = parseInt(this.pntr.style.top) - 32 + "px";
          break;
      default: break;
    }
    }
  },
  
  // コマンドを開く
  opn: function (evt) {
    if (evt.keyCode == 75)
      this.cls();
    if (evt.keyCode == this.kcd && Tlk.inst[0].fin == true) {
      this.bl = true;
      switch (this.stt) {
        case "cmd": this.slct(); break;
        case "tlk": this.cls(); break;
        case "cls": this.cmd(); break;
        case "slct": Stt.inst[0].shw(); break;
        default: break;
      }
    }
  },
  
   slct: function() {
     switch (parseInt(this.pntr.style.top) + parseInt(this.pntr.style.left)) {
      case 0: this.tlk(); break;
      case 32: this.strng(); break;
      case 64: console.log("case 64"); break;
      case 120: console.log("case 120"); break;
      case 152: console.log("case 152"); break;
      case 184: this.srch(); break;
    }
  },
  
  cmd: function() {
    this.stt = "cmd";
    this.ent.style.display = "block";
    Ppl.stp();
  },
  tlk: function() {
    this.stt = "tlk";
    Ppl.tlk(1);
  },
  strng: function() {
    this.stt = "slct";
    this.pntr.style.top = "0px";
    this.pntr.style.left = "0px";
    this.chrNameBx.appendChild(this.pntr);
    Stt.inst[0].slct();
  },
  srch: function() {
    this.stt = "tlk";
    Tlk.inst[0].opn(0);
    Tlk.inst[0].bl = true;
  },
  cls: function() {
    if (Tlk.inst[0].fin == true) {
      this.stt = "cls";
      this.bl = false;
      this.ent.style.display = "none";
      this.chrSlct.style.display = "none";
      this.cntBx.appendChild(this.pntr);
      Tlk.inst[0].cls();
      Stt.inst[0].cls();
      Cmd.inst[0].pntr.style.left = "0px";
      Cmd.inst[0].pntr.style.top = "0px";
      Tlk.inst[0].bl = false;
      Ppl.act();
    }
  }
  
}