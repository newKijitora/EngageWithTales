// ------------------------------------------------------------------
// メンバーのステータスのビュークラス
// ------------------------------------------------------------------

class MemberStatusView extends FrameView {
  // コンストラクタ
  constructor(context, frameCanvases, charCanvases) { super(context, frameCanvases, charCanvases);
    // HTML要素の組成
    this.assemblingElements();
    
    // イベントリスナの設定
    window.addEventListener('keydown', (event) => this.open(event.keyCode), false);
    window.addEventListener('keydown', (event) => this.close(event.keyCode), false);
  }
  
  // HTML要素の生成
  assemblingElements() {
    // メンバーステータスのコンテナ
    const memberStatus = document.createElement("div");
    memberStatus.style.position = "absolute";
    memberStatus.style.top = 0;
    memberStatus.style.left = "128px";
    memberStatus.style.display = "none";

    // コマンドのフレーム（バックグラウンド）
    const memberStatusFrame = document.createElement("canvas");
    memberStatusFrame.style.display = "block";
    memberStatusFrame.width = 192;
    memberStatusFrame.height = 224;

    memberStatus.appendChild(memberStatusFrame);

    // メンバーステータス
    const memberStatusField = document.createElement("div");
    memberStatusField.style.position = "absolute";
    memberStatusField.style.top = 0;
    memberStatusField.style.left = 0;
    memberStatusField.style.paddingLeft = this.context.squareSize.x / 2 + "px";
    memberStatusField.style.paddingTop = this.context.squareSize.y / 2 + "px";
    memberStatusField.style.display = "flex";
    memberStatusField.style.flexWrap = "wrap";
    memberStatusField.style.width = "160px";
    
    memberStatus.appendChild(memberStatusField);

    this.drawFrame(memberStatusFrame, this.context.squareSize, this.frameCanvases, 7, 6);

    this.htmlElement = memberStatus;
    this.memberStatusFrameCanvase = memberStatusFrame;
  }

  // ステータス要素を生成
  createStatus(statusTitle, statusValue, delimiter) {
    const box = document.createElement("div");
    const title = document.createElement("div");
    title.innerText = statusTitle + delimiter;
    const value = document.createElement("div");
    value.innerText = statusValue;
    
    box.style.display = "flex";
    box.appendChild(title);
    box.appendChild(value);
    
    return box;
  }
}