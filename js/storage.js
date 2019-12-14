var Storage = function() {

this.storage = localStorage;

this.datas = [
{
  name: "むう",
  strng: 14,
  physcl: 12,
  speed: 15,
  intl: 16,
  luck: 17,
  mxHp: 20,
  mxMp: 12,
  ofs: 18,
  dfs: 20,
  ex: 24,
  sx: "おとこ",
  lvl: 7,
  hp: 20,
  mp: 12,
  swrd: "ひのきのぼう",
  arm: "かわのふく",
  shld: "きのたて",
  helm: "かわのぼうし"
},
{
  name: "マオ",
  strng: 28,
  physcl: 10,
  speed: 8,
  intl: 20,
  luck: 14,
  mxHp: 30,
  mxMp: 16,
  ofs: 28,
  dfs: 12,
  ex: 22,
  sx: "おんな",
  lvl: 6,
  hp: 30,
  mp: 16,
  swrd: "かみつき",
  arm: "くろのけがわ",
  shld: "ひのきのたて",
  helm: "ながいみみ"
},
{
  name: "ニコ",
  strng: 8,
  physcl: 16,
  speed: 25,
  intl: 10,
  luck: 18,
  mxHp: 16,
  mxMp: 12,
  ofs: 16,
  dfs: 14,
  ex: 21,
  sx: "おんな",
  lvl: 3,
  hp: 16,
  mp: 12,
  swrd: "つめ",
  arm: "みけねこのふく",
  shld: "ダンボール",
  helm: "かみのぼうし"
}
];

}

Storage.prototype = {

save: function() {
  for (var i = 0; i < this.datas.length; i++) {
    this.storage.setItem(this.datas[i].name, JSON.stringify(this.datas[i]));
  }
}

}