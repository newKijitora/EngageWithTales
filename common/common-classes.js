// キークラス
class Key {
  constructor(keyCode, name, state) {
    this.keyCode = keyCode;
    this.name = name;
    this.state = "keyup";
  }
}

// 方向クラス
class Destination {
  constructor(top, left) {
    this.top = top;
    this.left = left;
  }
}

// 位置クラス
class Position {
  // コンストラクタ
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// サイズクラス
class Size {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// テクスチャークラス
class Texture {
  constructor(texture, collision, next, nextIndex) {
    this.texture = texture;
    this.collision = collision;
    this.next = next;
    this.nextIndex = nextIndex;
  }
}

// テクスチャークラス
class Text {
  constructor(texture1, texture2, read) {
    this.texture1 = texture1;
    this.texture2 = texture2;
    this.read = read;
  }
}

// キャラクタークラス
class Character {
  // コンストラクタ
  constructor(id, name, strength, trunk, speed, hp, mp) {
    this.id = id;
    this.name = name;
    this.strength = strength;
    this.speed = speed;
    this.trunk = trunk;
    this.hp = hp;
    this.mp = mp;
  }
}
