/*****************************
 * ステータスクラス            *
 *****************************/

class Status {
  // コンストラクタ
  constructor(name, sx, strng, speed, physcl, intl, luck, mxHp, mxMp, ofs, dfs, ex, lvl, hp, mp, swrd, arm, shld, helm) {
    this.ent = document.getElementsByClassName("Status");
    for (let i = 0; i < this.ent.length; i++) {
      document.getElementById("mntr").appendChild(this.ent.item(i));
    }
    this.nameFld = document.getElementById("nameFld");
    this.strngFld = document.getElementById("strngFld");
    this.speedFld = document.getElementById("speedFld");
    this.physclFld = document.getElementById("physclFld");
    this.intlFld = document.getElementById("intlFld");
    this.luckFld = document.getElementById("luckFld");
    this.mxHpFld = document.getElementById("mxHpFld");
    this.mxMpFld = document.getElementById("mxMpFld");
    this.ofsFld = document.getElementById("ofsFld");
    this.dfsFld = document.getElementById("dfsFld");
    this.exFld = document.getElementById("exFld");
    this.sxFld = document.getElementById("sxFld");
    this.lvlFld = document.getElementById("lvlFld");
    this.hpFld = document.getElementById("hpFld");
    this.mpFld = document.getElementById("mpFld");
    this.swrdFld = document.getElementById("swrdFld");
    this.armFld = document.getElementById("armFld");
    this.shldFld = document.getElementById("shldFld");
    this.helmFld = document.getElementById("helmFld");
    this.name = name;
    // this.strng = JSON.parse(localStorage.getItem(this.name)).strng;
    // this.physcl = JSON.parse(localStorage.getItem(this.name)).physcl;
    // this.speed = JSON.parse(localStorage.getItem(this.name)).speed;
    // this.intl = JSON.parse(localStorage.getItem(this.name)).intl;
    // this.luck = JSON.parse(localStorage.getItem(this.name)).luck;
    // this.mxHp = JSON.parse(localStorage.getItem(this.name)).mxHp;
    // this.mxMp = JSON.parse(localStorage.getItem(this.name)).mxMp;
    // this.ofs = JSON.parse(localStorage.getItem(this.name)).ofs;
    // this.dfs = JSON.parse(localStorage.getItem(this.name)).dfs;
    // this.ex = JSON.parse(localStorage.getItem(this.name)).ex;
    // this.sx = JSON.parse(localStorage.getItem(this.name)).sx;
    // this.lvl = JSON.parse(localStorage.getItem(this.name)).lvl;
    // this.hp = JSON.parse(localStorage.getItem(this.name)).hp;
    // this.mp = JSON.parse(localStorage.getItem(this.name)).mp;
    // this.swrd = JSON.parse(localStorage.getItem(this.name)).swrd;
    // this.arm = JSON.parse(localStorage.getItem(this.name)).arm;
    // this.shld = JSON.parse(localStorage.getItem(this.name)).shld;
    // this.helm = JSON.parse(localStorage.getItem(this.name)).helm;
  }

  // コンストイン
  cnstIn() {
    Status.inst.push(this);
    return this;
  }

  slct() {
    Command.inst[0].chrSlct.style.display = "block";
  }

  slctTool() {
    Command.inst[0].chrSlct2.style.display = "block";
  }

  shw() {
    switch (parseInt(Command.inst[0].pntr.style.top)) {
      case 0: Status.inst[0].inpt(); break;
      case 32: Status.inst[1].inpt(); break;
      case 64: Status.inst[2].inpt(); break;
    }
    for (let i = 0; i < this.ent.length; i++) {
      this.ent.item(i).style.display = "block";
    }
    Tlk.inst[0].bl = true;
    Tlk.inst[0].fin = true;
    Status.inst[0].Status = "tlk";
  }

  cls() {
    for (let i = 0; i < this.ent.length; i++) {
     this.ent.item(i).style.display = "none";
    }
  }

  inpt() {
    this.strng = JSON.parse(localStorage.getItem(this.name)).strng;
    this.physcl = JSON.parse(localStorage.getItem(this.name)).physcl;
    this.speed = JSON.parse(localStorage.getItem(this.name)).speed;
    this.intl = JSON.parse(localStorage.getItem(this.name)).intl;
    this.luck = JSON.parse(localStorage.getItem(this.name)).luck;
    this.mxHp = JSON.parse(localStorage.getItem(this.name)).mxHp;
    this.mxMp = JSON.parse(localStorage.getItem(this.name)).mxMp;
    this.ofs = JSON.parse(localStorage.getItem(this.name)).ofs;
    this.dfs = JSON.parse(localStorage.getItem(this.name)).dfs;
    this.ex = JSON.parse(localStorage.getItem(this.name)).ex;
    this.sx = JSON.parse(localStorage.getItem(this.name)).sx;
    this.lvl = JSON.parse(localStorage.getItem(this.name)).lvl;
    this.hp = JSON.parse(localStorage.getItem(this.name)).hp;
    this.mp = JSON.parse(localStorage.getItem(this.name)).mp;
    this.swrd = JSON.parse(localStorage.getItem(this.name)).swrd;
    this.arm = JSON.parse(localStorage.getItem(this.name)).arm;
    this.shld = JSON.parse(localStorage.getItem(this.name)).shld;
    this.helm = JSON.parse(localStorage.getItem(this.name)).helm;
    this.strngFld.innerHTML = "<div>つよさ: </div><div>" + this.strng + "</div>";
    this.speedFld.innerHTML = "<div>すばやさ: </div><div>" + this.speed + "</div>";
    this.physclFld.innerHTML = "<div>たいりょく: </div><div>" + this.physcl + "</div>";
    this.intlFld.innerHTML = "<div>かしこさ: </div><div>" + this.intl + "</div>";
    this.luckFld.innerHTML = "<div>うんのよさ: </div><div>" + this.luck + "</div>";
    this.mxHpFld.innerHTML = "<div>さいだいHP: </div><div>" + this.mxHp + "</div>";
    this.mxMpFld.innerHTML = "<div>さいだいMP: </div><div>" + this.mxMp + "</div>";
    this.ofsFld.innerHTML = "<div>こうげき力: </div><div>" + this.ofs + "</div>";
    this.dfsFld.innerHTML = "<div>しゅび力: </div><div>" + this.dfs + "</div>";
    this.exFld.innerHTML = "<div>けいけんち: </div><div>" + this.ex + "</div>";
    this.nameFld.innerHTML = "<div>なまえ: </div><div>" + this.name + "</div>"
    this.sxFld.innerHTML = "<div>せいべつ: </div><div>" + this.sx + "</div>";
    this.lvlFld.innerHTML = "<div>レベル: </div><div>" + this.lvl + "</div>";
    this.hpFld.innerHTML = "<div>HP: </div><div>" + this.hp + "</div>";
    this.mpFld.innerHTML = "<div>MP: </div><div>" + this.mp + "</div>";
    this.swrdFld.innerHTML = "<div>E " + this.swrd + "</div>";
    this.armFld.innerHTML = "<div>E " + this.arm + "</div>";
    this.shldFld.innerHTML = "<div>E " + this.shld + "</div>";
    this.helmFld.innerHTML = "<div>E " + this.helm + "</div>";
  }
  
  static inst = [];
}