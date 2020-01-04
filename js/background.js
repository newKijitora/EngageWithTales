/*************************************************
 * BgIntrfaceクラス　背景を操作するクラス
 *************************************************/

class BackgroundInterface {
  // コンストラクタ
  constructor() {
    this.keycode = []; /* 移動用のキーコードを保存 */
    this.keynumber = 0; /* キーコードに基づくインデックス番号 */
    this.bool = false; /* キー入力のオンオフ */
    this.startPosition = 2295; /*  */
    this.direction = []; /* 移動に関する配列用変数 */
  }

  // 移動の方向を定める
  distribute(keycode) {
    switch (keycode) {
      case 65: /* 左移動 */
        this.direction = [2, 0, -32, 0, -1];
        this.keycode.push(keycode);
        this.keynumber = 0;
        break;
      case 68: /* 右移動 */
        this.direction = [-2, 0, 32, 0, 1];
        this.keycode.push(keycode);
        this.keynumber = 1;
        break;
      case 83: /* 下移動 */
        this.direction = [0, -2, 0, 32, 108];
        this.keycode.push(keycode);
        this.keynumber = 2;
        break;
      case 87: /* 上移動 */
        this.direction = [0, 2, 0, -32, -108];
        this.keycode.push(keycode);
        this.keynumber = 3;
        break;
      default:
        this.bool = false;
        return;
    }
    this.bool = true;
  }
}

/*************************************************
 * BgPartクラス　背景を形成するクラス
 *************************************************/

class BgPart {
  // コンストラクタ
  constructor(bgId, map, powered) {
    // canvasとコンテキストを準備
    this.entity = document.getElementById(bgId);
    this.ctx = this.entity.getContext("2d");

    // 表示位置、レイヤー、アクティブ化
    this.entity.style.left = "0px";
    this.entity.style.top = "0px";
    this.entity.style.zIndex = 1;
    this.powered = powered;
    
    // マップ配列
    this.map = map;

    this.i = 0;
    //this.ctx;
    this.count = 16;
    this.loop = 0;

    this.canvases = [];

    // テクスチャーを用意
    this.textures = this.getTxtr();
  }

  // 地図を描画する
  drawMap(direction, position) {
    // マップの行数
    for (var i = 0; i < 21; i++) {
      // マップの列数
      for (var j = 0; j < 27; j++) {
        this.ctx.clearRect(j * 32, i * 32, 32, 32);
        var index = this.map[position + (i * 108) + j + direction] != undefined ? this.map[position + (i * 108) + j + direction] : 1;
        this.ctx.drawImage(this.textures[index], j * 32, i * 32);
      }
    }
  }

  // テクスチャーを用意する
  getTxtr() {
    let count = 0;  
    const imageSources = [
      "images/grass.png",
      "images/bg.png",
      "images/block.png",
      "images/block2.png",
      "images/desert.png",
      "images/water.png",
      "images/door.png"
    ];

    const images = [];
    const textures = [];
    const _this = this;

    for (let i = 0; i < imageSources.length; i++) {
      // イメージ要素の生成
      const image = new Image();
      image.src = imageSources[i];
      images.push(image);
      
      // 画像ロード時のイベントハンドラー
      image.addEventListener("load", function(event) {
        count++;
        if (count == imageSources.length) {
          for (let i = 0; i < imageSources.length; i++) {
            // canvas要素の生成
            const texture = document.createElement("canvas");
            texture.setAttribute("class", "texture");
            texture.width = 32;
            texture.height = 32;            
            // コンテキスト
            const textureContext = texture.getContext("2d");
            textureContext.drawImage(images[images.indexOf(images[i])], 0, 0);
            textures.push(texture);
          }
          _this.drawMap(0, 2295);
        }
      }, false);
    }
    // 背景オブジェクトに保存
    return textures;
  }

  // ユニットを動かす
  moveUnit(obj, self) {
    obj.aWalk(self);
    if (obj.count == 0) {
      obj.resetPace(self);
      return;
    }
    requestAnimationFrame(function() {
      obj.moveUnit(obj, self);
    });
  }

  // 移動する
  aWalk(self) {
    this.entity.style.left = parseInt(this.entity.style.left, 10) + self.interface.direction[0] + "px";
    this.entity.style.top = parseInt(this.entity.style.top, 10) + self.interface.direction[1] + "px";
    this.count--;
  }

  // ペースをリセットする
  resetPace(self) {
    this.resetPosition(self);
    this.resetValue();
    self.interface.keycode.shift();
    if (self.powered) self.move(self);
  }

  // 値をリセットする
  resetValue() {
    this.count = 16;
    this.loop = 0;
    this.powered = false;
  }

  // ポジションをリセットする
  resetPosition(self) {
    this.entity.style.left = parseInt(this.entity.style.left, 10) + self.interface.direction[2] + "px";
    this.entity.style.top = parseInt(this.entity.style.top, 10) + self.interface.direction[3] + "px";
    this.entity.style.zIndex = 0;
  }
}

/*************************************************
 * PplFieldクラス　人々が動作するレイヤーのクラス
 *************************************************/

class PeopleField {
  // コンストラクタ
  constructor() {
    this.entity = document.getElementById("people-background"); // 要素を取得
    
    // 要素のプロパティ
    this.entity.style.top = "-32px";
    this.entity.style.left = "-32px";
    this.entity.style.opacity = 1;
    
    this.count = 16;
    this.loop = 0;
    this.powered = false;
  }

  moveUnit(obj, self) {
    obj.aWalk(self);
    if (obj.count == 0) {
      obj.resetValue();
      return;
    }
    requestAnimationFrame(function() {
      obj.moveUnit(obj, self);
    });
  }

  aWalk(self) {
    this.entity.style.left = parseInt(this.entity.style.left, 10) + self.interface.direction[0] + "px";
    this.entity.style.top = parseInt(this.entity.style.top, 10) + self.interface.direction[1] + "px";
    this.count--;
  }

  resetValue() {
    this.count = 16;
    this.entity.style.zIndex = 5;
    this.loop = 0;
    this.powered = false;
  }
}

/*************************************************
 * Bgクラス　背景を管理するクラス
 *************************************************/

class Background {
  // コンストラクタ
  constructor(mp) {

    this.entity = document.getElementById("background"); // 背景要素
    this.map = mp; // マップ配列
    
    this.interface = new BackgroundInterface(); // OK
    
    // 交互に入れ替わるレイヤー
    this.parts1 = new BgPart("canvas1", this.map, true); // レイヤー1
    this.parts2 = new BgPart("canvas2", this.map, false); // レイヤー2
    
    // 人々が動作するレイヤー
    this.peopleField = new PeopleField(); // OK

    this.poweredParts = this.parts1; // 初期表示はレイヤー1
    this.unPoweredParts = this.parts2; // レイヤー2は表示しない
    
    this.powered = false;
    this.time = 0;
    
    this.baseNumber = 3388; // 主人公のスタート位置
    this.distance = [-1, 1, 108/*27 * 4*/, -108/*-27 * 4*/];

    Background.inst.push(this);
  }

  // 背景のインスタンスを格納する配列
  static inst = [];

  // 背景を動かす
  move(bg) {
    if (bg.interface.bool) {
      switch (bg.map[bg.baseNumber + bg.distance[bg.interface.keynumber]]) {
        case 0:
        case 1:
        case 4:
          break;
        default:
          return;
      }

      bg.baseNumber += bg.distance[bg.interface.keynumber];
      bg.powered = true;
      bg.poweredParts = (bg.parts1.powered == true) ? bg.parts1 : bg.parts2;
      bg.poweredParts.entity.style.zIndex = 2;
      bg.unPoweredParts = (bg.parts1.powered == true) ? bg.parts2 : bg.parts1;
      bg.unPoweredParts.entity.style.zIndex = 1;

      // プレビュー
      bg.unPoweredParts.drawMap(bg.interface.direction[4], bg.interface.startPosition);
      bg.interface.startPosition += this.interface.direction[4];
      bg.unPoweredParts.powered = true;
      
      bg.poweredParts.loop = requestAnimationFrame(function() {
        bg.poweredParts.moveUnit(bg.poweredParts, bg);
        bg.peopleField.moveUnit(bg.peopleField, bg);
      });
    }
  }
}
