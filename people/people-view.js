// ピープルクラス
class PeopleView extends MovableView {
  // コンストラクタ   
  constructor(context) { super();
    // コンテキスト
    this.context = context;

    // ビュー上のオブジェクト
    this.peopleDom = null;
    this.peopleImage = null;

    // HTML要素の組成
    this.assemblingElements();

    // イベントリスナー
    if (!this.context.isAuto) {
      window.addEventListener("keydown", (event) => this.moveOn(event.keyCode), false);
      window.addEventListener("keyup", (event) => this.stop(event.keyCode), false);
    } else {
      // 自動で動く
      this.autoMove();
    }
  }

  // 人物が動く => TODO：canvasに変更する
  move(destination) {
    // 起点位置
    const startPositionTop = parseInt(this.peopleDom.style.top);
    const startPositionLeft = parseInt(this.peopleDom.style.left);
    
    // 終点位置
    const endPositionTop = startPositionTop + destination.top;
    const endPositionLeft = startPositionLeft + destination.left;
    
    // 進行中の位置
    let presentPositionTop = startPositionTop;
    let presentPositionLeft = startPositionLeft;

    let baseTime = 0;
    let keyCode = 0;

    // 動作のフレーム
    const moveFrame = (now) => {
      // タイムスタンプの初期化
      if (!baseTime) {
        baseTime = now;
      }

      if (now - baseTime > 0) {
        // 動作方向が上下方向の場合
        if (destination.top > 0) {
          presentPositionTop += this.context.distance;
        } else if (destination.top < 0) {
          presentPositionTop -= this.context.distance;
        }

        // 動作方向が左右方向の場合
        if (destination.left > 0) {
          presentPositionLeft += this.context.distance;
        } else if (destination.left < 0) {
          presentPositionLeft -= this.context.distance;
        }

        // DOMの位置更新
        this.peopleDom.style.top = presentPositionTop + "px";
        this.peopleDom.style.left = presentPositionLeft + "px";
      }

      // 終点まで動いていなければフレーム更新
      if (presentPositionTop != endPositionTop || presentPositionLeft != endPositionLeft) {
        window.requestAnimationFrame(moveFrame);

      // 終点まで動いていて、次のキーが登録されている
      } else if (this.context.nextKey) {
        if (this.context.nextKey.state == "keyup") {
          this.context.continue = false;
        }
        keyCode = this.context.nextKey.keyCode;
        this.context.nextKey = null;
        this.context.isProgress = false;
        this.moveOn(keyCode);

      // 終点まで動いていて、以前のキーが押しっぱなし
      } else if (this.context.currentKey.state == "keydown") {
        keyCode = this.context.currentKey.keyCode;
        this.context.currentKey = null;
        this.context.isProgress = false;
        this.moveOn(keyCode);

      // 次のキー操作がない
      } else {
        this.context.currentKey = null;
        this.context.nextKey = null;
        this.context.isProgress = false;
      }
    };

    // 動作開始
    window.requestAnimationFrame(moveFrame);
  }

  // 動作の開始制御
  moveOn(keyCode) {
    let key = null;
    let destination = null;
    
    // キーコードの振り分け（移動キー以外はカット）
    key = this.context.getKey(keyCode);
    if (!key) {
      return;
    }

    // 進行方向
    destination = key.name;

    // 衝突検知
    if (this.context.canMove && !this.context.collisionMap
      [this.context.currentPosition.y + this.context.getDestination(destination).top / this.context.squareSize.y]
      [this.context.currentPosition.x + this.context.getDestination(destination).left / this.context.squareSize.x]) {
      this.context.peopleName = this.context.peopleName.replace(this.context.peopleName.substring(this.context.peopleName.indexOf("_") + 1), destination)
      this.peopleImage.src = "resources/images/" + this.context.peopleName + ".png";
      return;
    }
    
    // 次のキーがすでに決まっている場合はカット
    if (this.context.nextKey && this.context.currentKey) {
      return;
    }

    // 同じキーの連打はカット
    if (this.context.currentKey == key && this.context.currentKey.state == "keydown") {
      return;
    }

    // 移動処理
    if (this.context.canMove) {
      this.context.collisionMap[this.context.currentPosition.y][this.context.currentPosition.x] = true;
      this.context.currentPosition.y += this.context.getDestination(destination).top / this.context.squareSize.y;
      this.context.currentPosition.x += this.context.getDestination(destination).left / this.context.squareSize.x;
      this.context.collisionMap[this.context.currentPosition.y][this.context.currentPosition.x] = false;
      
      this.context.nextKey = null;
      this.context.isProgress = true;
      this.context.currentKey = key;
      
      if (this.context.continue) {
        this.context.currentKey.state = "keydown";
      } else {
        this.context.currentKey.state = "keyup";
        this.context.continue = true;
      }
      
      this.context.peopleName = this.context.peopleName.replace(this.context.peopleName.substring(this.context.peopleName.indexOf("_") + 1), destination)
      this.peopleImage.src = "resources/images/" + this.context.peopleName + ".png";

      // 動作開始
      this.move(this.context.getDestination(destination));
    
    // 動作中の場合は次のキーを格納（最新のキーのみ）
    } else if (this.context.isProgress) {
      this.context.nextKey = key;
      this.context.nextKey.state = "keydown";
    }
  }

  // キーアップを検知する
  stop(keyCode) {
    switch (keyCode) {
      case this.context.leftKey.keyCode:
        this.context.leftKey.state = "keyup";
        break;
      case this.context.rightKey.keyCode:
        this.context.rightKey.state = "keyup";
        break;
      case this.context.topKey.keyCode:
        this.context.topKey.state = "keyup";
        break;
      case this.context.bottomKey.keyCode:
        this.context.bottomKey.state = "keyup";
        break;
    }
  }

  // HTML要素の組成
  assemblingElements() {
    const peopleField = document.getElementById("people-Field");
    const people = document.createElement("div");
    people.style.position = "absolute";
    people.style.top = ((this.context.basePosition.y - this.context.mapUpperLeftPosition.y) * this.context.squareSize.y - 8) + "px";
    people.style.left = (this.context.basePosition.x - this.context.mapUpperLeftPosition.x) * this.context.squareSize.x + "px";

    const image = document.createElement("img");
    image.src = "resources/images/" + this.context.peopleName + ".png";
    image.style.width = this.context.squareSize.x + "px";
    image.style.height = this.context.squareSize.y + "px";

    people.appendChild(image);
    peopleField.appendChild(people);

    this.peopleDom = people;
    this.peopleImage = image;

    this.context.collisionMap[this.context.currentPosition.y][this.context.currentPosition.x] = false;
  }

  autoMove() {
    let baseTime = null;
    
    const autoMoveOn = (now) => {
      if (!baseTime) {
        baseTime = now;
      }

      if (now - baseTime > this.context.moveTimeSpan) {
        this.context.continue = false;
        this.moveOn(this.context.randomKey.keyCode);
        baseTime = now;
      }

      window.requestAnimationFrame(autoMoveOn);
    };

    window.requestAnimationFrame(autoMoveOn);
  }
}
