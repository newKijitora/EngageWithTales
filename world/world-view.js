"use strict";

// ワールドのビュークラス
class WorldView {
  // コンストラクタ
  constructor(controller) {
    // コントローラー
    this.controller = controller;
    this.squareSize = this.controller.squareSize;
    this.worldViewSize = this.controller.worldViewSize;
    this.worldViewPosition = this.controller.worldViewPosition;

    this.world = null;
    
    this.assemblingElements();
  }

  // HTML要素の組成
  assemblingElements() {
    const world = document.createElement("div");
    world.setAttribute("id", "world");
    world.style.position = "absolute";
    world.style.top = this.worldViewPosition.y * this.squareSize.y + "px";
    world.style.left = this.worldViewPosition.x * this.squareSize.x + "px";
    world.style.width = this.worldViewSize.x + "px";
    world.style.height = this.worldViewSize.y + "px";
    world.style.overflow = "hidden";
    world.style.cursor = "none";

    document.body.appendChild(world);

    this.world = world;
  }
}