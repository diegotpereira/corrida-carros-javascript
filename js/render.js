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

    drawTrapezium(x1, y1, w1, x2, y2, w2, color = 'green') {

        this.drawPolygon(color, x1 - w1, y1, x1 + w1, y1, x2 + w2, y2, x2 - w2, y2);
    }

    drawPolygon(color, ...coords) {

        if (coords.length > 1) {
            
            const { ctx } = this;

            ctx.save();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(coords[0], coords[1]);

            for (let index = 2; index < coords.length; index += 2) {
                
                ctx.lineTo(coords[index], coords[(index + 1) % coords.length]);
                
            }

            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    drawText(cor, texto, telaX = 300, telaY = 200, fontSize = '2', 
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
     * @param {Jogador} jogador
     * @param {Number} estradaLargura
     * @param {Number} escala
     * @param {Number} destX
     * @param {Number} destY
     * @param {Number} clip
     */

     drawSprite(sprite, camera, jogador, estradaLargura, escala, destX, destY, clip, spritesEmX = 1, spritesEmY = 1) {

        let novoDestX = destX;
        let novoDestY = destY;

        const { meioTela } = camera.tela;
        const spriteWidth = sprite.width;
        const spriteHeight = sprite.height;
        const fator = 1 / 3;
        const offsetY = sprite.offsetY || 1;

        const { sheetPositionX, sheetPositionY, escalaX, escalaY } = sprite;
        const destWidth = (spriteWidth * escala * meioTela.x) 
            * (((estradaLargura * escalaX) / (jogador.width ?? 64)) * fator);
        const destHeight = (spriteHeight * escala * meioTela.x) 
            * (((estradaLargura * escalaY) / (jogador.width ?? 64)) * fator);

        novoDestX += -destWidth * 0.5;
        novoDestY -= (destHeight * spritesEmX * offsetY) / spritesEmY;

        const clipHeight = clip ? Math.max(0, (novoDestY + destHeight - clip)) : 0;

        if (clipHeight < destHeight) {
            
            this.ctx.drawImage(

                sprite.imagem,
                (spriteWidth / spritesEmX) * sheetPositionX, (spriteHeight / spritesEmY) * sheetPositionY,
                spriteWidth / spritesEmX,
                (spriteHeight - (spriteHeight * clipHeight) / (destHeight * spritesEmX)) / spritesEmY,
                novoDestX, novoDestY,
                destWidth, (((destHeight * spritesEmX) - clipHeight) / spritesEmY),
            );
        }
    }
    roundRect(cor, x, y, width, height, radius = 5, fill, stroke = true) {

        const {ctx} = this;

        const radii = {

            tl: 0, tr: 0, br: 0, bl: 0
        }


        if (typeof radius === 'number') {
            radii.tl = radius;
            radii.tr = radius;
            radii.br = radius;
            radii.bl = radius;
          }


        ctx.fillStyle = cor;
        ctx.beginPath();
        ctx.moveTo(x + radii.tl, y);
        ctx.lineTo(x + width - radii.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radii.tr);
        ctx.lineTo(x + width, y + height - radii.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radii.br, y + height);
        ctx.lineTo(x + radii.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radii.bl);
        ctx.lineTo(x, y + radii.tl);
        ctx.quadraticCurveTo(x, y, x + radii.tl, y);
        ctx.closePath();

        if (fill) {
            
            ctx.fill();
        }

        if (stroke) {
            
            ctx.stroke();
        }
    }

    // drawImage(imagem, x, y, width, height) {

    //     this.ctx.drawImage(imagem, x, y, width, height)
    // }

}

export default Render