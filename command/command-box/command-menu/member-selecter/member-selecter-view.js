// メンバーセレクターのビュークラス
class MemberSelecterView extends CommandBoxViewBase {

  // コンストラクタ
  constructor(controller) { super();

    // コントローラー
    this.controller = controller;

    // HTML要素
    this.memberSelecter = null;

    // HTML要素の生成
    this.assemblingElements();

    // イベントリスナの設定
    window.addEventListener("keydown", (event) => this.open(event.keyCode), false);
    window.addEventListener("keyup", (event) => this.close(event.keyCode), false);
  }
  
  // HTML要素の生成
  assemblingElements() {

    // メンバーセレクターのコンテナ
    const selecter = document.createElement("div");
    selecter.style.position = "absolute";
    selecter.style.top = 0;
    selecter.style.left = 0;
    selecter.style.display = "none";

    // メンバーセレクターのフレーム
    const memberSelectFrame = document.createElement("canvas");
    memberSelectFrame.style.display = "block";
    memberSelectFrame.width = 4 * 32;
    memberSelectFrame.height = 32 * 4;

    // メンバーのコンテナ
    const selectTitle = document.createElement("div");
    selectTitle.style.position = "absolute";
    selectTitle.style.top = 0;
    selectTitle.style.left = 0;
    selectTitle.style.display = "flex";

    // メンバーポインター
    const memberPointer = document.createElement("canvas");
    memberPointer.width = 16;
    memberPointer.height = 32;

    // メンバーの名前
    const memberName = document.createElement("canvas");
    memberName.width = 64; // 4文字分
    memberName.height = 32;

    // メンバーのコンテナにポインターと名前を格納
    selectTitle.appendChild(memberPointer);
    selectTitle.appendChild(memberName);

    // セレクターのコンテナにフレームを格納
    selecter.appendChild(memberSelectFrame);

    selectTitle.innerText = this.controller.title;

    if (selectTitle.innerText.length == 3) {
      selectTitle.innerText = this.controller.title + "　";
    }
    let spacer = -2
    if (this.controller.context.memberSelecterPosition.x == -5) {
      spacer = 8;
    }
    selectTitle.style.left = (this.controller.context.memberSelecterPosition.x + 25 + spacer) + "px";

    selecter.appendChild(selectTitle);

    this.memberSelectFrame = memberSelectFrame;
    this.memberSelecter = selecter;

    //new MemberStatusView(this.controller.memberStatusController);
  }

  // メンバーの名前の描画
  drawMemberName(name) {
    
  }

  // フレームを描画する
  drawFrame(textures) {
    const rows = 4;
    const columns = 4;
    const size = new Size(32, 32);

    // 基底クラスのフレーム描画呼び出し
    super.drawFrame(this.memberSelectFrame, size, textures, rows, columns);
  }

  // オープン
  open(keyCode) {
    if (keyCode == this.controller.openKey.keyCode && this.controller.canOpen) {
      this.memberSelecter.style.display = "block";
      this.controller.state = "opened";
    }
  }

  // クローズ
  close(keyCode) {
    if (keyCode == this.controller.closeKey.keyCode && this.controller.canClose) {
      this.memberSelecter.style.display = "none";
      this.controller.state = "closed";
    }
  }
}