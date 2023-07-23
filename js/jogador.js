import Sprite from "./sprite.js";
import { posicaoInicial, recurso } from "./util.js";


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