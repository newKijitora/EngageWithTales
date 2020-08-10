// メンバーステータスのコントローラークラス
class MemberStatusView {
  // コンストラクタ
  constructor(controller) {
    this.controller = controller;

    this.memberStatus = null;
    this.memberStatusInner = null;
    this.assemblingElements();

    this.memberStatus.style.display = "none";

    window.addEventListener("keydown", (event) => this.open(event.keyCode));
    window.addEventListener("keydown", (event) => this.close(event.keyCode));
  }

  // オープン
  open(keyCode) {
    if (keyCode == this.controller.openKey.keyCode && this.controller.canOpen) {
      this.memberStatus.style.display = "block";
      this.controller.state = "opened";
      this.controller.context.isChildOpened = true;
    }
  }

  // クローズ
  close(keyCode) {
    if (keyCode == this.controller.closeKey.keyCode && this.controller.canClose) {
      this.memberStatus.style.display = "none";
      this.controller.state = "closed";
    }
  }

  // HTML要素の生成
  assemblingElements() {
    const memberStatusOuter = document.createElement("div");
    memberStatusOuter.setAttribute("id", "member-status-outer");
    memberStatusOuter.style.left = "447px";
    memberStatusOuter.style.top = "205px";
    memberStatusOuter.style.width = "350px";

    const memberStatus = document.createElement("div");
    memberStatus.setAttribute("id", "member-status");
    memberStatus.style.width = "330px";

    const character = this.controller.memberCharacters[0];
    const delimiter = "：";
    
    const memberName = this.createStatus("なまえ", character.name, delimiter);
    const memberStrength = this.createStatus("つよさ", character.strength, delimiter);
    const memberSpeed = this.createStatus("すばやさ", character.speed, delimiter);
    const memberTrunk = this.createStatus("たいりょく", character.trunk, delimiter);
    const memberHp = this.createStatus("HP", character.hp, delimiter);
    const memberMp = this.createStatus("MP", character.mp, delimiter);
    
    memberStatus.appendChild(memberName);
    memberStatus.appendChild(memberStrength);
    memberStatus.appendChild(memberSpeed);
    memberStatus.appendChild(memberTrunk);
    memberStatus.appendChild(memberHp);
    memberStatus.appendChild(memberMp);

    memberStatusOuter.appendChild(memberStatus);
    document.body.appendChild(memberStatusOuter);

    this.memberStatus = memberStatusOuter;
    this.memberStatusInner = memberStatus;
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