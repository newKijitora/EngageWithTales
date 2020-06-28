// テキストエリアのビュークラス
class TextAreaView {
  // コンストラクタ
  constructor(controller) {
    // コントローラ
    this.controller = controller;
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

    const readCharacter = (now) => {
      if (!startTime) {
        startTime = now;
      }

      if (now - startTime > textSpeed) {
        this.textCells.item(textPosition).innerText = text[textPosition];
        startTime = now;
        textPosition++;
      }
    
      if (textPosition < text.length && textPosition < this.textCells.length) {
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
    // テキストエリア
    const textArea = document.createElement("section");
    textArea.setAttribute("id", "textArea");
    textArea.classList.add("textAreaOuter");
    textArea.style.display = "none";
    // テキストエリアのインナー
    const textField = document.createElement("p");
    textField.classList.add("textAreaInner");
    textField.style.backgroundColor = this.controller.textAreaBackgroundColor;
    textField.classList.add("textField");
    // セルの生成
    for (let i = 0; i < this.controller.numberOfRows; i++) {
      // 行を生成
      const row = document.createElement("span");
      row.classList.add("textRow");
      // セルを生成して行に追加
      for (let j = 0; j < this.controller.numberOfCells; j++) {
        const cell = document.createElement("span");
        cell.classList.add("textCell");
        cell.style.color = this.controller.textColor;
        // 行にセルを追加
        row.appendChild(cell);
      }
      // インナーに行を追加
      textField.appendChild(row);
    }
    // テキストエリアにインナーを追加
    textArea.appendChild(textField);

    // テキストエリアをドキュメントに追加
    const textAreaLayer = document.createElement("div");
    textAreaLayer.classList.add("layer");
    textAreaLayer.style.zIndex = this.controller.zIndexBase;
    textAreaLayer.appendChild(textArea);

    const monitor = document.getElementById("world");
    monitor.appendChild(textAreaLayer);

    this.textArea = textArea;
    this.textCells = document.getElementsByClassName("textCell");
  }
}
