

class SegmentoLinha {

    escala = 0;
    index = 0;
    curva = 0;
    guia = 0;

    /**
    * @type {Sprite[]}
    */
    
    sprites = [];

    clip = 0;

    #cores = { estrada: '', grama: '', guia: '', faixa: ''};

    pontos = new class {
        mundo = new class {
            x = 0;
            y = 0;
            z = 0;
            w = 0;
        }

        tela = new class {
            xUnrounded = 0;
            yUnrounded = 0;
            wUnrounded = 0;
            x = 0;
            y = 0;
            w = 0;
        };
    };

    get cores() {

        return this.#cores;
    }

    set cores(cores) {

        this.#cores = cores;
    }

    /**
     * 
     * @param {Camera} camera 
     */
    projetar(camera) {

        const { mundo, tela } = this.pontos;
        const meioTela = camera.tela.meioTela;

        camera.deltaZ = mundo.z - camera.z;

        const escala = this.escala = camera.distanciaDoPlanoProjetor / camera.deltaZ;

        tela.xUnrounded = (1 + (mundo.x - camera.x) * escala) * meioTela.x;
        tela.yUnrounded = (1 - (mundo.y - camera.y) * escala) * meioTela.y;
        tela.wUnrounded = mundo.w * escala * escala * camera.tela.width;

        tela.x = Math.round(tela.xUnrounded);
        tela.y = Math.round(tela.yUnrounded);
        tela.w = Math.round(tela.wUnrounded);
    }
    /**
     * @param {Camera} camera
     * @param {Render} render
     */
    drawSprite(render, camera) {

        const sprites = this.sprites;

        for (let i = sprites.length - 1; i >= 0; i -= 1) {
            
            const sprite = sprites[i];
            const escala = this.escala;
            const { tela, mundo } = this.pontos;
            const estradaLargura = mundo.w;
            const destX = tela.xUnrounded + tela.wUnrounded * sprite.offSetX;
            const destY = tela.yUnrounded;
            const destYUp = (1 - (mundo.y - camera.y + 1550) * escala) * 180;


            render.drawSprite(
                sprite, camera,
                estradaLargura,
                escala, destX,
                destY, this.clip
            )


        }

        return this;
    }
}

export default SegmentoLinha