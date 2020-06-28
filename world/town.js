//----------------------------------------------
// 町のクラス
//----------------------------------------------

class Town {
  // コンストラクタ
  constructor(world, townName) {
    // 世界のコンテキスト
    this.context = world;

    // 町の情報
    this.townInformation = null;

    // マップに関するデータ
    this.map = null;
    this.mapSize = null;
    this.mapCenterPosition = null;
    this.mapPosition = null;
    this.mapAreaController = null;
    this.mainBackgroundTextureIndex = 0;

    // 衝突マップ
    this.collisionMap = null;

    // 現在のキャラクターパーティ
    this.characters = this.context.characters;

    // 町の生成
    this.requestInformation(world, townName);
  }

  // JSONから町の情報を取得する
  requestInformation(world, townName) {
    const request = new XMLHttpRequest();
    request.responseType = "json";

    request.onload = () => {
      // JSONにあるすべての町の情報
      const towns = request.response;

      // 該当の町の情報を取得
      this.townInformation = towns[townName];
      this.map = world.resource.maps[this.townInformation.mapIndex];
      this.mainBackgroundTextureIndex = this.townInformation.mainBackgroundTextureIndex;
      
      world.currentMap = this.map;
      
      // 町のマップから衝突マップを生成
      this.collisionMap = this.createCollisionMap(this.map, world.resource.textures);

      this.mapSize = new Size(world.squareSize.x * 27, world.squareSize.y * 21);
      this.mapCenterPosition = new Position(this.townInformation.centerPosition[0], this.townInformation.centerPosition[1]);
      this.mapPosition = new Position(this.mapCenterPosition.x - 13, this.mapCenterPosition.y - 10);
      this.mapAreaController = new MapAreaController(world, this, 100);

      // 町の人々を生成する
      this.people = this.createPeople(this);

      // コマンドボックス
      this.commandBoxController = new CommandBoxController(this, 300);
    };

    request.open("GET", world.townJsonUrl);
    request.send();
  }

  talk() {
    // マップから導き出す
    console.log("しゃべらせるから！");
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
      people[i] = new PeopleController(town.context,
        town, town.townInformation.people[i][0],
        new Position(town.townInformation.people[i][1][0],
        town.townInformation.people[i][1][1]),
        town.townInformation.people[i][2],
        town.townInformation.people[i][3],
        town.townInformation.people[i][4],
        town.townInformation.people[i][5],
        PeopleController.actions[town.townInformation.people[i][6]],
        100);
    }
    return people;
  }
}
