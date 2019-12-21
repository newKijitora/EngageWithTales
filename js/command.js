/*****************************
 * コマンドクラス            *
 *****************************/

class Command {
  
  // コンストラクタ
  constructor() {
    this.entity = document.getElementById("command"); // コマンドのウィンドウ
    this.pointer = document.getElementById("command-pointer"); // コマンドのカーソル
    this.chrNameBx = document.getElementById("chrName_box");
    this.cntBx = document.getElementById("cnt_bx");
    this.pointer.style.left = "0px";
    this.pointer.style.top = "0px";
    this.chrSlct = document.getElementById("chrSlct");
    this.pare = document.getElementById("mntr");
    this.pare.appendChild(this.entity);
    
    // 初期化
    this.bool = false;
    this.status = "closed";
    this.kcd = 74; // キーボード「j」キー
    this.pntrNum = 0;
    this.blPos = 0;
  }

  // コンストイン
  cnstIn() {
    Command.inst.push(this);
    return this;
  }

  // カーソルを動かす：キーダウンイベントのイベントハンドラー
  movePointer(event) {
    // トーク状態の場合はキャンセル
    if (this.status == "talking") {
      return false;
    }

    if (!this.bool) {
      return false;
    }

    let keyCode = event.keyCode;

    switch (keyCode) {
      case 65: // 左
        if (parseInt(this.pointer.style.left) != 0 && this.status != "selected")
          this.pointer.style.left = parseInt(this.pointer.style.left) - 120 + "px";
          break;
      case 68: // 右
        if (parseInt(this.pointer.style.left) != 120 && this.status != "selected")
          this.pointer.style.left = parseInt(this.pointer.style.left) + 120 + "px";
          break;
      case 83: // 下
        if (parseInt(this.pointer.style.top) != 64)
          this.pointer.style.top = parseInt(this.pointer.style.top) + 32 + "px";
          break;
      case 87: // 上
        if (parseInt(this.pointer.style.top) != 0)
          this.pointer.style.top = parseInt(this.pointer.style.top) - 32 + "px";
          break;

      default: break;
    }
  }
  
  // コマンドを開く
  open(event) {
    let keyCode = event.keyCode;

    // キャンセルボタンであればコマンドを閉じる
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
          break;
        default:
          break;
      }
    }
  }
  
  // コマンドを選択したときの動作
   select() {
     let selection = parseInt(this.pointer.style.top) + parseInt(this.pointer.style.left);
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
    this.pointer.style.top = "0px";
    this.pointer.style.left = "0px";
    this.chrNameBx.appendChild(this.pointer);
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
    this.status = "talking";
    Talk.inst[0].open(4);
    Talk.inst[0].bl = true;
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
    this.cntBx.appendChild(this.pointer);

    Talk.inst[0].close();
    Status.inst[0].cls();
    Command.inst[0].pointer.style.left = "0px";
    Command.inst[0].pointer.style.top = "0px";
    Talk.inst[0].bl = false;
    
    // 人々の動きを再開する
    People.move();
  }

  static inst = [];
};