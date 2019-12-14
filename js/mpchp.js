/*****************************
 * マップチッククラス          *
 *****************************/

var Mpchp = function(elname, w, h, cont, posX, posY) {
  this.ent = Elem.setElem(elname, w, h, cont, posX, posY);
  this.kcd = 0;
}

/*****************************
 * クラスプロパティ           *
 *****************************/

// マップテクスチャーのリスト
Mpchp.lst = {// マップチップのソース
  0: "grass.png",
  1: "table.png",
  2: "block.png",
  3: "block2.png",
  4: "desert.png",
  5: "water.png",
  6: "door.png"
}

Mpchp.count = 1;

// マップの基本情報


/*****************************
 * クラスメソッド       *
 *****************************/

// マップチップを画面にセット
Mpchp.stUp = function(ary, mpnm) {
  for (var i = 0, x = 0, y = 0; i < Rsrc.fNum.mpUnt; i++, x++) {
    // 画面上での折り返し位置を適用
    if (i % Rsrc.fNum.mpCol == 0 && i / Rsrc.fNum.mpCol > 0) {
      x = 0;
      y += 1;
    }
    ary.push(new Mpchp("div", 1, 1, mpnm, x, y));
  }
  Rsrc.mpAry[mpnm] = ary;
}

// マップチップ描画メソッド
Mpchp.drw = function(ary, map, kcd) {
  for (var i = 0, x = 0, y = 0; i < Rsrc.fNum.mpUnt; i++, x++) {
    // 画面上での折り返し位置を適用
    if (i % Rsrc.fNum.mpCol == 0 && i / Rsrc.fNum.mpCol > 0) {
      x = 0;
      y += Rsrc.fNum.mpCol * 4;
    }
    ary[i].chgTxtr(map[Rsrc.fNum.strtPos + Rsrc.aryDist2["" + kcd] + x + y]);
  }
}

/*****************************
 * インスタンスメソッド       *
 *****************************/

Mpchp.prototype = {

  // テクスチャを変更するメソッド
  chgTxtr: function(num) {
    this.ent.style.backgroundImage = "url(images/" + Mpchp.lst[num] + ")";
  }
  
}