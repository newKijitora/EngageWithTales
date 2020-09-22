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
    this.items = [];
    this.magics = [];
  }
}

// コマンドクラス
class GameCommand {
  // コンストラクタ
  constructor(label, commandName, isSelected, isMemberSelectorCommand) {
    this.label = label;
    this.commandName = commandName;
    this.isSelected = isSelected;
    this.isMemberSelectorCommand = isMemberSelectorCommand;
  }
}

class GameKeyBoard {
  // コンストラクタ
}

class GameItem {
  // コンストラクタ
  constructor(name) {
    this.name = name;
  }
}

class Magic {
  // コンストラクタ
  constructor(name) {
    this.name = name;
  }
}