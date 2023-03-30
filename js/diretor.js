import { canvas, pistas, recurso} from "./util.js";
import Sprite from './sprite.js'


class Diretor {

    constructor() {

        this.animTempo = 0;

        this.iniciarLuzes = new Sprite();
        this.pistaNome = 'brasil';
        this.pausado = false;

    }

    create(estrada, pistaNome) {

        // console.log(estrada);
        // console.log(pistaNome);
        // console.log(pistas);
        // console.log(tamanhoPista);

        // const tamanhoPista = 8632;
        // const estrada = new Estrada(tamanhoPista);

        // // const tamanhoPista = 8632
        // const tamanhoPista = pistas[pistaNome].tamanhoPista;

        // if (pistas[pistaNome] && pistas[pistaNome].sprites) {
        //     const { sprites } = pistas[pistaNome];
        //     // use sprites here
        // } else {
        // console.log(`Error: cannot access sprites for ${pistaNome}`);
        // }

        

        const segmentoLinhaPrimeira = estrada.getSegmentoDoIndice(0);
        const segmentoLinhaDez = estrada.getSegmentoDoIndice(pistas[estrada.pistaNome].tamanhoPista - 160);

        this.pistaNome = pistaNome;
        this.iniciarLuzes.offsetX= 0;
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
        iniciarLinhaEsquerda.imagem = recurso.get('startLightsBar');
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
    render(render)  {
        
    }
}

export default Diretor