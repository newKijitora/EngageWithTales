/*****************************
 * ポインタークラス            *
 *****************************/

 class Pointer {
    // コンストラクタ
    constructor(idName) {
      this.element = document.getElementById(idName);
      this.setPosition(0, 0);
    }
  
    // ポインタ位置を設定
    setPosition(x, y) {
      this.element.style.left = x + "px";
      this.element.style.top = y + "px";
    }
  
    // ポインタのX軸位置
    get x() {
      return parseInt(this.element.style.left);
    }
  
    set x(num) {
      this.element.style.left = num + "px";
    }
  
    // ポインタのY軸位置
    get y() {
      return parseInt(this.element.style.top);
    }
  
    set y(num) {
      this.element.style.top = num + "px";
    }
  }
  