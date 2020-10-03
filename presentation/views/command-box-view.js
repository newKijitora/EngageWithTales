// ------------------------------------------------------------------
// コマンドボックスのビュークラス
// ------------------------------------------------------------------

class CommandBoxView extends SelectMenuView {

  // コンストラクタ
  constructor(context, canvases) { super(context, canvases);
    // HTML要素の組成
    this.assemblingElements();    

    // イベントリスナの設定
    window.addEventListener('keydown', (event) => this.open(event.keyCode), false);
    window.addEventListener('keydown', (event) => this.close(event.keyCode), false);
    window.addEventListener('keydown', (event) => this.selectionChange(event.keyCode), false);
  }

  // コマンドボックスを開く
  open(keyCode) {
    if (keyCode == this.context.openKey.keyCode && this.context.canOpen) {
      this.context.viewState = 'opened';
      this.showView();
    } else if (keyCode == this.context.openKey.keyCode && !this.context.currentCommandMenuContext.isMemberSelectCommand) {
      this.close(this.context.closeKey.keyCode);
    }
  }

  // コマンドボックスを閉じる
  close(keyCode) {
    if (keyCode == this.context.closeKey.keyCode && this.context.canClose) {
      this.hideView();
      this.resetCommandMenuSelection();
      this.context.viewState = 'closed';
    }
  }

  // コマンドメニューの選択状態をリセットする
  resetCommandMenuSelection() {
    for (let i = 0; i < this.commandMenus.length; i++) {
      for (let j = 0; j < this.commandMenus[i].length; j++) {

        if (this.commandMenus[i][j].context.textAreaContext) {
          this.commandMenus[i][j].context.textAreaContext.firstThrough = true;
        }

        if (!this.commandMenus[i][j].context.isSelected) {
          continue;
        }

        // 選択されていたコマンドの選択状態を解除
        this.commandMenus[i][j].context.isSelected = false;
        this.commandMenus[i][j].hideCommandPointer();

        // 初期位置のコマンドに選択状態を設定
        this.commandMenus[0][0].context.isSelected = true;
        this.commandMenus[0][0].showCommandPointer(this.canvases['char']);

        // コマンドメニューのコンテキストを初期化
        this.context.currentCommandMenuContext = this.commandMenus[0][0].context;
      }
    }
  }

  // 選択状態の変更
  selectionChange(keyCode) {
    if (!this.context.canSelectionChange) {
      return;
    }

    let key = null;
    let destination = null;
    
    // キーコードの振り分け（移動キー以外はカット）
    key = this.context.getKey(keyCode, false);
    if (!key) {
      return;
    }

    // 進行方向
    destination = key.name;

    for (let i = 0; i < this.commandMenus.length; i++) {
      for (let j = 0; j < this.commandMenus[i].length; j++) {
        if (!this.commandMenus[i][j].context.isSelected) {
          continue;
        }

        // 現在のコマンドメニューと位置情報
        const currentCommand = this.commandMenus[i][j];
        const currentPosition = currentCommand.context.position;

        // キー入力に応じた次の状態
        const nextPosition = new Position(currentPosition.x + this.context.getDestination(destination).left, currentPosition.y + this.context.getDestination(destination).top);
        const nextPositionIsOutOfRange = !((0 <= nextPosition.x && nextPosition.x <= 1) && (0 <= nextPosition.y && nextPosition.y <= this.commandMenus.length - 1));

        // outOfRangeならカット
        if (nextPositionIsOutOfRange) {
          return;
        }

        // 次のコマンドに状態遷移
        const nextCommand = this.commandMenus[nextPosition.y][nextPosition.x];
        
        // 以前のコマンドのポインターを非表示
        currentCommand.context.isSelected = false;
        currentCommand.hideCommandPointer();
        
        // 現在のコマンドのポインターを表示
        nextCommand.context.isSelected = true;
        nextCommand.showCommandPointer(this.canvases['char']);
        
        this.context.currentCommandMenuContext = nextCommand.context;

        return;
      }
    }
  }

  // HTML要素の生成
  assemblingElements() {
    // コマンドのコンテナ
    const commandBox = document.createElement('div');
    commandBox.style.position = 'absolute';
    commandBox.style.zIndex = this.context.zIndexBase;
    commandBox.style.left = this.context.commandBoxPosition.x * this.context.squareSize.x + 'px';
    commandBox.style.top = this.context.commandBoxPosition.y * this.context.squareSize.y + 'px';
    commandBox.style.display = 'none';

    // コマンドのフレーム（バックグラウンド）
    const commandFrameDOM = document.createElement('canvas');
    commandFrameDOM.style.display = 'block'
    commandFrameDOM.width = this.context.squareSize.x * this.context.commandBoxColumns;
    commandFrameDOM.height = this.context.squareSize.y * this.context.commandBoxRows;

    // コマンドメニューのセットを格納するコンテナ
    const selectField = document.createElement('div');
    selectField.style.position = 'absolute';
    selectField.style.top = 0;
    selectField.style.left = 0;
    selectField.style.paddingTop = this.context.squareSize.y / 2 + 'px';
    selectField.style.display = 'flex';
    selectField.style.flexWrap = 'wrap';
    selectField.style.width = '192px';

    commandBox.appendChild(commandFrameDOM);
    commandBox.appendChild(selectField);

    // モニターにコマンドボックスを格納
    const monitor = document.getElementById('world');
    monitor.appendChild(commandBox);

    this.htmlElement = commandBox;
    this.memberSelecterFrame = commandFrameDOM;
    this.selectField = selectField;

    // コマンドボックスのフレーム描画
    this.drawFrame(this.memberSelecterFrame, this.context.squareSize, this.canvases['commandFrame'], this.context.commandBoxRows, this.context.commandBoxColumns);

    // コマンドメニューのHTML要素を生成
    const commandMenus = new Array(this.context.commandMenus.length);

    for (let i = 0; i < commandMenus.length; i++) {
      commandMenus[i] = new Array(this.context.commandMenus[i].length);
      for (let j = 0; j < commandMenus[i].length; j++) {
        commandMenus[i][j] = new CommandMenuView(this.context.commandMenuContexts[i][j], this.canvases);
        
        // コマンドボックスの選択フィールド要素の子要素として追加
        this.selectField.appendChild(commandMenus[i][j].commandMenuDOM);
      }
    }

    // コマンドボックスのコマンドメニューに文字を描画する
    for (let i = 0; i < this.context.commandMenus.length; i++) {
      for (let j = 0; j < this.context.commandMenus[i].length; j++) {
        commandMenus[i][j].initialize(this.canvases['char']);

        // メンバーセレクトコマンド以外はカット
        if (!commandMenus[i][j].context.isMemberSelectCommand) {
          continue;
        }

        // メンバーセレクターのフレーム描画
        commandMenus[i][j].htmlElement.drawFrame(this.canvases['commandFrame']);

        // メンバーセレクターのコマンドメニューに文字を描画する
        for (let k = 0; k < commandMenus[i][j].htmlElement.commandMenus.length; k++) {
          for (let l = 0; l < commandMenus[i][j].htmlElement.commandMenus[k].length; l++) {
            commandMenus[i][j].htmlElement.commandMenus[k][l].initialize(this.canvases['char']);
          }
        }
      }
    }

    // CommandMenuViewクラスの配列を保持
    this.commandMenus = commandMenus;
  }
}
