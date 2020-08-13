// ------------------------------------------------------------------
// テキストエリアのビュー
// ------------------------------------------------------------------

class TextAreaView extends CommandBoxViewBase {
  
  // コンストラクタ
  constructor(context, frameCanvases, charCanvases) { super(context);
    // コントローラ
    this.controller = context;

    // HTML要素
    this.textArea = null;
    this.textFrame = null;
    this.textFrameCanvases = frameCanvases;

    this.charCanvases = charCanvases;

    this.cells = new Array(this.controller.numberOfRows);
    for (let i = 0; i < this.controller.numberOfRows; i++) {
      this.cells[i] = new Array(this.controller.numberOfCells);
    }

    // HTML要素の組成
    this.assemblingElements();

    // イベントリスナ
    window.addEventListener("keydown", (event) => this.open(event.keyCode), false);
    window.addEventListener("keydown", (event) => this.close(event.keyCode), false);
  } 
  
  // オープン
  open(keyCode) {
    if (keyCode == this.controller.openKeyCode && this.controller.canOpen) {
      this.controller.isProgress = true;
      this.controller.viewState = "opened";
      this.showView();
      this.readText(this.controller.textSet[this.controller.readIndex], this.controller.textSpeed);
    } else if (keyCode == this.controller.openKeyCode && this.controller.canReadContinue) {
      this.controller.canReadContinue = false;
      this.clearText();
      this.readText(this.controller.textSet[this.controller.readIndex], this.controller.textSpeed);
    } else if (keyCode == this.controller.openKeyCode) {
      this.close(this.controller.closeKeyCode);
    }
  }

  // クローズ
  close(keyCode) {
    if (keyCode == this.controller.closeKeyCode && !this.controller.isProgress && this.controller.canClose) {
      this.hideView();
      this.clearText();
      this.controller.viewState = "closed";
    }
  }

  // テキストのリード
  readText(text, textSpeed) {
    let startTime = null;
    let textPosition = 0;
    let row = 0;
    let cellPosition = 0;

    for (let i = 0; i < this.controller.numberOfRows; i++) {
      for (let j = 0; j < this.controller.numberOfCells; j++) {
        const context = this.cells[i][j].getContext("2d");
        context.clearRect(0, 0, 16, 32);
      }
    }

    const readCharacter = (now) => {
      if (!startTime) {
        startTime = now;
      }

      if (now - startTime > textSpeed) {
        do {       
          if (text[textPosition] == "\n") {
            row++;
            cellPosition = 0;
            textPosition++;
          }

          if (text[textPosition] == "　") {
            if (cellPosition + 1 > this.controller.numberOfCells - 1) {
              row++;
              cellPosition = 0;
            } else {
              cellPosition++;
            }
            textPosition++;
          }
        } while (text[textPosition] == "\n" || text[textPosition] == "　");

        const context = this.cells[row][cellPosition].getContext("2d");
        context.drawImage(this.charCanvases[text[textPosition]], 0, 0);

        startTime = now;
        textPosition++;
        cellPosition++;
      }
    
      if (cellPosition > this.controller.numberOfCells - 1) {
        cellPosition = 0;
        row++;
      }

      if (textPosition < text.length && row < this.controller.numberOfRows) {
        window.requestAnimationFrame(readCharacter);
      } else {
        this.controller.readIndex++;
        
        if (this.controller.textSet.length > this.controller.readIndex) {
          this.controller.canReadContinue = true;          
        } else {
          this.controller.readIndex = 0;
          this.controller.isProgress = false;
          this.controller.canReadContinue = false;
        }
      }
    }

    window.requestAnimationFrame(readCharacter);
  }

  // テキストのクリア
  clearText() {
    for (let i = 0; i < this.textCells.length; i++) {
      this.textCells.item(i).innerText = "";
    }
  }

  // HTML要素の表示
  showView() {
    this.textArea.style.display = "block";
  }
  
  // HTML要素の非表示
  hideView() {
    this.textArea.style.display = "none";
  }

  // HTML要素の生成
  assemblingElements() {
    // テキストエリアのフレーム
    const textFrame = document.createElement("canvas");
    textFrame.width = this.controller.squareSize.x * this.controller.textAreaColumns;
    textFrame.height = this.controller.squareSize.y * this.controller.textAreaRows;
    textFrame.style.display = "block";

    // テキストエリアのインナー
    const textField = document.createElement("div");
    textField.style.position = "absolute";
    textField.style.top = "16px";
    textField.style.left = "16px";
    
    // セルの生成
    for (let i = 0; i < this.controller.numberOfRows; i++) {
      // 行を生成
      const row = document.createElement("p");

      // セルを生成して行に追加
      for (let j = 0; j < this.controller.numberOfCells; j++) {
        const cell = document.createElement("canvas");
        cell.width = 16;
        cell.height = 32;
        cell.style.verticalAlign = "bottom";

        row.appendChild(cell);
        this.cells[i][j] = cell;
      }

      // インナーに行を追加
      textField.appendChild(row);
    }

    // テキストエリアをドキュメントに追加
    const textArea = document.createElement("div");
    textArea.style.position = "absolute";
    textArea.style.top = this.controller.squareSize.y * 11 + "px";
    textArea.style.left = this.controller.squareSize.x * 5 + "px";
    textArea.style.zIndex = this.controller.zIndexBase;
    textArea.style.display = "none";

    textArea.appendChild(textFrame);
    
    const monitor = document.getElementById("world");
    textArea.appendChild(textField);
    monitor.appendChild(textArea);

    this.textArea = textArea;
    this.textFrame = textFrame;
    this.textCells = document.getElementsByClassName("textCell");
  }
}
