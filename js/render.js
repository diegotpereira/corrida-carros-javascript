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

    drawTrapezium(x1, y1, w1, x2, y2, w2, cor = 'green') {

        // this.drawPolygon(cor, x1- w1, y1, x1 + w1, y1, x2 + w2, y2, x2 - w2, y2);
    }

    drawPolygon(cor, ...coords) {

        // if (coords.length > 1) {
            
        //     const { ctx } = this;
        //     ctx.save();
        //     ctx.fillStyle = cor;
        //     ctx.beginPath();
        //     ctx.moveTo(coords[0], coords[1]);

        //     for(let i = 2; i < coords.length; i += 2) {

        //         ctx.lineTo(coords[i], coords[(i + 1) % coords.length]);
        //     }

        //     ctx.closePath();
        //     ctx.fill();
        //     ctx.restore();
        // }
    }

    desenharTexto(cor, texto, telaX = 300, telaY = 200, fontSize = '2',
        font = 'OutriderCond', align = 'center', colorStroke = 'black', stroke = false) {

        const { ctx } = this;

        ctx.fillStyle = cor;
        ctx.font = font;
        ctx.font = `${fontSize} em ${font}`;
        ctx.textAlign = align;
        ctx.textBaseline = 'middle';
        ctx.fillText(texto, telaX, telaY);
        ctx.strokeStyle = colorStroke;

        if (stroke) {
            
            ctx.strokeText(texto, telaX, telaY);
        }

        ctx.restore();
    }
    
   /**
   *
   * @param {Sprite} sprite
   * @param {Camera} camera
   * @param {Number} estradaLargura
   * @param {Number} destX
   * @param {Number} destY
   * @param {Number} escala
   */
    drawSprite(sprite, camera, jogador, estradaLargura, escala,
        destX, destY, clip, spritesInX = 1, spritesInY = 1 ) {

        let novoDestX = destX;
        let novoDestY = destY;
        const { meioTela } = camera.tela;
        const spriteWidth = sprite.width;
        const spriteHeight = sprite.height;
        const fator = 1 / 3;
        const offsetY = sprite.offsetY || 1;

        const {
            posicaoFolhaX, posicaoFolhaY, escalaX, escalaY
        } = sprite;

        // const destWidth = (spriteHeight * escala * meioTela.x) *
        //     (((estradaLargura * escalaX) / (jogador.width ?? 64)) * fator);

        const destWidth = 1280;

        const destHeight = (spriteHeight * escala * meioTela.x) *
            (((estradaLargura * escalaY) / (jogador.width ?? 64)) * fator);


        novoDestX += -destWidth * 0.5;
        novoDestY -= (destHeight * spritesInX * offsetY) / spritesInY;

        const clipHeight = clip ? Math.max(0, (novoDestY + destHeight - clip)) : 0;

        if (clipHeight < destHeight) {
            
            this.ctx.drawImage(
                sprite.imagem,
                (spriteWidth / spritesInX) * posicaoFolhaX, (spriteHeight / spritesInY) * posicaoFolhaY,
                spriteWidth / spritesInX,
                (spriteHeight - (spriteHeight * clipHeight) / (destHeight * spritesInX)) / spritesInY,

                novoDestX, 
                novoDestY,
                destWidth, (((destHeight * spritesInX) - clipHeight) / spritesInY)
            );
        }
    }

    
    roundRect(cor, x, y, width, height, radius = 5, fill, stroke = true) {

        
    }
    
}

export default Render
