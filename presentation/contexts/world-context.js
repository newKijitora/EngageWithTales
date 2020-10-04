// ------------------------------------------------------------------
// ゲーム世界のコンテキストクラス
// ------------------------------------------------------------------

class WorldContext extends Context {
  // コンストラクタ
  constructor(initial) { super();
    // 初期化オブジェクト
    this.initial = initial;

    this.title = this.initial.title; // ゲームタイトル
    this.version = this.initial.version; // ゲームのバージョン
    
    this.resources = new Resources(); // リソース
    this.settings = new Settings(this.initial.settings); // ゲームの設定

    // JSONファイルURL
    this.jsonUrl = {
      'town': this.initial.url, // 町の情報のJSON
    };

    // 現在の町のオブジェクト
    this.currentTown = null;

    // マップの元テクスチャー
    this.textures = {
      'map': this.resources.mapTextures,
      'people': this.resources.peopleTextures,
      'commandFrame': this.resources.commandFrameTextures,
      'char': this.resources.textTextures,
    };

    // 主人公のパーティー
    this.memberCharacters = [
      new Character(0, 'ろかりと', 5, 5, 2, 15, 5),
      new Character(1, 'みーみる', 3, 3, 3, 10, 12),
      new Character(2, 'とらまな', 7, 7, 1, 23, 0),
      new Character(3, 'けしゃ', 2, 4, 3, 12, 20),
    ];

    this.memberCharacters[0].items = [
      new GameItem('とねりこのぼう'),
      new GameItem('あおのハーブ'),
      new GameItem('みどりのハーブ'),
      new GameItem('なげまたたび'),
      new GameItem('かわよろい'),
      new GameItem('いなずまのしるし'),
      new GameItem('なつめぐのみ')
    ];

    this.memberCharacters[0].magics = [
      new Magic('かいふくのほん'),
      new Magic('ちゆのほん'),
      new Magic('かぜのほん'),
      new Magic('せいめいのほん'),
    ];

    this.memberCharacters[1].items = [
      new GameItem('あかのハーブ'),
      new GameItem('あかのハーブ'),
      new GameItem('まよけのみ'),
      new GameItem('じゃあくのめ'),
      new GameItem('きとうしのかざり'),
      new GameItem('せいじょのローブ'),
      new GameItem('ほしのみみかざり'),
      new GameItem('ひるとよるのつえ'),
      new GameItem('つちのしるし'),
    ];

    this.memberCharacters[2].items = [
      new GameItem('あおのハーブ'),
      new GameItem('どうのけん'),
      new GameItem('まじないのかけら'),
      new GameItem('おもいでのしずく'),
      new GameItem('おれたつるぎ'),
      new GameItem('くちはてたよろい'),
      new GameItem('さびたかぶと'),
      new GameItem('ひびわれたたて'),
      new GameItem('ぐんしんのたて'),
      new GameItem('せんしのこころ'),
    ];

    this.memberCharacters[3].items = [
      new GameItem('くさりかたびら'),
      new GameItem('めがみのほほえみ'),
      new GameItem('ぐんしんのおの'),
      new GameItem('ぐんしんのよろい'),
      new GameItem('ぐんしんのたて'),
      new GameItem('ぐんしんのかぶと'),
      new GameItem('はやがけのあし'),
      new GameItem('ひかりのしるし'),
      new GameItem('くらやみのしるし'),
      new GameItem('ときのしるし'),
      new GameItem('がくしのビオロン'),
      new GameItem('きのカギ'),
    ];

    this.memberCharacters[3].magics = [
      new Magic('ほのおのしょ'),
      new Magic('こおりのしょ'),
      new Magic('みずのしょ'),
      new Magic('いかずちのしょ'),
      new Magic('ししゃのしょ'),
    ];

    // デフォルトのテキスト（話す相手がいない、道具を持っていない、など。。）
    this.defaultTexts = {
      'talk': [
        'はなす　あいてが　だれもいない。'
      ],
      'search': [
        'ろかりとは　あしもとを　しらべた。',
        'しかし　なにも　みつからなかった。'
      ],
      'door': [
        'ここには　とびらがない。'
      ],
      'map': [
        'つかえる　ちずを　もっていない。'
      ]
    };
  }
  
  // JSONから町の情報を取得する
  requestInformation(townName) {
    // リクエスト
    const request = new XMLHttpRequest();
    request.responseType = 'json';

    request.onload = () => {
      // JSONにあるすべての町の情報を保存
      const towns = request.response;

      // 指定の町の情報を取得
      this.townInformation = towns[townName];

      // 町の生成
      this.currentTown = new TownContext(this);
      this.currentTown.requestInformation(this);

      // ビューの生成
      this.entry(this);
    };

    // リクエストの実行
    request.open('GET', this.jsonUrl['town']);
    request.send();
  }

  // ゲームを開始する
  run() {
    this.requestInformation('rokarito'); // 町の情報を読み込む
  }
}
