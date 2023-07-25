import { handleInput, pistas, recurso } from "./util.js";
import Sprite from "./sprite.js";

class Diretor {

    constructor() {

        this.tempoReal = 0;
        this.tempoDesdeAUltimaTrocaFrame = 0;
        this.pausado = 0;
        this.volta = 0;
        this.temposTotaisVolta = [];
        this.tempoVoltas = [];
        this.luzesLargada =  new Sprite();
        this.correndo = true;
    }

    // create() {}

    create(estrada, pistaNome) {

        handleInput.mapPress.p = true;

        // const primeiraLinhaSegmento = estrada.getSegmentoDoIndice(0);
        // const segmentoLinhaDez = estrada.getSegmentoDoIndice(pistas[estrada.pistaNome].tamanhoPista - 160);

        // this.pistaNome = pistaNome;

        // this.luzesLargada.deslocamentoX = 0;
        // this.luzesLargada.deslocamentoY = 2;
        // this.luzesLargada.escalaX = 27;
        // this.luzesLargada.escalaY = 27;
        // this.luzesLargada.spritesInX = 6;
        
        
        // this.luzesLargada.imagem = recurso.get('');
        // this.luzesLargada.nome = '';
        

        // primeiraLinhaSegmento.sprites.push(this.luzesLargada);
        // segmentoLinhaDez.sprites.push(this.luzesLargada);
    }
}

export default Diretor