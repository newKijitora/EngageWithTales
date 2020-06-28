// コマンドボックスのビュー
class CommandBoxView {

  constructor(controller) {
    // コントローラー 
    this.controller = controller;

    this.commandBox = null;
    this.commandMenus = null;

    // HTML要素の組成
    this.assemblingElements();    

    // イベントリスナ
    window.addEventListener("keydown", (event) => this.open(event.keyCode), false);
    window.addEventListener("keydown", (event) => this.close(event.keyCode), false);
    window.addEventListener("keydown", (event) => this.selectionChange(event.keyCode), false);
  }

  // コマンドボックスのオープン
  open(keyCode) {
    if (keyCode == this.controller.openKey.keyCode && this.controller.canOpen) {
      this.controller.viewState = "opened";
      this.showView();
    } else if (keyCode == this.controller.openKey.keyCode && !this.controller.currentCommandMenu.isMemberSelectCommand) {
      this.close(this.controller.closeKey.keyCode);
    }
  }

  // コマンドボックスのクローズ
  close(keyCode) {
    if (keyCode == this.controller.closeKey.keyCode && this.controller.canClose) {
      this.hideView();
      this.resetCommandMenuSelection();
      this.controller.viewState = "closed";
    }
  }

  // コマンドメニューの選択状態をリセットする
  resetCommandMenuSelection() {
    for (let i = 0; i < this.commandMenus.length; i++) {
      for (let j = 0; j < this.commandMenus[i].length; j++) {
        if (!this.commandMenus[i][j].controller.isSelected) {
          continue;
        }

        this.commandMenus[i][j].controller.isSelected = false;
        this.commandMenus[i][j].hideCommandPointer();

        this.commandMenus[0][0].controller.isSelected = true;
        this.commandMenus[0][0].showCommandPointer();
        this.controller.currentCommandMenu = this.commandMenus[0][0].controller;
        this.controller.textAreaController.firstThrough = true;

        return;
      }
    }
  }

  // 選択状態の変更
  selectionChange(keyCode) {
    if (!this.controller.canSelectionChange) {
      return;
    }

    let key = null;
    let destination = null;

    switch (keyCode) {
      case this.controller.leftKey.keyCode:
        key = this.controller.leftKey;
        destination = this.controller.destinations["left"];
        break;
      case this.controller.rightKey.keyCode:
        key = this.controller.rightKey;
        destination = this.controller.destinations["right"];
        break;
      case this.controller.topKey.keyCode:
        key = this.controller.topKey;
        destination = this.controller.destinations["top"];
        break;
      case this.controller.bottomKey.keyCode:
        key = this.controller.bottomKey;
        destination = this.controller.destinations["bottom"];
        break;
      default:
        return;
    }

    for (let i = 0; i < this.commandMenus.length; i++) {
      for (let j = 0; j < this.commandMenus[i].length; j++) {
        if (!this.commandMenus[i][j].controller.isSelected) {
          continue;
        }

        const currentCommand = this.commandMenus[i][j];
        const currentPosition = currentCommand.controller.position;

        const nextPosition = new Position(currentPosition.x + destination.left, currentPosition.y + destination.top);
        const nextPositionIsOutOfRange = !((0 <= nextPosition.x && nextPosition.x <= 1) && (0 <= nextPosition.y && nextPosition.y <= 2));

        if (nextPositionIsOutOfRange) {
          return;
        }

        const nextCommand = this.commandMenus[nextPosition.y][nextPosition.x];
        
        currentCommand.controller.isSelected = false;
        currentCommand.hideCommandPointer();
        
        nextCommand.controller.isSelected = true;
        nextCommand.showCommandPointer();
        
        this.controller.currentCommandMenu = nextCommand.controller;

        return;
      }
    }
  }

  // ビューの表示
  showView() {
    this.commandBox.style.display = "block";
  }

  // ビューの非表示
  hideView() {
    this.commandBox.style.display = "none";
  }

  // HTML要素の生成
  assemblingElements() {
    const commandBox = document.createElement("section");
    commandBox.setAttribute("id", "command-box");
    commandBox.classList.add("command-box-outer");
    commandBox.classList.add("display-none");
    commandBox.style.left = this.controller.position.x * this.controller.squareSize.x + "px";
    commandBox.style.top = this.controller.position.y * this.controller.squareSize.y + "px";

    const selectField = document.createElement("div");
    selectField.classList.add("select-field");
    selectField.classList.add("command-box-inner");

    const commandMenus = new Array(3);

    for (let i = 0; i < commandMenus.length; i++) {
      commandMenus[i] = new Array(2);
      for (let j = 0; j < commandMenus[i].length; j++) {
        commandMenus[i][j] = new CommandMenuView(this.controller.commandMenuControllers[i][j]);
        selectField.appendChild(commandMenus[i][j].commandMenu);
      }
    }
    
    const commandTitle = document.createElement("div");
    commandTitle.classList.add("command-title");
    commandTitle.innerText = "コマンド";

    commandBox.appendChild(commandTitle);
    commandBox.appendChild(selectField);

    const commandBoxLayer = document.createElement("div");
    commandBoxLayer.classList.add("layer");
    commandBoxLayer.style.zIndex = this.controller.zIndexBase;
    commandBoxLayer.appendChild(commandBox);

    const monitor = document.getElementById("world");
    monitor.appendChild(commandBoxLayer);

    this.commandBox = commandBox;
    this.commandMenus = commandMenus;
  }
}
