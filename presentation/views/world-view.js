// ------------------------------------------------------------------
// ゲーム世界のビュークラス
// ------------------------------------------------------------------

class WorldView {
  // コンストラクタ
  constructor(context) {
    // コンテキスト
    this.context = context;

    // ビュー（モニター）のサイズとウィンドウ上のビューの位置
    this.worldViewSize = this.context.settings.worldViewSize;
    this.worldViewPosition = this.context.settings.worldViewPosition;

    // 一マスのサイズ
    this.squareSize = this.context.settings.squareSize;
    this.textSize = this.context.settings.textSize;

    // DOM要素
    this.element = null;

    // プリロード用キャンバスのセット（マップ、人物、フレーム、文字）
    this.canvases = {
      'map': {},
      'people': {},
      'commandFrame': {},
      'char': {},
    };

    // 画像読み込みオブジェクト
    const imageLoader = new ImageLoader();
    
    // 画像の読み込み（マップのテクスチャー）とプリロード用キャンバスの生成
    imageLoader.loadImages(this.context.textures['map'], (images) => {
      for (let i = 0; i < this.context.textures['map'].length; i++) {
        this.canvases['map'][i] = this.getCanvas(images[i], this.squareSize.x, this.squareSize.y, imageLoader);
      }

      // 画像の読み込み（人物のテクスチャー）とプリロード用キャンバスの生成
      imageLoader.loadImages(this.context.textures['people'], (images) => {
        for (let i = 0; i < this.context.textures['people'].length; i++) {
          this.canvases['people'][this.context.textures['people'][i].texture] = this.getCanvas(images[i], this.squareSize.x, this.squareSize.y, imageLoader);
        }
  
        // 画像の読み込み（コマンドフレームのテクスチャー）とプリロード用キャンバスの生成
        imageLoader.loadImages(this.context.textures['commandFrame'], (images) => {
          for (let i = 0; i < this.context.textures['commandFrame'].length; i++) {
            this.canvases['commandFrame'][i] = this.getCanvas(images[i], this.squareSize.x, this.squareSize.y, imageLoader);
          }

          // 画像の読み込み（文字のテクスチャー）とプリロード用キャンバスの生成
          imageLoader.loadImages(this.context.textures['char'], (images) => {
            const partCharCanvases = {}; // 部分文字のキャンバス
            const textureSize = new Size(this.context.settings.textSize.x, this.context.settings.textSize.y / 2); // テクスチャーはテキストの上半分か下半分 

            // 文字エレメント（部分文字）生成用キャンバスの生成
            for (let i = 0; i < this.context.textures['char'].length; i++) {
              partCharCanvases[this.context.textures['char'][i].texture] = this.getCanvas(images[i], textureSize.x, textureSize.y, imageLoader);
            }

            // 部分文字を組み合わせて一文字分のキャンバスを生成する
            for (let i = 0; i < this.context.resources.textElements.length; i++) {
              const canvas = document.createElement('canvas');
              canvas.width = this.textSize.x;
              canvas.height = this.textSize.y;    
              
              const mainChar = partCharCanvases[this.context.resources.textElements[i].texture1]; // メイン文字
              const subChar = partCharCanvases[this.context.resources.textElements[i].texture2]; // 濁点などのサブ文字
              
              const context = canvas.getContext('2d');
              context.drawImage(subChar, 0, 0);
              context.drawImage(mainChar, 0, textureSize.y);

              this.canvases['char'][this.context.resources.textElements[i].read] = canvas;
            }

            // HTML要素の組成（画像のロードとキャンバスの準備がととのってから呼び出す）
            this.assemblingElements();
          });
        });
      });
    });
  }

  // 画像をもとにしたプリロード用キャンバスを生成する
  getCanvas(image, sizeX, sizeY, imageLoader) {
    // キャンバス
    const canvas = document.createElement('canvas');
    canvas.width = sizeX;
    canvas.height = sizeY;

    // 描画コンテキスト～プリロード用キャンバスへの描画
    const context = canvas.getContext('2d');
    imageLoader.setSmoothingEnabled(context, false);
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

    return canvas;
  }

  // HTML要素の組成
  assemblingElements() {
    // ビュー（モニター）のHTML要素
    const world = document.createElement('div');
    world.setAttribute('id', 'world');
    world.style.position = 'absolute';
    world.style.overflow = 'hidden';

    // ビュー（モニター）のサイズ
    world.style.width = this.worldViewSize.x + 'px';
    world.style.height = this.worldViewSize.y + 'px';

    // ウィンドウ上のビューの位置
    world.style.top = this.worldViewPosition.y * this.squareSize.y + 'px';
    world.style.left = this.worldViewPosition.x * this.squareSize.x + 'px';

    // ドキュメントbodyにビュー（モニター）を追加
    document.body.appendChild(world);

    // HTML要素コンテナを保持する
    this.element = world;

    // ゲーム開始（町のオブジェクトを生成する）
    this.town = new TownView(this.context.currentTown, this.canvases);
  }
}
