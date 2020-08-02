// テキストエリアのビュークラス
class TextAreaView {
  // コンストラクタ
  constructor(controller) {
    // コントローラ
    this.controller = controller;

    // HTML要素
    this.textArea = null;
    this.textFrame = null;
    this.textFrameCanvases = new Array(this.controller.commandTextures.length);

    this.charCanvases = {};

    this.cells = new Array(this.controller.numberOfRows);
    for (let i = 0; i < this.controller.numberOfRows; i++) {
      this.cells[i] = new Array(this.controller.numberOfCells);
    }

    // HTML要素の組成
    this.assemblingElements();

    this.loadImageChars();
    this.loadImages();

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
    textArea.style.left = this.controller.squareSize.x * 6 + "px";
    textArea.style.backgroundColor = "#020202";
    textArea.style.zIndex = this.controller.zIndexBase;
    textArea.style.display = "none";

    textArea.appendChild(textFrame);
    
    // テキストエリアにインナーを追加
    //textArea.appendChild(textField);

    const monitor = document.getElementById("world");
    textArea.appendChild(textField);
    monitor.appendChild(textArea);

    this.textArea = textArea;
    this.textFrame = textFrame;
    this.textCells = document.getElementsByClassName("textCell");
  }

  // 画像を読み込んでキャッシュする
  loadImages() {
    const images = new Array(this.controller.commandTextures.length);
    const mapChipSize = this.controller.squareSize;
    let loadedImageCount = 0;

    for (let i = 0; i < this.controller.commandTextures.length; i++) {
      images[i] = new Image();
      images[i].src = "resources/images/" + this.controller.commandTextures[i].texture + ".png";

      // 画像ロードごとのイベントハンドラー
      images[i].addEventListener("load", (event) => {
        if (++loadedImageCount < this.textFrameCanvases.length) {
          return;
        }
        
        for (let i = 0; i < this.textFrameCanvases.length; i++) {
          const textureCanvas = document.createElement("canvas");
          textureCanvas.width = mapChipSize.x;
          textureCanvas.height = mapChipSize.y;         

          const textureContext = textureCanvas.getContext("2d");
          textureContext.mozImageSmoothingEnabled = false;
          textureContext.webkitImageSmoothingEnabled = false;
          textureContext.msImageSmoothingEnabled = false;
          textureContext.imageSmoothingEnabled = false;

          textureContext.drawImage(images[i], 0, 0, images[i].width, images[i].height, 0, 0, mapChipSize.x, mapChipSize.y);
          this.textFrameCanvases[i] = textureCanvas;
        }

        this.drawTextFrame();

      }, false);
    }
  }

  // 文字画像を読み込んでキャッシュする
  loadImageChars() {

    // 文字画像をすべて取得する
    const images = new Array(this.controller.textTextures.length);
    let loadedImageCount = 0;

    // 画像の読み込みとロードイベントハンドラーの設定
    for (let i = 0; i < this.controller.textTextures.length; i++) {
      images[i] = new Image();
      images[i].src = "resources/images/" + this.controller.textTextures[i].texture + ".png";

      // 画像ロードごとのイベントハンドラー
      images[i].addEventListener("load", (event) => {
        if (++loadedImageCount < this.controller.textTextures.length) {
          return;
        }

        // すべての文字テクスチャーのキャンバスを生成する
        const soloCharCanvases = {};

        for (let i = 0; i < this.controller.textTextures.length; i++) {
          
          const textureCanvas = document.createElement("canvas");
          textureCanvas.width = this.controller.squareSize.x / 2;
          textureCanvas.height = this.controller.squareSize.y / 2;         

          const textureContext = textureCanvas.getContext("2d");
          textureContext.mozImageSmoothingEnabled = false;
          textureContext.webkitImageSmoothingEnabled = false;
          textureContext.msImageSmoothingEnabled = false;
          textureContext.imageSmoothingEnabled = false;

          textureContext.drawImage(images[i], 0, 0, images[i].width, images[i].height, 0, 0, textureCanvas.width, textureCanvas.height);
          soloCharCanvases[this.controller.textTextures[i].texture] = textureCanvas;
        }

        // ソロ文字を組み合わせて一文字分のキャンバスを生成する
        for (let i = 0; i < this.controller.mojis.length; i++) {

          const textureCanvas = document.createElement("canvas");
          textureCanvas.width = this.controller.squareSize.x / 2;
          textureCanvas.height = this.controller.squareSize.y;    
          
          const mainChar = soloCharCanvases[this.controller.mojis[i].texture1];
          const subChar = soloCharCanvases[this.controller.mojis[i].texture2];
          
          const context = textureCanvas.getContext("2d");
          context.drawImage(subChar, 0, 0);
          context.drawImage(mainChar, 0, this.controller.squareSize.y / 2);

          this.charCanvases[this.controller.mojis[i].read] = textureCanvas;
        }

        
      }, false);
    }
  }

  // テキストフレームを描画する
  drawTextFrame() {
    const context = this.textFrame.getContext("2d");
    const mapChipSize = this.controller.squareSize;

    for (let i = 0; i < this.controller.textAreaRows; i++) {
      for (let j = 0; j < this.controller.textAreaColumns; j++) {
        const textureIndex = this.controller.textAreaMap[i][j];
        if (textureIndex == -1) {
          continue;
        }

        context.drawImage(this.textFrameCanvases[textureIndex], j * mapChipSize.x, i * mapChipSize.y);
      }
    }
  }
}
