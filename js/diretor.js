import { handleInput, pistas, recurso } from "./util.js";
import Sprite from "./sprite.js";

// Define a classe Diretor
class Diretor {

    constructor() {

        // Inicializa propriedades da instância

        this.tempoReal = 0;
        this.tempoDesdeAUltimaTrocaFrame = 0;
        this.pausado = 0;
        this.volta = 0;
        this.temposTotaisVolta = [];
        this.tempoVoltas = [];
        this.correndo = true;

        // Cria uma nova instância da classe Sprite para representar as luzes de largada
        this.luzesLargada =  new Sprite();

        // Inicializa propriedades relacionadas ao tempo
        this.animaTempo = 0;
        this.iniciarTempo = 5000;
        this.tempoTotal = 0;
    }

    // Método para configurar elementos ao criar o objeto
    create(estrada, pistaNome) {

        // Define uma propriedade no objeto handleInput para 
        // indicar que a tecla "p" está pressionada
        handleInput.mapPress.p = true;

        // Obtém o primeiro segmento da estrada
        const primeiraLinhaSegmento = estrada.getSegmentoDoIndice(0);

        // Obtém o segmento na décima linha da estrada
        const segmentoLinhaDez = estrada.getSegmentoDoIndice(pistas[estrada.pistaNome].tamanhoPista - 160);

        // Define o nome da pista na instância do Diretor
        this.pistaNome = pistaNome;

        // Configurações das luzes de largada
        this.luzesLargada.deslocamentoX = 0;
        this.luzesLargada.deslocamentoY = 2;
        this.luzesLargada.escalaX = 27;
        this.luzesLargada.escalaY = 27;
        this.luzesLargada.spritesInX = 6;
        this.luzesLargada.posicaoFolhaX = Math.ceil(this.animaTempo / 500);
        this.luzesLargada.imagem = recurso.get('luzesLargada');
        this.luzesLargada.nome = '';

        // Adiciona as luzes de largada aos segmentos da estrada
        primeiraLinhaSegmento.sprites.push(this.luzesLargada);
        segmentoLinhaDez.sprites.push(this.luzesLargada);

        // Cria uma nova instância da classe Sprite para representar 
        // a linha da largada (lateral esquerda)
        const linhaLargadaEsquerda = new Sprite();

        linhaLargadaEsquerda.deslocamentoX = -1.15;
        linhaLargadaEsquerda.escalaX = 216;
        linhaLargadaEsquerda.escalaY = 708;
        linhaLargadaEsquerda.imagem = recurso.get('barraLinhaLateral');

        // Adiciona a linha da largada ao segmento da estrada
        primeiraLinhaSegmento.sprites.push(linhaLargadaEsquerda);
        segmentoLinhaDez.sprites.push(linhaLargadaEsquerda);

        // Cria uma nova instância da classe Sprite para representar 
        // a linha da largada (lateral direita)
        const linhaLargadaDireita = new Sprite();
        linhaLargadaDireita.deslocamentoX = 1.15;
        linhaLargadaDireita.escalaX = 216;
        linhaLargadaDireita.escalaY = 708;
        linhaLargadaDireita.imagem = recurso.get('barraLinhaLateral');

        // Adiciona a linha da largada ao segmento da estrada
        primeiraLinhaSegmento.sprites.push(linhaLargadaDireita);
        segmentoLinhaDez.sprites.push(linhaLargadaDireita);
    }

    // Método para atualizar elementos no loop do jogo
    update(jogador) {

        // Atualiza o valor da propriedade "pausado" com base na entrada do jogador
        this.pausado = handleInput.mapPress.p;
        
        // Atualiza o tempo da animação com base no tempo real
        this.animaTempo += (1 / 60) * 1000 * this.pausado;

        // Define a posição da folha de sprite das luzes de largada com base no tempo da animação
        if(this.animaTempo > this.iniciarTempo) this.luzesLargada.posicaoFolhaX = 0;
        else if(this.animaTempo > 2000 + 2500) this.luzesLargada.posicaoFolhaX = 5;
        else if(this.animaTempo > 2000 + 2000)this.luzesLargada.posicaoFolhaX = 4;
        else if(this.animaTempo > 2000 + 1500)this.luzesLargada.posicaoFolhaX = 3;
        else if(this.animaTempo > 2000 + 1000)this.luzesLargada.posicaoFolhaX = 2;
        else if(this.animaTempo > 2000 + 500)this.luzesLargada.posicaoFolhaX = 1;
    }

    render(render, jogador) {

        if (this.tempoTotal < 2500) {
            
            render.desenharTexto('#FFFAF4', 'Prepare-se...', 320, 135, 
                2, 'OutriderCond', 'center', 'black', true);
        }
    }
}

// Exporta a classe Diretor para uso em outros módulos
export default Diretor