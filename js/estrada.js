import SegmentoLinha from "./segmentoLinha.js";
import { pistas } from "./util.js"

class Estrada {

    /**
    * @type {SegmentoLinha[]}
    */

    #segmentos = [];
    #segmentoTamanho = 200;
    visibilidadeSegmentos = 600;
    #k = 13;
    #width = 2000;

    constructor(pistaNome) {

        this.pistaNome = pistaNome
    }

    get k() {

        return this.#k;
    }

    get segmentoTamanho() {

        return this.#segmentoTamanho;
    }

    get segmentosTamanho() {

        return this.#segmentos.length
    }

    get length() {

        return this.segmentosTamanho * this.segmentoTamanho
    }

    get width() {

        return this.#width;
    }


   /**
   *
   * @param {Number} cursor
   * @returns
   */
    getSegmento(cursor) {

        return this.#segmentos[Math.floor(cursor / this.#segmentoTamanho) % this.segmentosTamanho]
    }

    getSegmentoDoIndice(index) {

        return this.#segmentos[index % this.segmentosTamanho]
    }


    create() {

        this.#segmentos = [];
        const { k } = this;
        const { cores } = pistas["teste"];

        for (let i = 0; i < 10000; i++) {

            const coresMaisClaras = {

                estrada: cores.estradaClara,
                grama: cores.gramaClara,
                guia: cores.guiaClara,
                faixa: ''
            };

            const segmentoLinha = new SegmentoLinha();
            segmentoLinha.index = i;

            if(Math.floor(i / k) % 4 === 0) segmentoLinha.cores = coresMaisClaras;


            const { mundo } = segmentoLinha.pontos;
            mundo.w = this.width;
            mundo.z = (i + 1) * this.segmentoTamanho;
            this.#segmentos.push(segmentoLinha);
            
        }
    }

    /**
     * 
     * @param {Camera} camera
     */

    render(render, camera) {

        const cameraClass = camera;
        const { segmentosTamanho } = this//8736;

        // let cursor = 1683200;
        const baseSegmento = this.getSegmento(camera.cursor)
        const inicialPos = baseSegmento.index
        // const inicialPos = 8416

        cameraClass.y = camera.h + baseSegmento.pontos.mundo.y;

        let maxY = camera.tela.height;
        let jogador = 1
        let anx = 0;
        let snx = 0


        for (let i = inicialPos; i < inicialPos + this.visibilidadeSegmentos; i += 1) {
            
            const atualSegmento = this.getSegmentoDoIndice(i);

            cameraClass.z = camera.cursor - (i >= segmentosTamanho ? this.length : 0);
            cameraClass.x = jogador.x * atualSegmento.pontos.mundo.w - snx;
            
            // const atualSegmentoTela = atualSegmento.pontos.tela;
            const atualSegmentoTela = atualSegmento.pontos.tela;//{xUnrounded: -1527.5208614068033, yUnrounded: 959.422863405995, wUnrounded: 3695.0417228136066, x: -1528, y: 959}
            atualSegmento.clip = maxY;

            if(
                atualSegmentoTela.y >= maxY
                || camera.deltaZ <= camera.distanciaDoPlanoProjetor
            ) {

                continue;
            }


            if (i > 0) {
                
                const anteriorSegmento = this.getSegmentoDoIndice(i - 1);
                const anteriorSegmentoTela = anteriorSegmento.pontos.tela;
                const { cores } = atualSegmento;


                render.drawTrapezium(

                    anteriorSegmentoTela.x, anteriorSegmentoTela.y, anteriorSegmentoTela.w,
                    atualSegmentoTela.x, atualSegmentoTela.y, atualSegmentoTela.w,
                    cores.estrada
                )
            }
            
        }

        for (let i = (this.visibilidadeSegmentos + inicialPos) - 1; i >= inicialPos; i -= 1) {
            
            this.getSegmentoDoIndice(i)
            .drawSprite(render, camera);
            
        }
    }
}

export default Estrada;