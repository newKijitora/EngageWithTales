//----------------------------------------------
// 町のビュー
//----------------------------------------------

class TownView {

  // コンストラクタ
  constructor(context, peopleCanvases) {
    // コンテキスト
    this.context = context;

    // 人物のキャンバス
    this.peopleCanvases = peopleCanvases;

    // マップエリア
    this.mapArea = new MapAreaView(this.context.mapAreaController);

    this.people = new Array(this.context.people.length);

    for (let i = 0; i < this.context.people.length; i++) {
      this.people[i] = new PeopleView(this.context.people[i], this.peopleCanvases);
    }

    // コマンドボックス
    this.commandBox = new CommandBoxView(this.context.commandBoxController, 300);
  }

  assemblingElements() {

  }
}