import { pistas } from "./util.js";

class Estrada {

    /**
   * @type {SegmentoLinha[]}
   */

    #segmentos = [];
    #segmentoTamanho = 200;

    get segmentosTamanho() {

        return this.#segmentos.length;
    }

    getSegmentFromIndex(index) {

        return this.#segmentos[index % this.segmentosTamanho];
    }

    create() {

        const { tamanhoPista } = pistas[this.pistaNome]
    }
}

export default Estrada