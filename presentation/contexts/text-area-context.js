// ------------------------------------------------------------------
// テキストエリアのコンテキストクラス
// ------------------------------------------------------------------

class TextAreaContext extends FrameContext {
  // コンストラクタ
  constructor(commandMenu, zIndexBase, position) { super(commandMenu.town, position);
    // コンテキスト
    this.commandBox = commandMenu.commandBox;
    this.commandMenu = commandMenu;
    this.parent = this.commandBox;

    // ビューが進行中かどうか（テキストエリア固有）
    this.isProgress = false;
    
    // 最初にコマンドボックスが開いたときのオープン操作はキャンセルする
    this.firstThrough = true;
    
    // テキスト関連のプロパティ
    
    if (this.commandMenu.menu.label == "talk") {
      this.textSet = this.list[2];
    } else if (this.commandMenu.menu.label == "search") {
      this.textSet = this.list[16];
    } else if (this.commandMenu.menu.label == "door") {
      this.textSet = this.list[17];
    } else if (this.commandMenu.menu.label == "map") {
      this.textSet = this.list[18];
    }




    this.readIndex = 0;
    this.canReadContinue = false;
    
    this.textAreaRows = 5;
    this.textAreaColumns = 15;

    // 行数と一行あたりの文字数
    this.numberOfRows = 4;
    this.numberOfCells = 22;
    this.zIndexBase = 500;
  }

  // オープンできるかどうか
  get canOpen() {
    

    if (this.firstThrough) {
      this.firstThrough = false;
      return false;
    }

    if (!this.commandMenu.isSelected) {
      return false;
    }
    

    if (this.viewState == 'opened') {
      return false;
    }

    

    return this.checkContextForOpen();
  }

  // オープンできるかどうか：コンテキストのチェック
  checkContextForOpen() {
    // 選択中のコマンドメニューが「はなす」でなければカット
    if (this.commandBox.currentCommandMenuContext.menuName != 'はなす' && this.commandBox.currentCommandMenuContext.menuName != 'しらべる' &&
    this.commandBox.currentCommandMenuContext.menuName != 'とびら' && this.commandBox.currentCommandMenuContext.menuName != 'ちず') {     
      return false;
    }

    return true;
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
      '＊「ラルドという　けんしのことを\n　　しっているか？',
      '＊「かれは　とてつもない　さいのうを\n　　もったおとこだったけれど\n　　みちを　あやまってしまったんだ。',
      '＊「ちのはてを　もとめて　たびだったという\n　　ことだけど　そのあと　どうなったかは\n　　だれひとり　しらないんだ。'
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
    ['＊「とてつもない　さいのうを　　　　　もった　けんしだったけれど　　　　みちを　あやまってしまった',
     '＊「けれど　かれの　ししょうの　　　　オルテガは　かれのことを　　　　　さいごまで　しんじていたよ',
     '＊「ラウドは　そんなししょうの　　　　きもちを　いともかんたんに　　　　ふみにじって　オルテガを　　　　　なきものに　したんだ',
     '＊「このまちで　ラウドのことを　　　　よくおもっている　ものは　　　　　だれも　いないだろうね',
     '＊「ララベルを　のぞいてはね…'],
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