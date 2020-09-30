//----------------------------------------------
// 町のビュークラス
//----------------------------------------------

class TownView {
  // コンストラクタ
  constructor(context, peopleCanvases, frameCanvases, charCanvases) {
    // コンテキスト
    this.context = context;

    // キャンバス
    this.peopleCanvases = peopleCanvases;
    this.frameCanvases = frameCanvases;
    this.charCanvases = charCanvases;

    // マップエリア
    this.mapArea = new MapAreaView(this.context.mapAreaController);

    // 町の人々を生成する
    this.people = new Array(this.context.people.length);

    for (let i = 0; i < this.context.people.length; i++) {
      this.people[i] = new PeopleView(this.context.people[i], this.peopleCanvases);
    }

    // コマンドボックス
    this.commandBox = new CommandBoxView(this.context.commandBoxController, this.frameCanvases, this.charCanvases);
  }
}