import Sprite from './sprite.js';
import { recurso, atualizarDeslocamentoCarroOponente } from './util.js';

class Oponente {

    constructor(

        // velocidadeMaxima = 600,
        // posicaoPista = 0, 
        posicaoInicial = -1,
        imagem,
        oponenteNome = 'Diego Pereira',

        
        
    ) {

        // this.velocidadeMaxima = velocidadeMaxima;
         
        this.posicaoInicial = posicaoInicial;

        // this.posicaoPista = posicaoPista;
        this.sprite = new Sprite();
        this.imagem = imagem;
        this.oponenteNome = oponenteNome; 
        this.oponenteX = 1; 
        

    }

    create() {

        this.sprite.imagem = recurso.get(this.imagem);
        this.sprite.nome = `opo${this.oponenteNome}`;
        this.sprite.deslocamentoX = 0.5 + this.posicaoInicial;
        this.sprite.escalaX = 2;
        this.sprite.escalaY = 2;
        this.sprite.spritesInX = 8;
        this.sprite.spritesInY = 1;
    }

    update(estrada, diretor, jogador, opoArr) {

        if (diretor.correndo) {
            
            this.oponenteX = atualizarDeslocamentoCarroOponente(this, jogador, diretor, opoArr);

            this.sprite.deslocamentoX += 0.008 * this.oponenteX

        }
    }
}

export default Oponente;