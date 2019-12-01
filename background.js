// 背景クラス
var Background = function(name, num, indx) {
  console.log("ok!!!!!");
  this.name = name;
  this.ent = document.getElementById(name);
  this.ent.style.top = "0px";
  this.ent.style.left = "0px";
  this.ent.style.zIndex = indx;
  this.num = num;
  this.kcd = 0;
  this.count = 0;
  this.timer = undefined;
  this.distance = { 
    65/*左移動*/: [2, 0],
    68/*右移動*/: [-2, 0],
    83/*下移動*/: [0, -2],
    87/*上移動*/: [0, 2]
  };
}

Background.prototype = {
  // 動く
  mov: function(evt) {
    if (this.kcd == 0) {
      
      this.kcd = evt.keyCode;

      switch (this.kcd) {
        // 移動用のキー
        case 65:
        case 68:
        case 83: 
        case 87:
          Background.movUnit.call(this);
          break;
        // ストップする
        case 74:
          this.stp();
          break;

        default:
          this.kcd = 0;
          break;
      }
    }
  },
  // 止まる
  stp: function() {
    if (this.kcd != 0) {
      
    }
  }
}

Background.movUnit = function() {
  var obj = this;
  
  var timer = setInterval(function() {
    obj.ent.style.left = parseInt(this.ent.style.left) + obj.distance[obj.kcd][0] + "px";
    obj.ent.style.top = parseInt(this.ent.style.top) + obj.distance[obj.kcd][1] + "px";
    obj.count++;
    
    if (obj.count == 16) {
      clearInterval(timer);
      obj.count = 0;
    }
  }, 20);
}