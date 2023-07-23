import Jogador from "./jogador.js";


class SegmentoLinha {

    // Propriedades da classe SegmentoLinha
    escala = 0; // Fator de escala
    index = 0; // Índice do segmento
    curva = 0; // Curvatura do segmento
    guia = 0; // Guia do segmento

    /**
    * @type {Sprite[]}
    */
    
    sprites = []; // Array de sprites

    clip = 0; // Recorte do segmento

    // Cores privadas da classe SegmentoLinha
    #cores = { estrada: '', grama: '', guia: '', faixa: ''};

    // Pontos de projeção do segmento
    pontos = new class {
        mundo = new class {
            
            x = 0; // Posição x no mundo 
            y = 0; // Posição y no mundo
            z = 0; // Posição z no mundo
            w = 0; // Largura no mundo
        }

        tela = new class {
            xUnrounded = 0; // Posição x não arredondada na tela
            yUnrounded = 0; // Posição y não arredondada na tela
            wUnrounded = 0; // Largura não arredondada na tela

            x = 0; // Posição x arredondada na tela
            y = 0; // Posição y arredondada na tela
            w = 0; // Largura arredondada na tela
        };
    };

    // Método getter para obter as cores do segmento
    get cores() {

        return this.#cores;
    }

    // Método setter para definir as cores do segmento
    set cores(cores) {

        this.#cores = cores;
    }

    /**
     * Projetar os pontos do segmento na tela com base na câmera
     * @param {Camera} camera 
     */
    projetar(camera) {

        // Extrai os pontos de projeção do segmento
        const { mundo, tela } = this.pontos;
        
        // Calcula o meio da tela
        const meioTela = camera.tela.meioTela;

        // Calcula a diferença de distância entre o mundo e a câmera
        camera.deltaZ = mundo.z - camera.z;

        // Calcula o fator de escala para projeção
        const escala = this.escala = camera.distanciaDoPlanoProjetor / camera.deltaZ;

        // Calcula a posição não arredondada na tela
        tela.xUnrounded = (1 + (mundo.x - camera.x) * escala) * meioTela.x;
        tela.yUnrounded = (1 - (mundo.y - camera.y) * escala) * meioTela.y;
        tela.wUnrounded = mundo.w * escala * camera.tela.width;

        // Calcula as posições arredondadas na tela
        tela.x = Math.round(tela.xUnrounded);
        tela.y = Math.round(tela.yUnrounded);
        tela.w = Math.round(tela.wUnrounded);
    }
    /**
     * Desenha o sprite na tela
     * @param {Camera} camera
     * @param {Render} render
     * @param {Jogador} jogador
     */
    drawSprite(render, camera, jogador) {

        // Obtém a lista de sprites do segmento
        const sprites = this.sprites;

        // Itera sobre os sprites a partir do último
        for (let i = sprites.length - 1; i >= 0; i -= 1) {
            
            // Obtém o sprite atual
            const sprite = sprites[i];

            // Extrai a escala e os pontos de projeção do segmento
            const escala = this.escala;
            const { tela, mundo } = this.pontos;

            // Calcula a largura da estrada
            const estradaLargura = mundo.w;

            // Calcula a posição de destino na tela
            const destX = tela.xUnrounded + tela.wUnrounded * sprite.deslocamentoX;
            const destY = tela.yUnrounded;
            const destYUp = (1 - (mundo.y - camera.y + 1550) * escala) * 180;

            // Verifica se é um sprite 'op' e se a escala está dentro de um intervalo específico
            if (sprite.nome.includes('op') && (escala * 10000 < 5 && escala * 10000 > 1.2)) {
                
                // Desenha o texto na tela com base nas informações do sprite
                render.desenharTexto('#FFFAF4', `${sprite.nome.replace('op', '')}`, destX, destYUp,
                escala * 10000, 'OutriderCond', 'center', 'black', true)
            }


            // Desenha o sprite na tela com base nas informações do sprite
            render.drawSprite(
                sprite, camera,
                jogador, estradaLargura,
                escala, destX,
                destY, this.clip,
                sprite.spritesInX, 
                sprite.spritesInY
            );
        }

        return this;
    }
}

export default SegmentoLinha