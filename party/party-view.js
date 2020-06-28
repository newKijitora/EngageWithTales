class PartyView {
  // コンストラクタ
  constructor(controller) {
    this.controller = controller;
    this.heroImage = null;

    // HTML要素の組成
    this.assemblingElements();

    window.addEventListener("keydown", (event) => this.turnLeft(event.keyCode), false);
    window.addEventListener("keydown", (event) => this.turnRight(event.keyCode), false);
    window.addEventListener("keydown", (event) => this.turnTop(event.keyCode), false);
    window.addEventListener("keydown", (event) => this.turnBottom(event.keyCode), false);
  }

  // 左へすすむ
  turnLeft(keyCode) {
    if (keyCode == this.controller.leftKeyCode) {
      this.heroImage.src = "party/images/hero_left.png";
    }
  }

  // 右へすすむ
  turnRight(keyCode) {
    if (keyCode == this.controller.rightKeyCode) {
      this.heroImage.src = "party/images/hero_right.png";
    }
  }

  // 上へすすむ
  turnTop(keyCode) {
    if (keyCode == this.controller.topKeyCode) {
      this.heroImage.src = "party/images/hero_back.png";
    }
  }

  // 下へすすむ
  turnBottom(keyCode) {
    if (keyCode == this.controller.bottomKeyCode) {
      this.heroImage.src = "party/images/hero_front.png";
    }
  }

  // HTML要素の組成
  assemblingElements() {
    const hero = document.createElement("div");
    hero.setAttribute("id", "hero");
    hero.classList.add("party");

    const image = document.createElement("img");
    image.src = "party/images/hero_front.png";
    hero.appendChild(image);
  
    const layer = document.getElementById("party-layer");
    layer.style.zIndex = this.controller.zIndexBase;
    layer.appendChild(hero);

    this.heroImage = image;
  }
}
