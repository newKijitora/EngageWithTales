// ゲーム世界のビュークラス
class WorldView {
  // コンストラクタ
  constructor(controller) {
    // コントローラー
    this.controller = controller;

    // ビュー上のサイズ単位
    this.squareSize = this.controller.squareSize;

    // ビュー（モニター）のサイズとウィンドウ上のビューの位置
    this.worldViewSize = this.controller.worldViewSize;
    this.worldViewPosition = this.controller.worldViewPosition;

    // DOM要素
    this.world = this.assemblingElements();
  }

  // HTML要素の組成
  assemblingElements() {
    const world = document.createElement("div");
    world.setAttribute("id", "world");
    world.style.position = "absolute";
    world.style.overflow = "hidden";

    // ビュー（モニター）のサイズ
    world.style.width = this.worldViewSize.x + "px";
    world.style.height = this.worldViewSize.y + "px";

    // ウィンドウ上のビューの位置
    world.style.top = this.worldViewPosition.y * this.squareSize.y + "px";
    world.style.left = this.worldViewPosition.x * this.squareSize.x + "px";

    document.body.appendChild(world);

    return world;
  }
}