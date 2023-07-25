import Sprite from "./sprite.js";
import { handleInput, pistas, posicaoInicial, recurso } from "./util.js";


class Jogador{

    // Construtor da classe Jogador
    constructor() {

        // Posição do jogador nos eixos x, y e z
        this.x = 0;
        this.y = 0;
        this.z = 0;

        // Corrente de energia do jogador
        this.correnteDeEnergia = 0;

        // Velocidade máxima do jogador
        this.maxVelocidade = 1200;

        // Cria uma instância da classe Sprite para representar o jogador
        this.sprite = new Sprite();

        // Posição do jogador na pista
        this.posicaoPista = 0;

        this.iniciarPressionado = 0;
        
    }

    // Getter para obter a largura do jogador (usando a largura do sprite)
    get width() {

        return this.sprite.width;
    }

    // Getter para obter a altura do jogador (usando a altura do sprite)
    get height() {

        return this.sprite.height;
    }

    // Método para criar o jogador
    create(menu, tamanhoPista) {

        // Define a imagem do sprite como 'playerRight' obtida do recurso
        this.sprite.imagem = recurso.get('playerRight');

        // Define o nome do sprite como 'Jogador'
        this.sprite.nome = 'Jogador';

        // Define a quantidade de sprites na horizontal e vertical
        this.sprite.spritesInX = 6;
        this.sprite.spritesInY = 2;

        // Define a posição inicial do jogador na folha de sprites
        this.sprite.posicaoFolhaY = 1;

        // Define a escala horizontal e vertical do jogador
        this.sprite.escalaX = 2.5;
        this.sprite.escalaY = 3;

        // Obtém a posição qualificatória selecionada pelo menu
        const qualifPos = Number(menu.selecionarOpcao[1]) + 1;

        // Define a posição inicial do jogador na pista usando a função posicaoInicial
        this.posicaoPista = posicaoInicial(tamanhoPista, qualifPos);
    }

    // Função responsável por atualizar o estado do jogador
    // Recebe os objetos "camera", "estrada" e "diretor" como parâmetros
    update(camera, estrada, diretor) {

        // Cria uma referência para o objeto "camera" para facilitar o acesso posterior
        const cameraClass = camera

        // Verifica se o diretor está correndo
        if (diretor.correndo) {

            // this.sprite.nome = 'Jogador';
            
            // Função de aceleração que calcula a aceleração com base na velocidade atual e um multiplicador
            const aceleracao = (velocidade, mult) => ((this.maxVelocidade + 300) / (velocidade + 300))
            
                * mult * (1.5 - (velocidade / this.maxVelocidade));

            // let segmento = estrada.getSegmento(camera.cursor);

            // const midSpd = this.maxVelocidade / 2;

            // if (Math.abs(this.x) > 2.2 && segmento.curva && this.correnteDeEnergia > midSpd) {

            //     this.correnteDeEnergia -= aceleracao(this.correnteDeEnergia, 7.2);
                
            // } else if (Math.abs(this.x) > 1.6 && !segmento.curva && this.correnteDeEnergia > midSpd) {
                
            //     this.correnteDeEnergia -= aceleracao(this.correnteDeEnergia, 7,2);
            // }


            // if (handleInput.ehTeclaParaBaixo('arrowUp')) 
                
            //     if (this.correnteDeEnergia === 0) this.iniciarPressionado = window.performance.now();

            // Incrementa a velocidade atual do jogador considerando a aceleração
            this.correnteDeEnergia =
                // Essa condição verifica se a velocidade atual do jogador 
                // é maior ou igual à velocidade máxima permitida 
                this.correnteDeEnergia >= this.maxVelocidade 
                
                    // Se a condição do ponto 1 for verdadeira (a velocidade atual é maior ou igual à velocidade máxima)
                    // então o valor atribuído a this.correnteDeEnergia será this.maxVelocidade.
                    // Isso significa que a velocidade atual não pode exceder a velocidade máxima.
                    // Caso a condição do ponto 1 seja falsa (a velocidade atual é menor que a velocidade máxima), 
                    // o código após : será executado. Nesse caso, é chamada a função aceleracao, passando a this.correnteDeEnergia 
                    // e o valor 0.9 como argumentos. 
                    ? this.maxVelocidade : this.correnteDeEnergia

                   // O resultado dessa função é somado à this.correnteDeEnergia.
                   += aceleracao(this.correnteDeEnergia, 0.9);

            // Atualiza o cursor da câmera com base na velocidade atual do jogador
            cameraClass.cursor += this.correnteDeEnergia;

            // this.posicaoPista += this.correnteDeEnergia;

            // const { tamanhoPista } = pistas[estrada.pistaNome];
            // const atualPosicao = this.posicaoPista / 200;
            // const atualVolta = Math.floor(atualPosicao / tamanhoPista);

            // if (this.volta < atualVolta) {
                

            // }

            // if(this.correnteDeEnergia < 0) this.correnteDeEnergia = 0;
            // this.cursor = camera.cursor;

            // Atualiza a posição da câmera e a estrada com base nos valores atualizados
            camera.update(estrada, diretor);
        }
        
    }

    /**
     * Método para renderizar o jogador na tela
     * @param {Render} render - Instância da classe Render para desenho na tela
     * @param {Camera} camera - Instância da classe Camera que controla a visualização
     * @param {Number} estradaLargura - Largura da estrada para cálculo de posição
     */
    render(render, camera, estradaLargura) {

        // Valor de corte para evitar partes invisíveis do sprite
        const clip = 0;

        // Cálculo da escala do jogador em relação à altura da câmera
        const escala = 1 / camera.h;

        // Renderiza o sprite do jogador na tela usando a função drawSprite da classe Render
        render.drawSprite(
            this.sprite, camera, this, estradaLargura, escala,
            camera.tela.meioTela.x, camera.tela.height, clip,
            this.sprite.spritesInX, this.sprite.spritesInY
        );
    }

}

// Exporta a classe Jogador para que possa ser utilizada em outros módulos
export default Jogador;