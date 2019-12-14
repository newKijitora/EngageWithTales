var Hero = function() {
  this.ent = document.getElementById("hero");
}

Hero.inst = [];

Hero.prototype = {
  
  // インスタンスを保持する
  cnstIn: function() {
    Hero.inst.push(this);
    return this;
  },

  // 主人公の画像の向きを変える
  directionChange: function(keycode) {
    switch (keycode) {
      case 65:
        this.ent.src = "images/hero_left.png";
        break;
      case 68:
        this.ent.src = "images/hero_right.png";
        break;
      case 83:
        this.ent.src = "images/hero_front.png";
        break;
      case 87:
        this.ent.src = "images/hero_back.png";
        break;
      default:
        break;
  }
}
}