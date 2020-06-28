// テキストエリアのコントローラークラス
class TextAreaController extends Controller {
  // コンストラクタ
  constructor(commandBox, zIndexBase) { super();
    // コンテキスト
    this.commandBox = commandBox;

    // ビューの状態
    this.viewState = "closed";
    
    // ビューが進行中かどうか
    this.isProgress = false;
    
    // キーコード
    this.openKeyCode = 74;
    this.closeKeyCode = 75;
    this.firstThrough = true;
    
    // テキスト関連のプロパティ
    this.textSet = this.list[2];
    this.readIndex = 0;
    this.canReadContinue = false;
    this.textSpeed = this.commandBox.town.context.textSpeed;
    this.textColor = this.commandBox.town.context.textColor;
    this.textAreaBackgroundColor = this.commandBox.town.context.textAreaBackgroundColor;
    
    // 行数と一行あたりの文字数
    this.numberOfRows = 4;
    this.numberOfCells = 17;
    this.zIndexBase = zIndexBase;

    // エントリー
    this.entry(this);
  }

  // オープンできるかどうか
  get canOpen() {
    if (this.firstThrough) {
      this.firstThrough = false;
      return false;
    }
    
    if (this.viewState == "opened") {
      return false;
    }
    return this.checkContextForOpen();
  }

  // クローズできるかどうか
  get canClose() {
    // ビューがクローズ中であればクローズ不可    
    if (this.viewState == "closed") {
      return false;
    }
    return this.checkContextForClose();
  }

  // オープンできるかどうか：コンテキストのチェック
  checkContextForOpen() {
    console.log(this.commandBox.currentCommandMenu.menuName);
    if (this.commandBox.currentCommandMenu.menuName != "はなす") {     
      return false;
    }
    return true;
  }

  // クローズできるかどうか：コンテキストのチェック
  checkContextForClose() {
    return true;
  }

  // トークのリスト
  list = [
    ["なにも　みつからなかった"],
    ["＊「ぼくは　キングです！　　　　　　　このまちに　きてくれて　　　　　　とても　うれしいです　　　　　　　どうも　ありがとう！",
     "＊「このまちの　ことなら　　　　　　　なんでも　きいてね！　　　　　　　いろいろ　おしえるよ"],
    ["＊「ここは　もうだめです　　　　　　　はやく　おにげください！"],
    ["＊「とてつもない　さいのうを　　　　　もった　けんしだったけれど　　　　みちを　あやまってしまった",
     "＊「けれど　かれの　ししょうの　　　　オルテガは　かれのことを　　　　　さいごまで　しんじていたよ",
     "＊「ラウドは　そんなししょうの　　　　きもちを　いともかんたんに　　　　ふみにじって　オルテガを　　　　　なきものに　したんだ",
     "＊「このまちで　ラウドのことを　　　　よくおもっている　ものは　　　　　だれも　いないだろうね",
     "＊「ララベルを　のぞいてはね…"],
    ["＊「かれらと　はなしをするには　　　　ほんやくどうぐが　ひつよう　　　　になるだろう",
     "＊「かれらは　われわれとは　　　　　　ちがうことばを　はなすんだ",
     "＊「ほんやくどうぐが　ないと　　　　　かれらが　なにをいってるか　　　　とても　わからないよ",
     "＊「ただ　アマリスのむらにいる　　　　エリスという　しょうじょは　　　　かれらのことばが　わかる　　　　　とかいうはなしだ",
     "＊「まあ　ほんとうかどうかは　　　　　わからないがね"],
    ["＊「ここから　きたに　いった　　　　　アマベル　というむらには　　　　　ようせいと　はなしができる　　　　おんなのこ　がいるらしい"],
    ["つかえる　どうぐを　もっていない"],
    ["なにも　みにつけていない"],
    ["はなす　あいてが　だれもない"],
    ["つかえる　じゅもんがない"]
  ];
}