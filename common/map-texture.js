// ------------------------------------------------------------------
// マップテクスチャークラス
// ------------------------------------------------------------------

class MapTexture extends Texture {
  constructor(imageName, collision, next, nextIndex) { super(imageName);
    this.collision = collision;
    this.next = next;
    this.nextIndex = nextIndex;
  }
}
