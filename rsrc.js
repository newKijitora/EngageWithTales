var Rsrc = function() {};

// 定数のリスト
Rsrc.fNum = {
  // マップユニットの総数
  mpUnt: 567,
  // マップユニットの列数
  mpCol: 27,
  // マップユニットの行数
  mpRow: 21,
  // マップ描画開始位置
  strtPos: 2295,
  // チップの単位
  cll: 32,
  // ベース
  bs: 3388
};

/*
Rsrc.dcmt = [
  pbg: document.getElementById("pbg"),setElemを使えばいけるかも
];
*/

Rsrc.mpAry = {
  "bg1": [],
  "bg2": []
};

Rsrc.aryDist = [-1, (-27 * 4), 1, (27 * 4)];
Rsrc.aryDist2 = {
  65: -1,
  68: 1,
  83: (27 * 4),
  87: (-27 * 4),
  0: 0
};

Rsrc.drct = {
  65: [2, 0],// 左移動
  68: [-2, 0],// 右移動
  83: [0, -2],// 下移動
  87: [0, 2],// 上移動
  5: [0, 0]
};


