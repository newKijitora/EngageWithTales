// コマンド関連の基底クラス
class CommandBoxViewBase {

  // コンストラクタ
  constructor(context, frameCanvases, charCanvases, name, assemblingElement) {
    // コンテキスト
    this.context = context;

    // フレームキャンバスと文字キャンバス
    this.frameCanvases = frameCanvases;
    this.charCanvases = charCanvases;

    // HTML要素
    this.memberSelecter = null;

    this.memberSelectFrame = null;
    this.commandMenus = null;
  }

  // フレームを描画する
  drawFrame(canvas, mapChipSize, textures, rows, columns) {
    const context = canvas.getContext("2d");

    // 背景色の描画
    context.fillStyle = this.context.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // フレームの描画
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        // 左上コーナー
        if (i + j == 0) {
          context.drawImage(textures[0], mapChipSize.x * j, mapChipSize.y * i);
          continue;
        }
        
        // 右上コーナー
        if (i == 0 && j == columns - 1) {
          context.drawImage(textures[3], mapChipSize.x * j, mapChipSize.y * i);
          continue;
        }
        
        // 右下コーナー
        if (i + j == (rows -1 ) + (columns - 1)) {
          context.drawImage(textures[2], mapChipSize.x * j, mapChipSize.y * i);
          continue;
        }

        // 左下コーナー
        if (i == rows - 1 && j == 0) {
          context.drawImage(textures[1], mapChipSize.x * j, mapChipSize.y * i);
          continue;
        }

        // 左の縦ボーダー
        if (i == 0) {
          context.drawImage(textures[5], mapChipSize.x * j, mapChipSize.y * i);
          continue;
        }

        // 上の横ボーダー
        if (j == 0) {
          context.drawImage(textures[4], mapChipSize.x * j, mapChipSize.y * i);
          continue;
        }

        // 下の横ボーダー
        if (i == rows - 1) {
          context.drawImage(textures[7], mapChipSize.x * j, mapChipSize.y * i);
          continue;
        }

        // 右の縦ボーダー
        if (j == columns - 1) {
          context.drawImage(textures[6], mapChipSize.x * j, mapChipSize.y * i);
          continue;
        }
      }
    }
  }

  // オープン
  open(keyCode) {
    if (keyCode == this.context.openKey.keyCode && this.context.canOpen) {
      
      this.memberSelecter.style.display = "block";

      this.context.viewState = "opened";
      this.context.commandMenu.commandBox.isChildOpened = true;
    }
  }

  // クローズ
  close(keyCode) {
    if (keyCode == this.context.closeKey.keyCode && this.context.canClose) {
      this.memberSelecter.style.display = "none";
      this.resetCommandMenuSelection();
      this.context.viewState = "closed";
    }
  }

  // 選択状態の変更
  selectionChange(keyCode) {
    if (!this.context.canSelectionChange) {
      return;
    }

    let key = null;
    let destination = null;

    key = this.context.getKey(keyCode);
    if (!key) {
      return;
    }

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
        const nextPositionIsOutOfRange = !((0 <= nextPosition.x && nextPosition.x <= this.context.commandMenus[0].length - 1) && (0 <= nextPosition.y && nextPosition.y <= this.context.commandMenus.length - 1));

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
        nextCommand.showCommandPointer(this.charCanvases);
        
        this.context.currentCommandMenu = nextCommand.context;

        return;
      }
    }
  }

  // コマンドメニューの選択状態をリセットする
  resetCommandMenuSelection() {
    for (let i = 0; i < this.commandMenus.length; i++) {
      for (let j = 0; j < this.commandMenus[i].length; j++) {
        if (!this.commandMenus[i][j].context.isSelected) {
          continue;
        }

        this.commandMenus[i][j].context.isSelected = false;
        this.commandMenus[i][j].hideCommandPointer();

        this.commandMenus[0][0].context.isSelected = true;
        this.commandMenus[0][0].showCommandPointer(this.charCanvases);

        this.context.currentCommandMenu = this.commandMenus[0][0].context;
        //this.context.textAreaContext.firstThrough = true;
      }
    }
  }
}
