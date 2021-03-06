// ------------------------------------------------------------------
// コンテキストの基底クラス
// ------------------------------------------------------------------

class Context {

  // コンストラクタ
  constructor() {
    
  }

  // エントリー
  entry(context) {
    const viewName = context.constructor.name.replace("Context", "View");
    const view = Function("return " + viewName + ";")();
    new view(context);
  }
}