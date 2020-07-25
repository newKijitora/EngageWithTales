// コマンドボックスのコントローラー
class CommandBoxController extends Controller {

  constructor(world, town, zIndexBase) { super();
    // コンテキスト
    this.world = world;
    this.town = town;
    this.squareSize = this.town.context.squareSize;

    this.menus = [
      ["はなす", "じゅもん"],
      ["つよさ", "どうぐ"],
      ["そうび", "しらべる"]
    ];

    // 文字のテクスチャー
    this.textures = this.world.textTextures;
    this.commandTextures = this.world.resource.commandTextures;
    this.commandMap = this.world.resource.commands[0];

    this.textTextures = this.world.resource.characters;

    this.mojis = this.world.resource.textElements;

    // ビューの状態
    this.viewState = "closed";
    this.zIndexBase = zIndexBase;
    this.position = new Position(5, 2);

    // キー
    this.openKey = new Key(74, "keyup");
    this.closeKey = new Key(75, "keyup");

    this.leftKey = new Key(this.town.context.leftKeyCode, "keyup");
    this.rightKey = new Key(this.town.context.rightKeyCode, "keyup");
    this.bottomKey = new Key(this.town.context.bottomKeyCode, "keyup");
    this.topKey = new Key(this.town.context.topKeyCode, "keyup");

    this.characters = this.town.characters;

    // 方向ごとの進み具合
    this.destinations = {
      "top": new Destination(-1, 0),
      "left": new Destination(0, -1),
      "right": new Destination(0, 1),
      "bottom": new Destination(1, 0),
    };

    // テキストエリアのコントローラー
    this.textAreaController = new TextAreaController(this, this.zIndexBase);

    this.currentCommandMenu = null;

    // コマンドメニューのコントローラー
    this.commandMenuControllers = new Array(3);
    for (let i = 0; i < this.commandMenuControllers.length; i++) {
      this.commandMenuControllers[i] = new Array(2);
      for (let j = 0; j < this.commandMenuControllers[i].length; j++) {
        const commandMenuName = this.commandTexts[i][j][0];
        const isSelected = this.commandTexts[i][j][1];
        const isMemberSelectCommand = this.commandTexts[i][j][2];
        const position = new Position(j, i);

        this.commandMenuControllers[i][j] = new CommandMenuController(this, commandMenuName, isSelected, isMemberSelectCommand, position);
        
        if (isSelected) {
          this.currentCommandMenu = this.commandMenuControllers[i][j];
        }
      }
    }

    // エントリー
    this.entry(this);
  }

  // オープンできるかどうか
  get canOpen() {
    if (this.viewState == "opened") {
      return false;
    }
    // コンテキストのチェック
    return this.checkContextForOpen();
  }

  // クローズできるかどうか
  get canClose() {
    if (this.viewState == "closed") {
      return false;
    }
    // コンテキストのチェック
    return this.checkContextForClose();
  }

  get canSelectionChange() {
    if (this.viewState == "closed") {
      return false;
    }
    
    if (this.textAreaController.viewState == "opened") {
      return false;
    }

    const memberSelecterController = this.currentCommandMenu.memberSelecterController;
    
    if (memberSelecterController && memberSelecterController.state == "opened") {
      return false;
    }

    return true;
  }

  // オープンできるかどうか：コンテキストのチェック
  checkContextForOpen() {
    return true;
  }

  // クローズできるかどうか：コンテキストのチェック
  checkContextForClose() {
    // テキストボックスが進行中であれば不可
    if (this.textAreaController && this.textAreaController.isProgress) {
      return false;
    }
    if (this.currentCommandMenu.isMemberSelectCommand && this.currentCommandMenu.memberSelecterController.state == "opened") {
      return false;
    }
    return true;
  }

  commandTexts = [
    [
      ["はなす", true, false],
      ["じゅもん", false, true],
    ],
    [
      ["つよさ", false, true],
      ["どうぐ", false, true],
    ],
    [
      ["そうび", false, true],
      ["しらべる", false, false],
    ]
  ];
}