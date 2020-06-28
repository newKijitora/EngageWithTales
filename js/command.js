/*****************************
 * コマンドクラス            *
 *****************************/

class Command {
  // コンストラクタ
  constructor(idName) {
    this.entity = document.getElementById(idName); // コマンドのウィンドウ
    this.pointer = new Pointer("command-pointer");

    this.chrNameBx = document.getElementById("chrName_box");
    this.chrNameBx2 = document.getElementById("chrName_box2");
    this.chrNameBx3 = document.getElementById("chrName_box3");
    
    this.strengthWindow = document.getElementById("strength-window");
    this.cntBx = document.getElementById("cnt_bx");
    
    this.chrSlct = document.getElementById("chrSlct");
    this.chrSlct2 = document.getElementById("chrSlct2");
    this.chrSlct3 = document.getElementById("chrSlct3");

    this.pare = document.getElementById("mntr");
    this.pare.appendChild(this.entity);
    
    // 初期化
    this.bool = false;
    this.status = "closed";
    this.kcd = 74; // キーボード「j」キー
    this.pntrNum = 0;
    this.blPos = 0;

    Command.inst.push(this);

    window.addEventListener("keydown", event => this.open(event), false);
    window.addEventListener("keydown", event => this.movePointer(event), false);
  }

  // カーソルを動かす：キーダウンイベントのイベントハンドラー
  movePointer(event) {
    if (this.status == "talking") {
      return false;
    }

    if (!this.bool) {
      return false;
    }

    const keyCode = event.keyCode;

    switch (keyCode) {
      case 65: // 左
        if (this.pointer.x != 0 && this.status != "selected") {
          this.pointer.moveLeft();
        }
        break;
      case 68: // 右
        if (this.pointer.x != 120 && this.status != "selected") {
          this.pointer.moveRight();
        }
        break;
      case 83: // 下
        if ((this.status != "selected" && this.pointer.y != 64) || (this.status == "selected" && this.pointer.y != 32 * (Party.inst[0].member.length - 1))) {
          this.pointer.moveBottom();
        }
        break;
      case 87: // 上
        if (this.pointer.y != 0) {
          this.pointer.moveTop();
        }
        break;

      default: break;
    }
  }
  
  // コマンドを開く
  open(event) {
    const keyCode = event.keyCode;

    if (keyCode == 75) {
      this.close();
    }

    if (keyCode == this.kcd && Talk.inst[0].fin == true) {
      this.bool = true;
      
      switch (this.status) {
        case "cmd":
          this.select();
          break;    
        case "talking":
          this.close();
          break;
        case "closed":
          this.cmd();
          break;
        case "selected":
          Status.inst[0].shw();
        case "strength":

          break;

        default: break;
      }
    }
  }
  
  // コマンドを選択したときの動作
  select() {
    const selection = this.pointer.x + this.pointer.y;
    switch (selection) {
    // 「はなす」コマンド
    case 0:
      this.talk();
      break;
    // 「つよさ」コマンド
    case 32:
      this.strng();
      break;
    // 「そうび」コマンド
    case 64:
      this.equipment();
      break;
    // 「じゅもん」コマンド
    case 120:
      this.magic();
      break;
    // 「どうぐ」コマンド
    case 152:
      this.tool();
      break;
    // 「しらべる」コマンド
    case 184:
      this.search();
      break;
    }
  }
  
  // コマンドを表示する
  cmd() {
    this.status = "cmd";
    this.entity.style.display = "block";

    // 動いている人々の動きを止める
    People.stop();
  }

  // 「はなす」コマンド
  talk() {
    this.status = "talking";
    People.talk(6);
  }

  // 「つよさ」コマンド
  strng() {
    this.status = "selected";
    this.pointer.setPosition(0, 0);
    this.chrNameBx.appendChild(this.pointer.element);
    // this.strengthWindow.style.display = block;
    // this.strengthWindow.innnerText = Party.inst[0].member[(this.pointer.y / 32)].name;
    Status.inst[0].slct();
  }
  
  // 「そうび」コマンド
  equipment() {
    this.status = "talking";
    Talk.inst[0].open(5);
    Talk.inst[0].bl = true;
  }

  // 「じゅもん」コマンド
  magic() {
    this.status = "talking";
    Talk.inst[0].open(7);
    Talk.inst[0].bl = true;
  }

  // 「しらべる」コマンド
  search() {
    this.status = "talking";
    Talk.inst[0].open(0);
    Talk.inst[0].bl = true;
  }

  // 「どうぐ」コマンド
  tool() {
    this.status = "selected";
    this.pointer.setPosition(0, 0);
    this.chrNameBx2.appendChild(this.pointer.element);
    Status.inst[0].slctTool();
    // this.status = "talking";
    // Talk.inst[0].open(4);
    // Talk.inst[0].bl = true;
  }

  // コマンドを閉じる
  close() {
    // トーク状態ならキャンセル
    if (!Talk.inst[0].fin) {
      return;
    }

    this.status = "closed";
    this.bool = false;
    this.entity.style.display = "none";
    this.chrSlct.style.display = "none";
    this.chrSlct2.style.display = "none";
    this.cntBx.appendChild(this.pointer.element);

    Talk.inst[0].close();
    Status.inst[0].cls();
    Command.inst[0].pointer.x = 0;
    Command.inst[0].pointer.y = 0;
    Talk.inst[0].bl = false;
    
    // 人々の動きを再開する
    People.move();
  }

  static inst = [];
};