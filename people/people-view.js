// ピープルクラス
class PeopleView {
  // コンストラクタ   
  constructor(controller) {
    this.controller = controller;

    // ビュー上のオブジェクト
    this.people = null;
    this.peopleImage = null;

    // HTML要素の組成
    this.assemblingElements();   

    // イベントリスナー
    if (!this.controller.isAuto) {
      window.addEventListener("keydown", (event) => this.moveOn(event.keyCode), false);
      window.addEventListener("keyup", (event) => this.stop(event.keyCode), false);
    } else {
      this.autoMove();
    }
  }

  // 人物が動く
  move(destination) {
    const startPositionTop = parseInt(this.people.style.top);
    const startPositionLeft = parseInt(this.people.style.left);
    const endPositionTop = startPositionTop + destination.top;
    const endPositionLeft = startPositionLeft + destination.left;
    
    let presentPositionTop = startPositionTop;
    let presentPositionLeft = startPositionLeft;
    let baseTime = 0;
    let keyCode = 0;

    const moveFrame = (now) => {
      if (!baseTime) {
        baseTime = now;
      }

      if (now - baseTime > 0) {
        if (destination.top > 0) {
          presentPositionTop += this.controller.distance;
        } else if (destination.top < 0) {
          presentPositionTop -= this.controller.distance;
        }

        if (destination.left > 0) {
          presentPositionLeft += this.controller.distance;
        } else if (destination.left < 0) {
          presentPositionLeft -= this.controller.distance;
        }

        this.people.style.top = presentPositionTop + "px";
        this.people.style.left = presentPositionLeft + "px";
      }

      if (presentPositionTop != endPositionTop || presentPositionLeft != endPositionLeft) {
        window.requestAnimationFrame(moveFrame);

      } else if (this.controller.nextKey) {
        if (this.controller.nextKey.state == "keyup") {
          this.controller.continue = false;
        }
        keyCode = this.controller.nextKey.keyCode;
        this.controller.nextKey = null;
        this.controller.isProgress = false;
        this.moveOn(keyCode);

      } else if (this.controller.currentKey.state == "keydown") {
        keyCode = this.controller.currentKey.keyCode;
        this.controller.currentKey = null;
        this.controller.isProgress = false;
        this.moveOn(keyCode);

      } else {
        this.controller.currentKey = null;
        this.controller.nextKey = null;
        this.controller.isProgress = false;
      }
    };

    window.requestAnimationFrame(moveFrame);
  }

  // 動作の開始制御
  moveOn(keyCode) {
    let key = null;
    let destination = null;
    
    switch (keyCode) {
      case this.controller.leftKey.keyCode:
        key = this.controller.leftKey;
        destination = "left";
        break;
      case this.controller.rightKey.keyCode:
        key = this.controller.rightKey;
        destination = "right";
        break;
      case this.controller.topKey.keyCode:
        key = this.controller.topKey;
        destination = "top";
        break;
      case this.controller.bottomKey.keyCode:
        key = this.controller.bottomKey;
        destination = "bottom";
        break;
      default:
        return;
    }

    // 衝突検知
    if (this.controller.canMove && !this.controller.collisionMap
      [this.controller.currentPosition.y + this.controller.destinations[destination].top / this.controller.squareSize.y]
      [this.controller.currentPosition.x + this.controller.destinations[destination].left / this.controller.squareSize.x]) {
      this.controller.peopleName = this.controller.peopleName.replace(this.controller.peopleName.substring(this.controller.peopleName.indexOf("_") + 1), destination)
      this.peopleImage.src = "resources/images/" + this.controller.peopleName + ".png";
      return;
    }
    
    // 次のキーがすでに決まっている場合はカット
    if (this.controller.nextKey && this.controller.currentKey) {
      return;
    }

    // 同じキーの連打はカット
    if (this.controller.currentKey == key && this.controller.currentKey.state == "keydown") {
      return;
    }

    if (this.controller.canMove) {
      this.controller.collisionMap[this.controller.currentPosition.y][this.controller.currentPosition.x] = true;
      this.controller.currentPosition.y += this.controller.destinations[destination].top / this.controller.squareSize.y;
      this.controller.currentPosition.x += this.controller.destinations[destination].left / this.controller.squareSize.x;
      this.controller.collisionMap[this.controller.currentPosition.y][this.controller.currentPosition.x] = false;
      this.controller.nextKey = null;
      this.controller.isProgress = true;
      this.controller.currentKey = key;
      
      if (this.controller.continue) {
        this.controller.currentKey.state = "keydown";
      } else {
        this.controller.currentKey.state = "keyup";
        this.controller.continue = true;
      }
      
      this.controller.peopleName = this.controller.peopleName.replace(this.controller.peopleName.substring(this.controller.peopleName.indexOf("_") + 1), destination)
      this.peopleImage.src = "resources/images/" + this.controller.peopleName + ".png";
      this.move(this.controller.destinations[destination]);
    } else if (this.controller.isProgress) {
      this.controller.nextKey = key;
      this.controller.nextKey.state = "keydown";
    }
  }

  // キーアップを検知する
  stop(keyCode) {
    switch (keyCode) {
      case this.controller.leftKey.keyCode:
        this.controller.leftKey.state = "keyup";
        break;
      case this.controller.rightKey.keyCode:
        this.controller.rightKey.state = "keyup";
        break;
      case this.controller.topKey.keyCode:
        this.controller.topKey.state = "keyup";
        break;
      case this.controller.bottomKey.keyCode:
        this.controller.bottomKey.state = "keyup";
        break;
    }
  }

  // HTML要素の組成
  assemblingElements() {
    const peopleField = document.getElementById("people-Field");
    const people = document.createElement("div");
    people.style.position = "absolute";
    people.style.top = ((this.controller.basePosition.y - this.controller.mapUpperLeftPosition.y) * this.controller.squareSize.y - 8) + "px";
    people.style.left = (this.controller.basePosition.x - this.controller.mapUpperLeftPosition.x) * this.controller.squareSize.x + "px";

    const image = document.createElement("img");
    image.src = "resources/images/" + this.controller.peopleName + ".png";
    image.style.width = this.controller.squareSize.x + "px";
    image.style.height = this.controller.squareSize.y + "px";

    people.appendChild(image);
    peopleField.appendChild(people);

    this.people = people;
    this.peopleImage = image;

    this.controller.collisionMap[this.controller.currentPosition.y][this.controller.currentPosition.x] = false;
  }

  autoMove() {
    let baseTime = null;
    
    const autoMoveOn = (now) => {
      if (!baseTime) {
        baseTime = now;
      }

      if (now - baseTime > this.controller.moveTimeSpan) {
        this.controller.continue = false;
        this.moveOn(this.controller.randomKey.keyCode);
        baseTime = now;
      }

      window.requestAnimationFrame(autoMoveOn);
    };

    window.requestAnimationFrame(autoMoveOn);
  }
}
