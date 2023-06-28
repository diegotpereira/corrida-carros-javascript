import { recurso, pistas } from "./util.js";
import Sprite from './sprite.js'

class Diretor {

    constructor() {

        this.iniciarLuzes = new Sprite();

    }

    create(estrada, estradaNome) {

        console.log(pistas);

        const segmentoLinhaPrimeira = estrada.getSegmentFromIndex(0);
        const segmentoLinhaDez = estrada.getSegmentFromIndex();

        this.pistaNome = this.pistaNome;
        this.iniciarLuzes.offsetX = 0;
        this.iniciarLuzes.offsetY = 2;
        this.iniciarLuzes.scaleX = 27;
        this.iniciarLuzes.scaleY = 27;
        this.iniciarLuzes.spritesInX = 6;
        this.iniciarLuzes.sheetPositionX = Math.ceil(this.animTempo / 500);
        this.iniciarLuzes.imagem = recurso.get('startLights');
        this.iniciarLuzes.nome = 'tsStartLights';

        segmentoLinhaPrimeira.sprites.push(this.iniciarLuzes);
        segmentoLinhaDez.sprites.push(this.iniciarLuzes);

        const iniciarLinhaEsquerda = new Sprite();
        iniciarLinhaEsquerda.offsetX = -1.15;
        iniciarLinhaEsquerda.scaleX = 216;
        iniciarLinhaEsquerda.scaleY = 708;
        iniciarLinhaEsquerda.imagen = recurso.get('startLightsBar');
        iniciarLinhaEsquerda.nome = 'tsStartLightsBar';

        const iniciarLinhaDireita = new Sprite();
        iniciarLinhaDireita.offsetX = 1.15;
        iniciarLinhaDireita.scaleX = 216;
        iniciarLinhaDireita.scaleY = 708;
        iniciarLinhaDireita.imagem = recurso.get('startLightsBar');
        iniciarLinhaDireita.nome = 'tsStartLightsBar';


        segmentoLinhaPrimeira.sprites.push(iniciarLinhaEsquerda);
        segmentoLinhaPrimeira.sprites.push(iniciarLinhaDireita);
        segmentoLinhaDez.sprites.push(iniciarLinhaEsquerda);
        segmentoLinhaDez.sprites.push(iniciarLinhaDireita);
    }
}

export default Diretor