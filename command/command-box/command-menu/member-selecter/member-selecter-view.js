// キャラクターセレクターのビュークラス
class MemberSelecterView {
  // コンストラクタ
  constructor(controller) {
    this.controller = controller;
    this.memberSelecter = null;

    this.assemblingElements();

    window.addEventListener("keydown", (event) => this.open(event.keyCode), false);
    window.addEventListener("keyup", (event) => this.close(event.keyCode), false);
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

  // HTML要素の組成
  assemblingElements() {
    const selecter = document.createElement("div");
    selecter.setAttribute("id", "characterSelecter");
    selecter.style.display = "none";

    const selectTitle = document.createElement("div");
    selectTitle.setAttribute("id", "selecter-title");
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

    const selectField = document.createElement("div");
    selectField.setAttribute("id", "characterSelecterInner");

    selecter.appendChild(selectField);

    const characterNames = new Array(this.controller.characters.length);
    
    for (let i = 0; i < characterNames.length; i++) {
      const nameCase = document.createElement("div");
      const arrow = document.createElement("div");
      arrow.innerText = "▶";
      const characterName = document.createElement("div");
      nameCase.appendChild(arrow);
      nameCase.appendChild(characterName);
      nameCase.style.display = "flex";
      nameCase.classList.add("characterName");
      characterName.innerText = this.controller.characters[i].name;
      selectField.appendChild(nameCase);
    }

    this.memberSelecter = selecter;

    new MemberStatusView(this.controller.memberStatusController);
  }
}