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
    this.resource = world.resource;

    // テキストのテクスチャー
    this.textTextures = world.textTextures;

    // マップに関するデータ
    this.map = null;
    this.mapSize = null;
    this.mapCenterPosition = null;
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
  requestInformation(world, townName) {
    // マップグリッドの数
    const mapWidth = this.settings.mapWidth;
    const mapHeight = this.settings.mapHeight;

    // 該当の町の情報を取得
    this.map = world.resource.maps[this.townInformation.mapIndex];
    this.mainTextureIndex = this.townInformation.mainTextureIndex;
    
    // 町のマップから衝突マップを生成
    this.collisionMap = this.createCollisionMap(this.map, world.resource.textures);
    
    this.mapSize = new Size(this.settings.squareSize.x * mapWidth, this.settings.squareSize.y * mapHeight);
    this.mapCenterPosition = new Position(this.townInformation.centerPosition[0], this.townInformation.centerPosition[1]);
    this.mapPosition = new Position(this.mapCenterPosition.x - Math.floor(mapWidth / 2), this.mapCenterPosition.y - Math.floor(mapHeight / 2));
    this.mapAreaController = new MapAreaContext(this, 100);

    // 町の人々を生成する
    this.people = this.createPeople(this);

    // コマンドボックス
    this.commandBoxController = new CommandBoxContext(this, new Position(5, 2));
  }

  talk() {
    // マップから導き出す
    console.log('しゃべらせるから！');
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
        PeopleContext.actions[town.townInformation.people[i][6]], 100);
    }
    return people;
  }
}
