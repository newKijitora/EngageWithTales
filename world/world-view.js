// ------------------------------------------------------------------
// ゲーム世界のビュークラス
// ------------------------------------------------------------------

class WorldView {
  // コンストラクタ
  constructor(context) {
    // コントローラー
    this.controller = context;

    // ビュー（モニター）のサイズとウィンドウ上のビューの位置
    this.worldViewSize = this.controller.settings.worldViewSize;
    this.worldViewPosition = this.controller.settings.worldViewPosition;

    // DOM要素
    this.worldDom = null;
    
    // マップテクスチャーのプリロード用キャンバス
    this.mapCanvases = {};

    // 人物テクスチャーのプリロード用キャンバス
    this.peopleCanvases = {};

    // コマンドフレームテクスチャーのプリロード用キャンバス
    this.commandFrameCanvases = {};

    // 文字テクスチャーのプリロード用キャンバス
    this.charCanvases = {};

    // プリロード用キャンバスのセット
    this.canvases = {
      "map": this.mapCanvases,
      "people": this.peopleCanvases,
      "commandFrame": this.commandFrameCanvases,
      "char": this.charCanvases,
    };

    // 画像読み込みオブジェクト
    const imageLoader = new ImageLoader();
    
    // 画像の読み込み（マップのテクスチャー）とプリロード用キャンバスの生成
    imageLoader.loadImages(this.controller.resource.textures, (images) => {
      for (let i = 0; i < this.controller.resource.textures.length; i++) {
        const textureCanvas = document.createElement("canvas");
        textureCanvas.width = this.controller.settings.squareSize.x;
        textureCanvas.height = this.controller.settings.squareSize.y;         

        const textureContext = textureCanvas.getContext("2d");
        imageLoader.setSmoothingEnabled(textureContext, false);

        textureContext.drawImage(images[i], 0, 0, images[i].width, images[i].height, 0, 0, this.controller.settings.squareSize.x, this.controller.settings.squareSize.y);
        this.mapCanvases[i] = textureCanvas;
      }

      // 画像の読み込み（人物のテクスチャー）とプリロード用キャンバスの生成
      imageLoader.loadImages(this.controller.resource.peopleTextures, (images) => {
        for (let i = 0; i < this.controller.resource.peopleTextures.length; i++) {
          const canvas = document.createElement("canvas");
          canvas.width = this.controller.settings.squareSize.x;
          canvas.height = this.controller.settings.squareSize.y;         
  
          const context = canvas.getContext("2d");
          imageLoader.setSmoothingEnabled(context, false);
  
          context.drawImage(images[i], 0, 0, images[i].width, images[i].height, 0, 0, this.controller.settings.squareSize.x, this.controller.settings.squareSize.y);
          this.peopleCanvases[this.controller.resource.peopleTextures[i].texture] = canvas;
        }
  
        // 画像の読み込み（コマンドフレームのテクスチャー）とプリロード用キャンバスの生成
        imageLoader.loadImages(this.controller.resource.commandFrameTextures, (images) => {
          // コマンドボックスのフレーム用のキャンバスを生成する
          for (let i = 0; i < this.controller.resource.commandFrameTextures.length; i++) {
            const canvas = document.createElement("canvas");
            canvas.width = this.controller.settings.squareSize.x;
            canvas.height = this.controller.settings.squareSize.y;       
            
            const context = canvas.getContext("2d");
            imageLoader.setSmoothingEnabled(context, false);
  
            context.drawImage(images[i], 0, 0, images[i].width, images[i].height, 0, 0, canvas.width, canvas.height);
            this.commandFrameCanvases[i] = canvas;
          }

          // 画像の読み込み（文字のテクスチャー）とプリロード用キャンバスの生成
          imageLoader.loadImages(this.controller.resource.textTextures, (images) => {
            const partCharCanvases = {}; // 部分文字のキャンバス
            const textureSize = new Size(this.controller.settings.textSize.x, this.controller.settings.textSize.y / 2); // テクスチャーはテキストの上半分か下半分 

            // 文字エレメント生成用の部分文字キャンバスを生成する
            for (let i = 0; i < this.controller.resource.textTextures.length; i++) {
              const canvas = document.createElement("canvas");
              canvas.width = textureSize.x;
              canvas.height = textureSize.y;

              const context = canvas.getContext("2d");
              imageLoader.setSmoothingEnabled(context, false);

              context.drawImage(images[i], 0, 0, images[i].width, images[i].height, 0, 0, canvas.width, canvas.height);
              partCharCanvases[this.controller.resource.textTextures[i].texture] = canvas;
            }

            // 部分文字を組み合わせて一文字分のキャンバスを生成する
            for (let i = 0; i < this.controller.resource.textElements.length; i++) {
              const canvas = document.createElement("canvas");
              canvas.width = this.controller.settings.textSize.x;
              canvas.height = this.controller.settings.textSize.y;    
              
              const mainChar = partCharCanvases[this.controller.resource.textElements[i].texture1]; // メイン文字
              const subChar = partCharCanvases[this.controller.resource.textElements[i].texture2]; // 濁点などのサブ文字
              
              const context = canvas.getContext("2d");
              context.drawImage(subChar, 0, 0);
              context.drawImage(mainChar, 0, textureSize.y);

              this.charCanvases[this.controller.resource.textElements[i].read] = canvas;
            }

            // HTML要素の組成（画像のロードとキャンバスの準備がととのってから呼び出す）
            this.assemblingElements();
          });
        });
      });
    });
  }

  // HTML要素の組成
  assemblingElements() {
    const world = document.createElement("div");
    world.setAttribute("id", "world");
    world.style.position = "absolute";
    world.style.overflow = "hidden";

    // ビュー（モニター）のサイズ
    world.style.width = this.worldViewSize.x + "px";
    world.style.height = this.worldViewSize.y + "px";

    // ウィンドウ上のビューの位置
    world.style.top = this.worldViewPosition.y * this.controller.settings.squareSize.y + "px";
    world.style.left = this.worldViewPosition.x * this.controller.settings.squareSize.x + "px";

    document.body.appendChild(world);

    this.worldDom = world;

    // ゲーム開始
    this.town = new TownView(this.controller.currentTown, this.peopleCanvases, this.commandFrameCanvases, this.charCanvases);
  }
}