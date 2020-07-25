// コマンドメニューのビュー
class CommandMenuView {

  constructor(controller, commandText) {
    this.controller = controller;

    this.text = commandText;

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
    // コマンドメニューのコンテナ
    const commandMenu = document.createElement("div");
    commandMenu.classList.add("command-content");
    
    commandMenu.style.width = this.controller.size.x + "px";
    commandMenu.style.height = this.controller.size.y + "px";
    commandMenu.style.position = "relative";
    commandMenu.style.display = "flex";

    const commandPointer = document.createElement("canvas");
    commandPointer.classList.add("command-pointer");
    commandPointer.width = 16;
    commandPointer.height = 32;

    const commandText = document.createElement("canvas");
    commandText.width = 64;
    commandText.height = 32;

    commandMenu.appendChild(commandPointer);
    commandMenu.appendChild(commandText);

    this.commandMenu = commandMenu;
    this.commandPointer = commandPointer;
    this.commandText = commandText;

    // if (this.controller.isMemberSelectCommand) {
    //   const memberSelecter = new MemberSelecterView(this.controller.memberSelecterController);
    //   memberSelecter.memberSelecter.style.top = this.controller.memberSelecterPosition.y + "px";
    //   memberSelecter.memberSelecter.style.left = this.controller.memberSelecterPosition.x + "px";
    
    //   commandMenu.appendChild(memberSelecter.memberSelecter);

    //   this.memberSelecter = memberSelecter.memberSelecter;
    // }
  }

  draw(textures)
  {
    var context = this.commandPointer.getContext("2d");
    context.drawImage(textures["矢"], 0, 0);

    var context2 = this.commandText.getContext("2d");
    for (let i = 0; i <this.text.length; i++) {
      context2.drawImage(textures[this.text[i]], i * 16, 0);
    }
  }
}
