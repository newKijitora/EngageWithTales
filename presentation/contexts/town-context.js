//----------------------------------------------
// 町のコンテキスト
//----------------------------------------------

class TownContext {
  // コンストラクタ
  constructor(world) {
    // 各種設定
    this.settings = world.settings;

    // 町の情報
    this.townInformation = world.townInformation;

    // リソース
    this.resources = world.resources;

    // テキストのテクスチャー
    this.textTextures = world.textures['char'];

    this.defaultTexts = world.defaultTexts;
    this.readIndex = 0;

    // マップに関するデータ
    this.map = null;
    this.mapSize = null;
    this.mapCenterPosition = null;
    this.mapFocusPosition = null;
    this.mapPosition = null;
    this.mapAreaController = null;
    this.mainTextureIndex = 0;

    // 衝突マップ
    this.collisionMap = null;

    // 現在のキャラクターパーティ
    this.memberCharacters = world.memberCharacters;

    // コマンドのメニュー
    this.commandMenuLength = world.commandMenuLength;
    this.commandMenus = world.commandMenus;

    // 装備コマンドのメニュー
    this.equipmentCommandMenus = world.equipmentCommandMenus;
  }

  // JSONから町の情報を取得する
  requestInformation(world) {
    // マップグリッドの数
    const mapWidth = this.settings.mapWidth;
    const mapHeight = this.settings.mapHeight;

    // 該当の町の情報を取得
    this.map = world.resources.maps[this.townInformation.mapIndex];
    this.mainTextureIndex = this.townInformation.mainTextureIndex;
    
    // 町のマップから衝突マップを生成
    this.collisionMap = this.createCollisionMap(this.map, world.textures['map']);
    
    this.mapSize = new Size(this.settings.squareSize.x * mapWidth, this.settings.squareSize.y * mapHeight);
    this.mapCenterPosition = new Position(this.townInformation.centerPosition[0], this.townInformation.centerPosition[1]);
    this.mapFocusPosition = new Position(this.mapCenterPosition.x, this.mapCenterPosition.y + 1);
    this.mapPosition = new Position(this.mapCenterPosition.x - Math.floor(mapWidth / 2), this.mapCenterPosition.y - Math.floor(mapHeight / 2));
    this.mapAreaController = new MapAreaContext(this, 100);

    // 町の人々を生成する
    this.people = this.createPeople(this);

    // コマンドボックス
    this.commandBoxController = new CommandBoxContext(this, new Position(5, 2));
  }

  // 衝突マップを生成する
  createCollisionMap(baseMap, textures) {
    const collisionMap = new Array(baseMap.length);
      
    for (let i = 0; i < baseMap.length; i++) {
      collisionMap[i] = new Array(baseMap[i].length);
      for (let j = 0; j < baseMap[i].length; j++) {
        collisionMap[i][j] = textures[baseMap[i][j]].collision;
      }
    }
    return collisionMap;
  }

  // 町の人々を生成する
  createPeople(town) {
    const people = new Array(town.townInformation.people.length);

    for (let i = 0; i < town.townInformation.people.length; i++) {
      people[i] = new PeopleContext(town,
        town.townInformation.people[i][0],
        new Position(town.townInformation.people[i][1][0],
        town.townInformation.people[i][1][1]),
        town.townInformation.people[i][2],
        town.townInformation.people[i][3],
        town.townInformation.people[i][4],
        town.townInformation.people[i][5],

        // クラスメソッドを呼んでいる
        PeopleContext.actions[town.townInformation.people[i][6]], 100,
        town.townInformation.talkTexts[town.townInformation.people[i][7]]);
    }
    return people;
  }

  // トークのリスト
  list = [
    ['なにも　みつからなかった'],
    ['＊「ぼくは　キングです！　　　　　　　このまちに　きてくれて　　　　　　とても　うれしいです　　　　　　　どうも　ありがとう！',
     '＊「このまちの　ことなら　　　　　　　なんでも　きいてね！　　　　　　　いろいろ　おしえるよ'],
    [
      '＊「ラルドという　けんしのことを\n　　しっているか？',
      '＊「かれは　とてつもない　さいのうを\n　　もったおとこだったけれど\n　　みちを　あやまってしまったんだ。',
      '＊「ちのはてを　もとめて　たびだったという\n　　ことだけど　そのあと　どうなったかは\n　　だれひとり　しらないんだ。'
    ],
    [
      'ラルド「おまえの　それって\n　　じくうのけん　じゃないのか？',
    ],
    [
      'エリス「ねえ　ラルドのこと　みなかった？',
      'エリス「かれったら　あたしとの\n　　まちあわせも　すっぽかして\n　　どこかに　いってしまったのよ！',
      'エリス「こんど　あったら　ぜったいに\n　　とっちめてやるわ！',
    ],
    [
      '＊「ねえ　ラルドのこと　みなかった？'
    ],
    [
      '＊「ゆうべは　ずいぶん\n　　うなされていたのね。',
      '＊「かわいい　かのじょを\n　　なかせちゃだめよ。'
    ],
    [
      '＊「じくうのけんを　つかえば\n　　ときをこえることができる\n　　という　いいつたえがある。',
      '＊「もしも　それがほんとうなら\n　　あのときの　あやまちを\n　　ただすことができるだろうか。'
    ],
    [
      '＊「ろかりとは\n　　はぐれメタルのけんを\n　　そうびした！',
      '＊「キリキリバッタを　たおした！\n　　１００ゴールドを　うばわれた！',
      '＊「あのしょうねんの　まほうには\n　　だいけんじゃラルドすら\n　　てをやいたという　はなしだ。',
      '＊「まいごに　なってしまうとは\n　　なにごとだ！',
      '＊「あの　ものがなしい　ねいろが\n　　いまも　わすれられないんだ。',
      '＊「かのじょのことが\n　　いまでも　わすれられないの？'
    ],
     //['＊「ここは　もうだめです　　　　　　　はやく　おにげください！'],
    ['＊「とてつもない　さいのうを　もったけんしだったけれど　みちを　あやまってしまった',
     '＊「けれど　かれの　ししょうの　オルテガは　かれのことを　しんじていたよ',
     '＊「ララは　そんなししょうの　きもちを　いともかんたんに　オルテガをなきものに　したんだ',
     '＊「このまちで　ララのことを　よくおもっているものは　だれも　いないだろうね',
     '＊「ラルドを　のぞいてはね'],
    ['＊「かれらと　はなしをするには　　　　ほんやくどうぐが　ひつよう　　　　になるだろう',
     '＊「かれらは　われわれとは　　　　　　ちがうことばを　はなすんだ',
     '＊「ほんやくどうぐが　ないと　　　　　かれらが　なにをいってるか　　　　とても　わからないよ',
     '＊「ただ　アマリスのむらにいる　　　　エリスという　しょうじょは　　　　かれらのことばが　わかる　　　　　とかいうはなしだ',
     '＊「まあ　ほんとうかどうかは　　　　　わからないがね'],
    ['＊「ここから　きたに　いった　　　　　アマベル　というむらには　　　　　ようせいと　はなしができる　　　　おんなのこ　がいるらしい'],
    ['つかえる　どうぐを　もっていない'],
    ['なにも　みにつけていない'],
    ['はなす　あいてが　だれもない'],
    [
      'ろかりとは　あしもとを　しらべた。',
      'しかし　なにも　みつからなかった。'
    ],
    [
      'ここには　とびらがない。'
    ],
    [
      'つかえる　ちずを　もっていない。'
    ],
    ['つかえる　じゅもんがない']
  ];
}
