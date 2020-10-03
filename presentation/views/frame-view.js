// ------------------------------------------------------------------
// コマンドフレームを持つビューの基底クラス
// ------------------------------------------------------------------

class FrameView {
  // コンストラクタ
  constructor(context, canvases) {
    // コンテキストとキャンバス
    this.context = context;
    this.canvases = canvases;
  }

    // フレームを描画する
  drawFrame(canvas, mapChipSize, textures, rows, columns) {
    const context = canvas.getContext('2d');

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
      
      this.htmlElement.style.display = 'block';

      // 親ウィンドウがあれば親ウィンドウにコマンドのオープンを通知する
      if (this.context.parent) {
        this.context.notifyChildOpened(this.context.parent);
      }

      this.context.viewState = 'opened';
    }
  }

  // クローズ
  close(keyCode) {
    if (keyCode == this.context.closeKey.keyCode && this.context.canClose) {
      this.htmlElement.style.display = 'none';
      this.resetCommandMenuSelection();
      this.context.isChildOpened = 0; // 一回性のコマンドで閉じるため
      this.context.viewState = 'closed';
    }
  }

  // HTML要素の表示
  showView() {
    this.htmlElement.style.display = 'block';
  }
  
  // HTML要素の非表示
  hideView() {
    this.htmlElement.style.display = 'none';
  }
}
