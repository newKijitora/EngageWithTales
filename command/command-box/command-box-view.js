// ------------------------------------------------------------------
// コマンドボックスのビュー
// ------------------------------------------------------------------

class CommandBoxView extends CommandBoxViewBase {

  // コンストラクタ
  constructor(context) { super(context);
    // コンテキスト
    this.context = context;

    // HTML要素
    this.commandBoxDOM = null;
    this.commandFrameDOM = null;

    // コマンドメニューオブジェクト
    this.commandMenus = null;

    // コマンドのフレーム用キャンバスを格納する配列
    this.commandTextureCanvases = new Array(this.context.commandTextures.length);
    
    // 文字キャンバスのオブジェクト（コマンドボックスのすべてに共通で使用される文字キャンバス）
    this.charCanvases = {};

    // テキストエリアのビューオブジェクト（イベントの登録順に注意！）
    this.textAreaView = new TextAreaView(this.context.subContexts['text-area'], this.commandTextureCanvases, this.charCanvases);

    // HTML要素の組成
    this.assemblingElements();    

    // イベントリスナの設定（テキストエリアより先に登録しない）
    window.addEventListener('keydown', (event) => this.open(event.keyCode), false);
    window.addEventListener('keydown', (event) => this.close(event.keyCode), false);
    window.addEventListener('keydown', (event) => this.selectionChange(event.keyCode), false);
    
    // 画像の読み込みオブジェクト
    const imageLoader = new ImageLoader();

    // 画像の読み込みとキャッシュ用キャンバス生成（コマンドボックスのフレーム用）
    imageLoader.loadImages(this.context.commandTextures, (images) => {
      // コマンドボックスのフレーム用のキャンバスを生成する
      for (let i = 0; i < this.context.commandTextures.length; i++) {
        const canvas = document.createElement('canvas');
        canvas.width = this.context.squareSize.x;
        canvas.height = this.context.squareSize.y;       
  
        const context = canvas.getContext('2d');
        imageLoader.setSmoothingEnabled(context, false);
  
        context.drawImage(images[i], 0, 0, images[i].width, images[i].height, 0, 0, canvas.width, canvas.height);
        this.commandTextureCanvases[i] = canvas;
      }
  
      // コマンドボックスのフレーム描画
      this.drawFrame(this.commandFrameDOM, this.context.squareSize, this.commandTextureCanvases, this.context.commandBoxRows, this.context.commandBoxColumns);
      
      // 画像の読み込みとキャッシュ用キャンバス生成（文字エレメントの生成用）
      imageLoader.loadImages(this.context.textTextures, (images) => {
        const partCharCanvases = {}; // 部分文字のキャンバス
        const textureSize = new Size(this.context.textSize.x, this.context.textSize.y / 2); // テクスチャーはテキストの上半分か下半分 

        // 文字エレメント生成用の部分文字キャンバスを生成する
        for (let i = 0; i < this.context.textTextures.length; i++) {
          const canvas = document.createElement('canvas');
          canvas.width = textureSize.x;
          canvas.height = textureSize.y;

          const context = canvas.getContext('2d');
          imageLoader.setSmoothingEnabled(context, false);

          context.drawImage(images[i], 0, 0, images[i].width, images[i].height, 0, 0, canvas.width, canvas.height);
          partCharCanvases[this.context.textTextures[i].texture] = canvas;
        }

        // 部分文字を組み合わせて一文字分のキャンバスを生成する
        for (let i = 0; i < this.context.textElements.length; i++) {
          const canvas = document.createElement('canvas');
          canvas.width = this.context.textSize.x;
          canvas.height = this.context.textSize.y;    
          
          const mainChar = partCharCanvases[this.context.textElements[i].texture1]; // メイン文字
          const subChar = partCharCanvases[this.context.textElements[i].texture2]; // 濁点などのサブ文字
          
          const context = canvas.getContext('2d');
          context.drawImage(subChar, 0, 0);
          context.drawImage(mainChar, 0, textureSize.y);

          this.charCanvases[this.context.textElements[i].read] = canvas;
        }

        // コマンドメニューのHTML要素を生成
        const commandMenus = new Array(this.context.commandMenus.length);

        for (let i = 0; i < commandMenus.length; i++) {
          commandMenus[i] = new Array(this.context.commandMenus[i].length);
          for (let j = 0; j < commandMenus[i].length; j++) {
            commandMenus[i][j] = new CommandMenuView(this.context.commandMenuContexts[i][j], this.context.commandMenus[i][j].commandName, this.commandTextureCanvases, this.charCanvases);
            
            // コマンドボックスの選択フィールド要素の子要素として追加
            this.selectField.appendChild(commandMenus[i][j].commandMenuDOM);
          }
        }

        // コマンドボックスのコマンドメニューに文字を描画する
        for (let i = 0; i < this.context.commandMenus.length; i++) {
          for (let j = 0; j < this.context.commandMenus[i].length; j++) {
            commandMenus[i][j].initialize(this.charCanvases);

            // メンバーセレクトコマンド以外はカット
            if (!commandMenus[i][j].context.isMemberSelectCommand) {
              continue;
            }

            // メンバーセレクターのフレーム描画
            commandMenus[i][j].memberSelecter.drawFrame(this.commandTextureCanvases);

            // メンバーセレクターのコマンドメニューに文字を描画する
            for (let k = 0; k < commandMenus[i][j].memberSelecter.commandMenus.length; k++) {
              for (let l = 0; l < commandMenus[i][j].memberSelecter.commandMenus[k].length; l++) {
                commandMenus[i][j].memberSelecter.commandMenus[k][l].initialize(this.charCanvases);
              }
            }
          }
        }

        // CommandMenuViewクラスの配列を保持
        this.commandMenus = commandMenus;

        // テキストエリアのビュー TODO: インスタンス生成に検討の必要あり
        this.textAreaView.drawFrame(this.textAreaView.textFrame, this.textAreaView.context.squareSize, this.commandTextureCanvases, this.textAreaView.context.textAreaRows, this.textAreaView.context.textAreaColumns);
      });
    });
  }

  // コマンドボックスを開く
  open(keyCode) {
    if (keyCode == this.context.openKey.keyCode && this.context.canOpen) {
      this.context.viewState = 'opened';
      this.showView();
    } else if (keyCode == this.context.openKey.keyCode && !this.context.currentCommandMenuContext.isMemberSelectCommand) {
      this.close(this.context.closeKey.keyCode);
    }
  }

  // コマンドボックスを閉じる
  close(keyCode) {
    if (keyCode == this.context.closeKey.keyCode && this.context.canClose) {
      this.hideView();
      this.resetCommandMenuSelection();
      this.context.viewState = 'closed';
    }
  }

  // コマンドメニューの選択状態をリセットする
  resetCommandMenuSelection() {
    for (let i = 0; i < this.commandMenus.length; i++) {
      for (let j = 0; j < this.commandMenus[i].length; j++) {
        if (!this.commandMenus[i][j].context.isSelected) {
          continue;
        }

        // 選択されていたコマンドの選択状態を解除
        this.commandMenus[i][j].context.isSelected = false;
        this.commandMenus[i][j].hideCommandPointer();

        // 初期位置のコマンドに選択状態を設定
        this.commandMenus[0][0].context.isSelected = true;
        this.commandMenus[0][0].showCommandPointer(this.charCanvases);

        // コマンドメニューのコンテキストを初期化
        this.context.currentCommandMenuContext = this.commandMenus[0][0].context;
        this.context.subContexts['text-area'].firstThrough = true;
      }
    }
  }

  // 選択状態の変更
  selectionChange(keyCode) {
    if (!this.context.canSelectionChange) {
      return;
    }

    let key = null;
    let destination = null;
    
    // キーコードの振り分け（移動キー以外はカット）
    key = this.context.getKey(keyCode, false);
    if (!key) {
      return;
    }

    // 進行方向
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
        const nextPositionIsOutOfRange = !((0 <= nextPosition.x && nextPosition.x <= 1) && (0 <= nextPosition.y && nextPosition.y <= this.commandMenus.length - 1));

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
        
        this.context.currentCommandMenuContext = nextCommand.context;

        return;
      }
    }
  }

  // ビューの表示
  showView() {
    this.commandBoxDOM.style.display = 'block';
  }

  // ビューの非表示
  hideView() {
    this.commandBoxDOM.style.display = 'none';
  }

  // HTML要素の生成
  assemblingElements() {
    // コマンドのコンテナ
    const commandBox = document.createElement('div');
    commandBox.style.position = 'absolute';
    commandBox.style.zIndex = this.context.zIndexBase;
    commandBox.style.left = this.context.commandBoxPosition.x * this.context.squareSize.x + 'px';
    commandBox.style.top = this.context.commandBoxPosition.y * this.context.squareSize.y + 'px';
    commandBox.style.display = 'none';

    // コマンドのフレーム（バックグラウンド）
    const commandFrameDOM = document.createElement('canvas');
    commandFrameDOM.style.display = 'block'
    commandFrameDOM.width = this.context.squareSize.x * this.context.commandBoxColumns;
    commandFrameDOM.height = this.context.squareSize.y * this.context.commandBoxRows;

    // コマンドメニューのセットを格納するコンテナ
    const selectField = document.createElement('div');
    selectField.style.position = 'absolute';
    selectField.style.top = 0;
    selectField.style.left = 0;
    selectField.style.paddingTop = this.context.squareSize.y / 2 + 'px';
    selectField.style.display = 'flex';
    selectField.style.flexWrap = 'wrap';
    selectField.style.width = '192px';

    commandBox.appendChild(commandFrameDOM);
    commandBox.appendChild(selectField);

    // モニターにコマンドボックスを格納
    const monitor = document.getElementById('world');
    monitor.appendChild(commandBox);

    this.commandBoxDOM = commandBox;
    this.commandFrameDOM = commandFrameDOM;
    this.selectField = selectField;
  }
}
