/*****************************
 * 町の人クラス              *
 *****************************/

var Ppl = function(name, w, h, cont, x, y, spch) {
  this.ent = Elem.setElem("img", w, h, "pbg", x, y);
  this.ent.src = "images/" + name + ".png";
  this.ent.setAttribute("class", "chara");
  this.ent.style.zIndex = 1;
  this.moto = cont[this.ftprnt(this.ent)];
  this.chrcd = Ppl.chrcd[name];
  this.drct;
  this.pos;
  this.map = cont;
  this.spch = spch;
  this.time = 0;
};

/*****************************
 * クラスプロパティ           *
 *****************************/

// インスタンスを格納する配列
Ppl.inst = [];

// 人物ごとのタイマーIDを格納する配列
Ppl.tmId = [];

// 人物コード
Ppl.chrcd = {
  "people": 18,
  "heroin_front": 15,
  "enemy2": 20,
  "hero_front": 10
};

// 人物の動き
Ppl.dist = [-32, -32, 32, 32];

/*****************************
 * クラスメソッド             *
 *****************************/

// すべてのインスタンスを動かす
Ppl.act = function(evt) {
  for (var i = 0; i < Ppl.inst.length; i++) {
    Ppl.inst[i].act(evt);
  }
}

// すべてのインスタンスの動きを止める
Ppl.stp = function() {
  for (var i = 0; i < Ppl.inst.length; i++) {
    Ppl.inst[i].stp();
  }
}

// 人物に話を始めさせる
Ppl.tlk = function(num) {
  for (var i = 0; i < Ppl.inst.length; i++) {
    Ppl.inst[i].tlk(num);
  }
}

/*****************************
 * インスタンスメソッド       *
 *****************************/

Ppl.prototype = {
  
  // コンストラクタのインスタンスリストに登録
  cnstIn: function() {
    this.time = Ppl.inst.length * 100;
    Ppl.inst.push(this);
    return this;
  },
  
  tlk: function(num) { // 呼び出し元: Cmd.prototype.tlk();
    if (this.spch == num) {
      Tlk.inst[0].opn(num);
      Tlk.inst[0].bl = true;
    }
  },
  
  // 動きはじめる
  act: function() {
    var ent = this.ent, moto = this.moto, chrcd = this.chrcd, map = this.map, time = this.time;
    var ftprnt = this.ftprnt;
    Ppl.tmId.push(setInterval(function() {
      var direction = RandomGenerator.generate(0, 3);
      switch (direction) {
        case 0:
        case 2:
          switch (map[ftprnt(ent) + Rsrc.aryDist[direction]]) {
            case 0:
            case 1:
              map[ftprnt(ent)] = moto;
              moto = map[ftprnt(ent) + Rsrc.aryDist[direction]];
              map[ftprnt(ent) + Rsrc.aryDist[direction]] = Ppl.chrcd[chrcd];
              ent.style.left = parseInt(ent.style.left) + Ppl.dist[direction] + "px";
              break;
            default:
              break;
          }
          break;
        case 1:
        case 3:
          switch (map[ftprnt(ent) + Rsrc.aryDist[direction]]) {
            case 0:
            case 1:
              map[ftprnt(ent)] = moto;
              moto = map[ftprnt(ent) + Rsrc.aryDist[direction]];
              map[ftprnt(ent) + Rsrc.aryDist[direction]] = Ppl.chrcd[chrcd];
              ent.style.top = parseInt(ent.style.top) + Ppl.dist[direction] + "px";
              break;
            default:
              break;
          }
          break;
      }
    }, 1000 + time));
  },
  
  // 動きを止める
  stp: function() {
    clearInterval(Ppl.tmId.shift());
  },
  
  // 足跡メソッド
  ftprnt: function(obj) {
    this.pos = ((Rsrc.fNum.mpUnt * 4) + Rsrc.fNum.mpCol)
    + parseInt(parseInt(obj.style.left) / Rsrc.fNum.cll)
    + parseInt((parseInt(obj.style.top) / Rsrc.fNum.cll) * (Rsrc.fNum.mpCol * 4));
    return this.pos;
  }
  
}
