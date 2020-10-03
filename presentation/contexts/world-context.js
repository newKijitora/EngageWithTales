// ------------------------------------------------------------------
// ゲーム世界のコンテキストクラス
// ------------------------------------------------------------------

class WorldContext extends Context {
  // コンストラクタ
  constructor(initialize) { super();
    // 初期化オブジェクト
    this.initialize = initialize;

    // ゲームタイトル
    this.title = this.initialize.title;

    // リソース
    this.resource = new Resources();

    // ゲームの設定
    this.settings = new Settings(this.initialize.settings);

    // 町のJSONファイルURL
    this.townJsonUrl = this.initialize.url;

    // 現在の町
    this.currentTown = null;

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

    this.towns = null;
    this.currentTown = null;

    // コマンドのメニュー
    this.commandMenuLength = 5;

    this.commandMenus = [
      [
        // new Command(label, commandName, isSelected, isMemberSelector);
        new GameCommand('talk', 'はなす', true, false),
        new GameCommand('magic', 'まほう', false, true),
      ],
      [
        new GameCommand('status', 'つよさ', false, true),
        new GameCommand('item', 'もちもの', false, true),
      ],
      [
        new GameCommand('equipment', 'そうび', false, true),
        new GameCommand('search', 'しらべる', false, false),
      ],
      [
        new GameCommand('door', 'とびら', false, false),
        new GameCommand('map', 'ちず', false, false),
      ]
    ];

    // 装備コマンドのメニュー
    this.equipmentCommandMenus = [
      [
        // new Command(label, commandName, isSelected, isMemberSelector);
        new GameCommand("equipment", "ぶき", true, false),
      ],
      [
        new GameCommand("equipment", "ぼうぐ", false, true),
      ],
      [
        new GameCommand("equipment", "たて", false, true),
      ],
      [
        new GameCommand("equipment", "あたま", false, false),
      ]
    ];
  }

  // ゲームを開始する
  start() {
    // 町の情報を読み込む
    this.requestInformation(this, 'rokarito');
  }

  // JSONから町の情報を取得する
  requestInformation(world, townName) {
    // リクエスト
    const request = new XMLHttpRequest();
    request.responseType = 'json';

    request.onload = () => {
      // JSONにあるすべての町の情報を保存
      this.towns = request.response;

      // 最初の町の情報を取得
      this.townInformation = this.towns[townName];

      // 町の生成
      this.currentTown = new TownContext(this);
      this.currentTown.requestInformation(this);

      // ビューの生成
      this.entry(this);
    };

    request.open('GET', world.townJsonUrl);
    request.send();
  }
}
