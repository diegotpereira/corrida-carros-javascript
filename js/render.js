class Render {

    /**
    *
    * @param {CanvasRenderingContext2D} ctx
    */

    constructor(ctx) {

        this.ctx = ctx;
    }

    clear(x, y, w, h) {
        this.ctx.clearRect(x, y, w, h);
    }

    save() {
    this.ctx.save();
    }

    restore() {
    this.ctx.restore();
    }


   /**
   *
   * @param {Sprite} sprite
   */
    drawSprite(sprite) {

        this.ctx.drawImage(
            sprite.imagem,
            0,
            0
        );
    }
    
}

export default Render
