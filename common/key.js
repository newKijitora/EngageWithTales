// ------------------------------------------------------------------
// 入力キーのクラス
// ------------------------------------------------------------------

class Key {
  constructor(keyCode, name) {
    this.keyCode = keyCode;
    this.name = name;
    this.state = "keyup";
  }
}
