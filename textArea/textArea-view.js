/* テキストエリアのビュー */

class textAreaView {
  // コンストラクタ
  constructor() {
    // テキストエリア
    this.view = document.createElement("div");
    this.view.setAttribute("id", "textArea");
    this.view.classList.add("display-none");

    // テキストエリアのインナー
    this.textAreaInner = document.createElement("div");
    this.textAreaInner.setAttribute("id", "textAreaInner");

    // テキストエリアの行数と一行あたりの文字数
    this.rowHeight = 4;
    this.cellLength = 17;
    
    for (let i = 0; i < this.rowHeight; i++) {
      // 行を生成
      const row = document.createElement("div");
      row.classList.add("textField");

      // セルを生成して行に追加
      for (let j = 0; j < this.cellLength; j++) {
        const cell = document.createElement("div");
        cell.classList.add("textCell");
        
        // 行にセルを追加
        row.appendChild(cell);
      }

      // インナーに行を追加
      this.textAreaInner.appendChild(row);
    }

    // テキストエリアにインナーを追加、テキストエリアをドキュメントに追加
    this.view.appendChild(this.textAreaInner);
    this.pare = document.getElementById("mntr");
    this.pare.appendChild(this.view);

    this.textCells = document.getElementsByClassName("textCell");
  }

  // トークウィンドウを開く
  open() {
    this.view.classList.remove("display-none");
    this.view.classList.add("display-block");
  }

  // トークウィンドウを閉じる
  close() {
    this.view.classList.remove("display-block");
    this.view.classList.add("display-none");
    this.textErace();
  }

  // トークウィンドウ内の文字列を削除する
  textErace() {
    for (let i = 0; i < this.textCells.length; i++) {
      this.textCells.item(i).innerText = "";
    }
  }
}