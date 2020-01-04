/*****************************
 * 主人公クラス            *
 *****************************/

class Hero {
  // コンストラクタ
  constructor(idName) {
    this.ent = document.getElementById(idName);
    Hero.inst.push(this);
  }

  // 主人公の画像の向きを変える
  directionChange(keycode) {
    switch (keycode) {
      case 65: // 左方向
        this.ent.src = "images/hero_left.png";
        break;
      case 68: // 右方向
        this.ent.src = "images/hero_right.png";
        break;
      case 83: // 下方向
        this.ent.src = "images/hero_front.png";
        break;
      case 87: // 上方向
        this.ent.src = "images/hero_back.png";
        break;
      default:
        break;
    }
  }

  // クラスのインスタンス
  static inst = [];
}
