/*************************************************
 * Worldクラス　ゲーム本体のクラス (rf: bg.js)
 *************************************************/

class World {
  // コンストラクタ
  constructor(townName) {
    // 町の設定
    var town = Towns[townName];
    // マップの設定
    this.map = town.map;
    // 町の人々の人数
    this.people = town.people;
    // フィールドの開始
    this.pbg = new Background(this.map);

    World.inst.push(this);
  }

  // 指定されたマップを開くメソッド
  open() {
    // マップの初期化（要素を生成）
    //Mpchp.stUp(this.mp1, "canvas1");
    //Mpchp.stUp(this.mp2, "canvas2");
    
    // マップの描画（テクスチャを描画）
    //Mpchp.drw(this.mp1, this.mp, 0);
    //Mpchp.drw(this.mp2, this.mp, 0);
    
    // 町の人を設置
    for (let i = 0; i < this.people; i++) {
      new People("people", 1, 1, this.map, 5, 5, i).cnstIn();
    }

    // for (let i = 0; i < this.people; i++) {
    //   new People("enemy2", 1, 1, this.map, 15, 5, i).cnstIn();
    // }

    // 町の人の動作を開始
    People.move();
  }

  // ゲーム本体のインスタンスを格納する配列
  static inst = [];

  // 城のリストを格納するオブジェクト
  static csl = {};

  // ダンジョン（洞窟や塔など）のリストを格納するオブジェクト
  static dgn = {};
}

/* フィールドのリストを格納するオブジェクト群 */

// 各フィールドはフィールド（町、城、洞窟など）の名前をキー、その内容を格納したオブジェクトを値とする
// 各フィールドのマップはmap.jsのMaps配列からインデックスで選択する
// 各フィールドのキャラクターの人数はpplキーの値に整数値で指定
