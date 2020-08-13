class ImageLoader {
  loadImages(textures, callback) {
    // コマンドボックスのフレーム用画像を取得
    const images = new Array(textures.length);
    let loadedImageCount = 0;

    // 画像の読み込みとロードイベントハンドラーの設定
    for (let i = 0; i < textures.length; i++) {
      images[i] = new Image();
      images[i].src = "resources/images/" + textures[i].texture + ".png";

      // 画像ロードごとのイベントハンドラー
      images[i].addEventListener("load", (event) => {
        if (++loadedImageCount < textures.length) {
          return;
        }

        // コールバックメソッドの呼び出し
        callback(images);

      }, false);
    }
  }

  // アンチエイリアスの設定
  setSmoothingEnabled(context, enabled) {
    context.mozImageSmoothingEnabled = enabled;
    context.webkitImageSmoothingEnabled = enabled;
    context.msImageSmoothingEnabled = enabled;
    context.imageSmoothingEnabled = enabled;
  }
}