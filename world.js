/*************************************************
 * Wldクラス　ゲーム本体のクラス (rf: bg.js)
 *************************************************/

// コンストラクタ
var World = function(townName) {
  // Wld.twnのJSONからtownNameキーで町を選択する
  // twnのmp, pplプロパティをWldのmpとpplに設定
  var town = TownList[townName];

  this.map = town.map; // 町のマップを表す配列オブジェクト

  this.people = town.people; // 町の人数
  console.log(this.map);

  // 人々が動くレイヤー
  this.pbg = new Bg(this.map).cnstIn();

  // 背景の上層レイヤーと下層レイヤー（動作するごとにレイヤーは入れ替わる）
  //this.bg1 = new BgPart("canvas1", this.mp, false).cnstIn();
  //this.bg2 = new BgPart("canvas2", this.mp, true).cnstIn();
    
  //this.bg1.ent.appendChild(this.pbg.ent);
  
  // マップの一マスになるdiv要素を格納する配列
  //this.mp1 = [];
  //this.mp2 = [];
};

/*************************************************
 * クラスプロパティ
 *************************************************/

/* ゲーム本体のインスタンスを格納する配列 */

World.inst = [];

/* フィールドのリストを格納するオブジェクト群 */

// 各フィールドはフィールド（町、城、洞窟など）の名前をキー、その内容を格納したオブジェクトを値とする
// 各フィールドのマップはmap.jsのMaps配列からインデックスで選択する
// 各フィールドのキャラクターの人数はpplキーの値に整数値で指定


// 城のリストを格納するオブジェクト
World.csl = {};

// ダンジョン（洞窟や塔など）のリストを格納するオブジェクト
World.dgn = {};

/*************************************************
 * インスタンスメソッド
 *************************************************/

World.prototype = {
  
  // コンストラクタのインスタンスリストに登録
  cnstIn: function() {
    World.inst.push(this);
    return this;
  },
  
  // 指定されたマップを開くメソッド
  open: function() {

    // マップの初期化（要素を生成）
    //Mpchp.stUp(this.mp1, "canvas1");
    //Mpchp.stUp(this.mp2, "canvas2");
    
    // マップの描画（テクスチャを描画）
    //Mpchp.drw(this.mp1, this.mp, 0);
    //Mpchp.drw(this.mp2, this.mp, 0);
    
    // 町の人を設置
    //for (var i = 0; i < this.ppl; i++) {
      //new Ppl("people", 1, 1, this.mp, 5, 5, i).cnstIn();
    //}

    // for (var i = 0; i < this.ppl; i++) {
    //   new Ppl("boss", 1, 1, this.mp, 15, 5, i).cnstIn();
    // }

    // 町の人の動作を開始
    Ppl.act();
  }
};
