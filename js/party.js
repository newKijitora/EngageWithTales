/*****************************
 * パーティクラス            *
 *****************************/

class Party {
    // コンストラクタ
    constructor() {
        this.member = [];
    }

    // メンバーを追加する
    add(character) {
      this.member.push(character);
    }
}