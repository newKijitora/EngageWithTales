var Flg = function() {};
  
  Flg.lst = {
    cmd: false,
    tlk: false,
    fnc: false,
    kyup: true,
    bg1: true,
    bg2: false
  };

Flg.ref = function(str) {
    return Flg.lst[str];
  }
  
Flg.snd = function(str, bl) {
    Flg.lst[str] = bl;
  }
  