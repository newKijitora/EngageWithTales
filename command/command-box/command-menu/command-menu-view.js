// コマンドメニューのビュー
class CommandMenuView {

  constructor(controller) {
    this.controller = controller;

    this.commandMenu = null;
    this.commandPointer = null;
    this.memberSelecter = null;

    this.assemblingElements();

    if (this.controller.isSelected) {
      this.showCommandPointer();
    } else {
      this.hideCommandPointer();
    }
  }

  // コマンドポインターを表示
  showCommandPointer() {
    this.commandPointer.innerText = "▶";
  }

  // コマンドポインターを非表示
  hideCommandPointer() {
    this.commandPointer.innerText = "";
  }

  // HTML要素の生成
  assemblingElements() {
    const commandMenu = document.createElement("div");
    commandMenu.classList.add("command-content");
    
    commandMenu.style.width = this.controller.size.x + "px";
    commandMenu.style.height = this.controller.size.y + "px";
    commandMenu.style.position = "relative";
    commandMenu.style.display = "flex";

    const commandPointer = document.createElement("div");
    commandPointer.classList.add("command-pointer");
    commandPointer.style.width = "20px";
    commandPointer.style.paddingLeft = "5px";
    commandPointer.innerText = "▶";

    const commandText = document.createElement("div");
    commandText.innerText = this.controller.menuName;
    commandText.style.width = "98px";

    commandMenu.appendChild(commandPointer);
    commandMenu.appendChild(commandText);

    this.commandMenu = commandMenu;
    this.commandPointer = commandPointer;

    if (this.controller.isMemberSelectCommand) {
      const memberSelecter = new MemberSelecterView(this.controller.memberSelecterController);
      memberSelecter.memberSelecter.style.top = this.controller.memberSelecterPosition.y + "px";
      memberSelecter.memberSelecter.style.left = this.controller.memberSelecterPosition.x + "px";
    
      commandMenu.appendChild(memberSelecter.memberSelecter);

      this.memberSelecter = memberSelecter.memberSelecter;
    }
  }
}
