import { pistas } from "./util.js";

class Estrada {

    /**
   * @type {SegmentoLinha[]}
   */

    #segmentos = [];
    #segmentoTamanho = 200;
    visiveisSegmentos = 600
    #k = 13
    #width = 2000

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

        return this.#segmentos.length;
    }

    get length() {

        return this.segmentosTamanho * this.segmentoTamanho;
    }

    get width() {

        return this.#width;
    }

    getSegmento(cursor) {

        return this.#segmentos[Math.floor(cursor / this.#segmentoTamanho) % this.segmentosTamanho];
    }

    getSegmentFromIndex(index) {

        return this.#segmentos[index % this.segmentosTamanho];
    }

    create() {

        const { tamanhoPista } = pistas[this.pistaNome]
    }

    render(render) {


    }
}

export default Estrada