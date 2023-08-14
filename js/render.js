

class Render {

    /**
    *
    * @param {CanvasRenderingContext2D} ctx - Contexto do canvas para renderização
    */

    constructor(ctx) {

        // Armazena o contexto do canvas
        this.ctx = ctx;
    }

    // Limpa a área do canvas dentro de um retângulo especificado
    clear(x, y, w, h) {
        this.ctx.clearRect(x, y, w, h);
    }

    // Salva o estado atual do contexto
    save() {
    this.ctx.save();
    }

    // Restaura o estado do contexto para o último salvo
    restore() {
    this.ctx.restore();
    }

    // Desenha um trapezoide na tela com coordenadas e larguras especificadas
    drawTrapezium(x1, y1, w1, x2, y2, w2, cor = 'green') {

        this.drawPolygon(cor, x1- w1, y1, x1 + w1, y1, x2 + w2, y2, x2 - w2, y2);
    }

    // Desenha um polígono com uma cor e um conjunto de coordenadas
    drawPolygon(cor, ...coords) {

        if (coords.length > 1) {
            
            const { ctx } = this;
            ctx.save();
            ctx.fillStyle = cor;
            ctx.beginPath();
            ctx.moveTo(coords[0], coords[1]);

            for(let i = 2; i < coords.length; i += 2) {

                ctx.lineTo(coords[i], coords[(i + 1) % coords.length]);
            }

            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    desenharCirculo(x, y, radius, anguloInicial, anguloFinal, antiHorario, cor = 'black') {

        const { ctx } = this;

        ctx.beginPath();
        ctx.strokeStyle = cor;
        ctx.arc(x, y, radius, anguloInicial, anguloFinal, antiHorario);
        ctx.stroke();
      }

    // Desenha texto na tela com várias opções de formatação
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
     * @param {Sprite} sprite - O sprite a ser desenhado
     * @param {Camera} camera - A câmera que determina a posição do sprite
     * @param {Jogador} jogador - O jogador relacionado ao sprite
     * @param {Number} estradaLargura - A largura da estrada
     * @param {Number} escala - A escala do sprite
     * @param {Number} destX - A posição X do destino do sprite
     * @param {Number} destY - A posição Y do destino do sprite
     * @param {Number} clip - Valor de recorte
     * @param {Number} spritesInX - Número de sprites na direção X
     * @param {Number} spritesInY - Número de sprites na direção Y
     */
    drawSprite(sprite, camera, jogador, estradaLargura, escala,
        destX, destY, clip, spritesInX = 1, spritesInY = 1 ) {

        let novoDestX = destX;
        let novoDestY = destY;
        const { meioTela } = camera.tela;
        const spriteWidth = sprite.width;
        const spriteHeight = sprite.height;
        const fator = 1 / 3;
        const deslocamentoY = sprite.deslocamentoY || 1;

        const {
            posicaoFolhaX, posicaoFolhaY, escalaX, escalaY
        } = sprite;

        const destWidth = (spriteWidth * escala * meioTela.x) *
            (((estradaLargura * escalaX) / (jogador.width ?? 64)) * fator);

        const destHeight = (spriteHeight * escala * meioTela.x) *
            (((estradaLargura * escalaY) / (jogador.width ?? 64)) * fator);


        novoDestX += -destWidth * 0.5;
        novoDestY -= (destHeight * spritesInX * deslocamentoY) / spritesInY;

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

    // Desenha um retângulo arredondado
    roundRect(cor, x, y, width, height, radius = 5, fill, stroke = true) {

        
    }
    
}

// Exporta a classe Render para ser utilizada em outros módulos
export default Render
