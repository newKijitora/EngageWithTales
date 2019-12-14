/* エレメントクラス */
var Elem = function() {};

/* クラスプロパティ */

Elem.setElem = function(elname, w, h, container, posX, posY) {
  // エレメントを渡すメソッド
  var elem = document.createElement(elname);
  var conti = document.getElementById(container);
  Elem.stAttr(elem, w, h, posX, posY);
  conti.appendChild(elem);
  return elem;
}

Elem.stAttr = function(elem, w, h, posX, posY) {
  with (elem.style) {
    position = "absolute";
    width = (w * Rsrc.fNum.cll) + "px";
    height = (h * Rsrc.fNum.cll) + "px";
    left = (posX * Rsrc.fNum.cll) + "px";
    top = (posY * Rsrc.fNum.cll) + "px";
  }
}