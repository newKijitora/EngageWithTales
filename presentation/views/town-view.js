//----------------------------------------------
// 町のビュークラス
//----------------------------------------------

class TownView {
  // コンストラクタ
  constructor(context, canvases) {
    // コンテキスト
    this.context = context;

    // キャンバス
    this.canvases = canvases;

    // マップエリア
    this.mapArea = new MapAreaView(this.context.mapAreaController, this.canvases);

    // 町の人々を生成する
    this.people = new Array(this.context.people.length);

    for (let i = 0; i < this.context.people.length; i++) {
      this.people[i] = new PeopleView(this.context.people[i], this.canvases);
    }

    // コマンドボックス
    this.commandBox = new CommandBoxView(this.context.commandBoxController, this.canvases);
  }
}