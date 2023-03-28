import SegmentoLinha from "./SegmentoLinha.js";
import { recurso, pistas } from "./util.js";

class Estrada {
  /**
   * @type {SegmentoLinha[]}
   */
  #segmentos = [];

  /**
   * @type {number}
   */
  #segmentoTamanho = 200;

  /**
   * @type {number}
   */
  visibilidadeSegmentos = 600;

  /**
   * @type {number}
   */
  #k = 13;

  /**
   * @type {number}
   */
  #width = 2000;

  /**
   * @type {string}
   */
  pistaNome = "";

  constructor(pistaNome) {
    this.pistaNome = "brasil";
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

  /**
   * @param {Number} cursor
   * @returns {SegmentoLinha}
   */
  getSegmento(cursor) {
    return this.#segmentos[Math.floor(cursor / this.#segmentoTamanho) * this.segmentosTamanho];
  }

  /**
   * @param {number} index
   * @returns {SegmentoLinha}
   */
  getSegmentFromIndex(index) {
    return this.#segmentos[index % this.segmentosTamanho];
  }

  create() {
    this.#segmentos = [];
    const { k } = this;
    const { tamanhoPista, cores } = pistas[this.pistaNome];

    for (let i = 0; i < tamanhoPista; i += 1) {
      const coresMaisClaras = {
        estrada: cores.estradaClara,
        grama: cores.gramaClara,
        guia: cores.guiaClara,
        faixa: "",
        tunel: cores.tunelClara,
      };
      const coresClaras = {
        estrada: "#393839",
        grama: cores.gramaEscura,
        guia: cores.guiaClara,
        faixa: "",
        tunel: cores.tunelClara,
      };
      const coresEscuras = {
        estrada: "#393839",
        grama: cores.gramaClara,
        guia: cores.guiaEscura,
        faixa: "#fff",
        tunel: cores.tunelClara,
      };
      const segmento = new SegmentoLinha(this, i, k, coresMaisClaras, coresClaras, coresEscuras);
      this.#segmentos.push(segmento);
    }
  }
}

export default Estrada;
