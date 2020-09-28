// ------------------------------------------------------------------
// テキストエリアのビュークラス
// ------------------------------------------------------------------

class TextAreaView extends FrameView {
  
  // コンストラクタ
  constructor(context, frameCanvases, charCanvases) { super(context, frameCanvases, charCanvases);
    // HTML要素
    this.htmlElement = null;
    this.textFrame = null;

    this.cells = new Array(this.context.numberOfRows);
    
    for (let i = 0; i < this.context.numberOfRows; i++) {
      this.cells[i] = new Array(this.context.numberOfCells);
    }

    // HTML要素の組成
    this.assemblingElements();

    // イベントリスナの設定
    window.addEventListener('keydown', (event) => this.open(event.keyCode), false);
    window.addEventListener('keydown', (event) => this.close(event.keyCode), false);
  } 
  
  // オープン
  open(keyCode) {
    if (keyCode == this.context.openKey.keyCode && this.context.canOpen) {
      this.context.isProgress = true;
      this.context.viewState = 'opened';
      this.showView();
      this.readText(this.context.textSet[this.context.readIndex], this.context.textSpeed);
    } else if (keyCode == this.context.openKey.keyCode && this.context.canReadContinue) {
      this.context.canReadContinue = false;
      this.clearText();
      this.readText(this.context.textSet[this.context.readIndex], this.context.textSpeed);
    } else if (keyCode == this.context.openKey.keyCode) {
      this.close(this.context.closeKey.keyCode);
    }
  }

  // クローズ
  close(keyCode) {
    if (keyCode == this.context.closeKey.keyCode && !this.context.isProgress && this.context.canClose) {
      this.hideView();
      this.clearText();
      this.context.viewState = 'closed';
    }
  }

  // テキストのリード
  readText(text, textSpeed) {
    let startTime = null;
    
    // テキストの現在位置
    let textPosition = 0;

    let row = 0;
    let cellPosition = 0;

    for (let i = 0; i < this.context.numberOfRows; i++) {
      for (let j = 0; j < this.context.numberOfCells; j++) {
        const context = this.cells[i][j].getContext('2d');
        context.clearRect(0, 0, 16, 32);
      }
    }

    // 文字を読み込む
    const readCharacter = (now) => {
      if (!startTime) {
        startTime = now;
      }

      if (now - startTime > textSpeed) {
        do {       
          if (text[textPosition] == '\n') {
            row++;
            cellPosition = 0;
            textPosition++;
          }

          if (text[textPosition] == '　') {
            if (cellPosition + 1 > this.context.numberOfCells - 1) {
              row++;
              cellPosition = 0;
            } else {
              cellPosition++;
            }
            textPosition++;
          }
        } while (text[textPosition] == '\n' || text[textPosition] == '　');

        const context = this.cells[row][cellPosition].getContext('2d');
        context.drawImage(this.charCanvases[text[textPosition]], 0, 0);

        startTime = now;
        textPosition++;
        cellPosition++;
      }
    
      if (cellPosition > this.context.numberOfCells - 1) {
        cellPosition = 0;
        row++;
      }

      if (textPosition < text.length && row < this.context.numberOfRows) {
        window.requestAnimationFrame(readCharacter);
      } else {
        this.context.readIndex++;
        
        if (this.context.textSet.length > this.context.readIndex) {
          this.context.canReadContinue = true;          
        } else {
          this.context.readIndex = 0;
          this.context.isProgress = false;
          this.context.canReadContinue = false;
        }
      }
    }

    window.requestAnimationFrame(readCharacter);
  }

  // テキストのクリア
  clearText() {
    for (let i = 0; i < this.textCells.length; i++) {
      this.textCells.item(i).innerText = '';
    }
  }

  // HTML要素の生成
  assemblingElements() {
    // テキストエリアのフレーム
    const textFrame = document.createElement('canvas');
    textFrame.width = this.context.squareSize.x * this.context.textAreaColumns;
    textFrame.height = this.context.squareSize.y * this.context.textAreaRows;
    textFrame.style.display = 'block';

    // テキストエリアのインナー
    const textField = document.createElement('div');
    textField.style.position = 'absolute';
    textField.style.top = '16px';
    textField.style.left = '16px';
    
    // セルの生成
    for (let i = 0; i < this.context.numberOfRows; i++) {
      // 行を生成
      const row = document.createElement('p');

      // セルを生成して行に追加
      for (let j = 0; j < this.context.numberOfCells; j++) {
        const cell = document.createElement('canvas');
        cell.width = this.context.textSize.x;
        cell.height = this.context.textSize.y;
        cell.style.verticalAlign = 'bottom';

        row.appendChild(cell);
        this.cells[i][j] = cell;
      }

      // インナーに行を追加
      textField.appendChild(row);
    }

    // テキストエリアをドキュメントに追加
    const textArea = document.createElement('div');
    textArea.style.position = 'absolute';
    textArea.style.top = this.context.squareSize.y * this.context.commandBoxPosition.y + 'px';
    textArea.style.left = this.context.squareSize.x * this.context.commandBoxPosition.x + 'px';
    textArea.style.zIndex = this.context.zIndexBase;
    textArea.style.display = 'none';

    textArea.appendChild(textFrame);
    
    const monitor = document.getElementById('world');
    textArea.appendChild(textField);
    monitor.appendChild(textArea);

    this.htmlElement = textArea;
    this.textFrame = textFrame;
    this.textCells = document.getElementsByClassName('textCell');
  }
}
