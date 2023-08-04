import Sprite from "./sprite.js";
import { handleInput, pistas, posicaoInicial, recurso } from "./util.js";


class Jogador{

    // Construtor da classe Jogador
    constructor() {

        // Posição do jogador nos eixos x, y e z
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.horaAtualizacaoAnimacao = 3 / 60;

        this.maxAlcance = 4;
        this.forcaCurva = 0;
        this.forcaCentrifuga = 0;

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

    // Método para mudar a posição do jogador 
    // para a esquerda com base na força de curva
    mudarXParaEsquerda(forcaCurva) {

        // Verifica se a posição atual do jogador 
        // está além do limite à esquerda
        this.x = this.x <= -this.maxAlcance

           // Define a posição como o limite à esquerda
           ? this.x = -this.maxAlcance
           
           // Reduz a posição atual do jogador 
           // com base na força de curva
           : this.x -= forcaCurva
    }

    // Método para mudar a posição do jogador 
    // para a direita com base na força de curva
    mudarXParaDireita(forcaCurva) {

        // Verifica se a posição atual do jogador 
        // está além do limite à direita
        this.x = this.x >= this.maxAlcance

           // Define a posição como o limite à esquerda
           ? this.x = this.maxAlcance

           // Reduz a posição atual do jogador com base na força de curva
           : this.x += forcaCurva;
    }

    // Função para reforçar a curva com potência baixa de velocidade
    reforcarCurvaPotênciaBaixaVelocidade() {

        if (this.correnteDeEnergia < 300) return 2;

        return 1;
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

            let impulsionarCurvaDesaceleracao = 1;

            let segmento = estrada.getSegmento(camera.cursor);

            const midSpd = this.maxVelocidade / 2;

            // // Verifica se a posição do jogador em relação ao eixo x é maior que 2.2,
            // // se o segmento da pista possui uma curva e se a corrente de energia 
            // // é maior que a metade da velocidade máxima
            // if (Math.abs(this.x) > 2.2 && segmento.curva && this.correnteDeEnergia > midSpd) {

            //     // Reduz a corrente de energia do jogador aplicando a aceleração 
            //     // baseada nos parâmetros
            //     this.correnteDeEnergia -= aceleracao(this.correnteDeEnergia, 7.2);

            // // Caso contrário, verifica se a posição do jogador em relação ao eixo x é maior que 1.6,
            // // se o segmento da pista não possui uma curva e se a corrente de energia é maior que a 
            // // metade da velocidade máxima    
            // } else if (Math.abs(this.x) > 1.6 && !segmento.curva && this.correnteDeEnergia > midSpd) {
                
            //     // Reduz a corrente de energia do jogador aplicando a aceleração baseada nos parâmetros
            //     this.correnteDeEnergia -= aceleracao(this.correnteDeEnergia, 7,2);
            // }

            // aceleração e parada do carro

            if (handleInput.ehTeclaParaBaixo('arrowUp')) {

                if (this.correnteDeEnergia === 0) this.iniciarPressionado = window.performance.now(); 

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
                    // O resultado dessa função é somado à this.correnteDeEnergia. 
                    ? this.maxVelocidade : this.correnteDeEnergia += aceleracao(this.correnteDeEnergia, 0.9);

                    // Atualiza o cursor da câmera com base na velocidade atual do jogador
                    cameraClass.cursor += this.correnteDeEnergia;

            } else if (handleInput.ehTeclaParaBaixo('arrowDown') && !handleInput.ehTeclaParaBaixo('arrowUp') && this.correnteDeEnergia >= 0) {
                
                const forcaDeParada = 6;

                this.correnteDeEnergia = this.correnteDeEnergia % forcaDeParada === 0

                   ? this.correnteDeEnergia : Math.ceil(this.correnteDeEnergia / forcaDeParada) * forcaDeParada;

                this.correnteDeEnergia = this.correnteDeEnergia <= 0 ? 0 : this.correnteDeEnergia += -forcaDeParada;

                cameraClass.cursor += this.correnteDeEnergia;

            } else if (!handleInput.ehTeclaParaBaixo('arrowUp') && this.correnteDeEnergia > 0) {
                
                this.correnteDeEnergia = this.correnteDeEnergia % 1 === 0

                   ? this.correnteDeEnergia
                   : Math.ceil(this.correnteDeEnergia);

                this.correnteDeEnergia = this.correnteDeEnergia < 2 ? 0 : this.correnteDeEnergia += -2;

                cameraClass.cursor += this.correnteDeEnergia;
            }

            // fazendo uma força centrífuga para puxar o carro
            segmento = estrada.getSegmento(camera.cursor);
            const jogadorPos = (Math.floor((camera.cursor / estrada.segmentoTamanho)));
            const baseForca = 0.06;

            // fazendo movimentos do jogadorCar no eixo X
            this.forcaCurva = baseForca 
                * (this.correnteDeEnergia / this.maxVelocidade) 
                * this.reforcarCurvaPotênciaBaixaVelocidade();

            // Calcula a força de curva ajustada com base na força centrífuga 
            // e na corrente de energia do jogador em relação à velocidade máxima
            const curvaForcaComForcaCentrifuga = (
                baseForca + Math.abs(4 * (segmento.curva / 100))) * (this.correnteDeEnergia / this.maxVelocidade);

            // Verifica se a tecla 'seta para a esquerda' está pressionada, 
            // se a potência de corrida não é zero e se a curva do segmento é negativa
            if (handleInput.ehTeclaParaBaixo('arrowleft') 
                && this.correnteDeEnergia !== 0 && segmento.curva < 0) {


                // Calcula a força de curva com base na força centrífuga multiplicada 
                // pelo impulso da curva e pelo reforço de potência de curva em baixa velocidade
                this.forcaCurva = curvaForcaComForcaCentrifuga 
                    * impulsionarCurvaDesaceleracao 
                        * this.reforcarCurvaPotênciaBaixaVelocidade();

                // Muda a posição do jogador para a esquerda 
                // com base na força de curva calculada
                this.mudarXParaEsquerda(this.forcaCurva);
                
            } else if (handleInput.ehTeclaParaBaixo('arrowleft') && this.correnteDeEnergia !== 0 && segmento.curva > 0) {

                // Calcula a força de curva com base na força centrífuga dividida por 40 (ajuste)
                this.forcaCurva = curvaForcaComForcaCentrifuga / 40;

                // Reduz a força centrífuga por 40 (ajuste)
                this.forcaCentrifuga /= 40;

                // Muda a posição do jogador para a esquerda 
                // com base na força de curva calculada
                this.mudarXParaEsquerda(this.forcaCurva);
                
            } else if (handleInput.ehTeclaParaBaixo('arrowleft') && this.correnteDeEnergia !== 0) {

                // Aumenta a força de curva em 15%
                this.forcaCurva *= 1.15;

                // Muda a posição do jogador para a esquerda 
                // com base na força de curva calculada
                this.mudarXParaEsquerda(this.forcaCurva);
                
            } else if (handleInput.ehTeclaParaBaixo('arrowright') && this.correnteDeEnergia !== 0 && segmento.curva > 0) {

                // // Calcula a força de curva com base na força 
                // // centrífuga multiplicada pelo impulso da curva 
                // // e pelo reforço de potência de curva em baixa velocidade
                // this.forcaCurva = curvaForcaComForcaCentrifuga * impulsionarCurvaDesaceleracao
                //    * this.reforcarCurvaPotênciaBaixaVelocidade();
                
                // Muda a posição do jogador para a direita 
                // com base na força de curva calculada
                this.mudarXParaDireita(this.forcaCurva)


            } else if (handleInput.ehTeclaParaBaixo('arrowright') && this.correnteDeEnergia !== 0 && segmento.curva < 0) {

                // // Calcula a força de curva com base na força centrífuga dividida por 40 (ajuste)
                // this.forcaCurva = curvaForcaComForcaCentrifuga / 40;

                // // Reduz a força centrífuga por 40 (ajuste)
                // this.forcaCentrifuga /= 40;

                // Muda a posição do jogador para a direita 
                // com base na força de curva calculada
                this.mudarXParaDireita(this.forcaCurva)
                
            } else if (handleInput.ehTeclaParaBaixo('arrowright') && this.correnteDeEnergia !== 0) {

                // // Aumenta a força de curva em 15%
                // this.forcaCurva *= 1.15;

                // Muda a posição do jogador para a direita 
                // com base na força de curva calculada
                this.mudarXParaDireita(this.forcaCurva)
                
            }
                
    

            this.posicaoPista += this.correnteDeEnergia;

            // const { tamanhoPista } = pistas[estrada.pistaNome];
            // const atualPosicao = this.posicaoPista / 200;
            // const atualVolta = Math.floor(atualPosicao / tamanhoPista);

            // if (this.volta < atualVolta) {
                

            // }

            // if(this.correnteDeEnergia < 0) this.correnteDeEnergia = 0;
            this.cursor = camera.cursor;

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