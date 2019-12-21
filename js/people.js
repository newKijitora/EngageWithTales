/*****************************
 * 町の人クラス              *
 *****************************/

var People = function(name, w, h, cont, x, y, spch) {
  this.ent = Elem.setElem("img", w, h, "people-background", x, y);
  this.ent.src = "images/" + name + ".png";
  this.ent.setAttribute("class", "chara");
  this.ent.style.zIndex = 1;
  this.moto = cont[this.ftprnt(this.ent)];
  this.characterCode = People.characterCode[name];
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
People.inst = [];

// 人物ごとのタイマーIDを格納する配列
People.tmId = [];

// 人物コード
People.characterCode = {
  "people": 18,
  "heroin_front": 15,
  "enemy2": 20,
  "hero_front": 10
};

// 人物の動き
People.dist = [-32, -32, 32, 32];

/*****************************
 * クラスメソッド             *
 *****************************/

// すべてのインスタンスを動かす
People.move = function(evt) {
  for (var i = 0; i < People.inst.length; i++) {
    People.inst[i].move(evt);
  }
}

// すべてのインスタンスの動きを止める
People.stop = function() {
  for (let i = 0; i < People.inst.length; i++) {
    People.inst[i].stop();
  }
}

// 人物に話を始めさせる
People.talk = function(num) {
  for (var i = 0; i < People.inst.length; i++) {
    People.inst[i].talk(num);
  }
}

/*****************************
 * インスタンスメソッド       *
 *****************************/

People.prototype = {
  
  // コンストラクタのインスタンスリストに登録
  cnstIn: function() {
    this.time = People.inst.length * 100;
    People.inst.push(this);
    return this;
  },
  
  talk: function(num) { // 呼び出し元: Cmd.prototype.tlk();
    if (this.spch == num) {
      Talk.inst[0].open(num);
      Talk.inst[0].bl = true;
    }
  },
  
  // 動きはじめる
  move: function() {
    var ent = this.ent, moto = this.moto, characterCode = this.characterCode, map = this.map, time = this.time;
    var ftprnt = this.ftprnt;
    People.tmId.push(setInterval(function() {
      var direction = RandomGenerator.generate(0, 3);
      switch (direction) {
        case 0:
        case 2:
          switch (map[ftprnt(ent) + Rsrc.aryDist[direction]]) {
            case 0:
            case 1:
              map[ftprnt(ent)] = moto;
              moto = map[ftprnt(ent) + Rsrc.aryDist[direction]];
              map[ftprnt(ent) + Rsrc.aryDist[direction]] = People.characterCode[characterCode];
              ent.style.left = parseInt(ent.style.left) + People.dist[direction] + "px";
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
              map[ftprnt(ent) + Rsrc.aryDist[direction]] = People.characterCode[characterCode];
              ent.style.top = parseInt(ent.style.top) + People.dist[direction] + "px";
              break;
            default:
              break;
          }
          break;
      }
    }, 1000 + time));
  },
  
  // 動きを止める
  stop: function() {
    clearInterval(People.tmId.shift());
  },
  
  // 足跡メソッド
  ftprnt: function(obj) {
    this.pos = ((Rsrc.fNum.mpUnt * 4) + Rsrc.fNum.mpCol)
    + parseInt(parseInt(obj.style.left) / Rsrc.fNum.cll)
    + parseInt((parseInt(obj.style.top) / Rsrc.fNum.cll) * (Rsrc.fNum.mpCol * 4));
    return this.pos;
  }
  
}
