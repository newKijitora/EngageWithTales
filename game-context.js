// ゲームのコンテキスト
class GameContext {

  // コンストラクタ
  constructor() {
    
  }

  static main() {
    const world = new WorldController(this);
    world.open();
  }
}