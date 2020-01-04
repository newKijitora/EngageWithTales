/*****************************
 * パーティクラス            *
 *****************************/

class Party {
    // コンストラクタ
    constructor() {
        this.member = [];
        Party.inst.push(this);
    }

    // メンバーを追加する
    add(character) {
      this.member.push(character);
    }

    static inst = [];
}