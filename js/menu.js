import { handleInput, pistas, posicaoInicial } from "./util.js";

class Menu {

    /**
     * Construtor da classe Menu
     * @param {Number} width - Largura do menu
     * @param {Number} height - Altura do menu
     */
    constructor(width, height) {

        // Inicializa as propriedades do menu
        this.exibirMenu = 0;
        this.height = height;
        this.width = width;
        this.estado = 'titulo';
        this.menuX = 5;
        this.menuY = 0;
        this.atualizarTempo = 6 / 60;

        // Textos do menu exibidos na tela
        this.menuFrase = {

            0: 'Circuito: ',
            1: 'Oponentes: ',
            2: 'Dificuldade: ',
            3: 'Música: ',
            4: 'Volume da música: ',
            5: 'Iniciar ',
        };

        // Opções disponíveis para cada item do menu
        this.menu = {

            0: Object.keys(pistas),
            1: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19'],
            2: ['novato', 'corredor', 'campeão'],
            3: ['não', 'sim'],
            4: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            5: ['corrida'],
        };

        // Opções selecionadas no menu
        this.selecionarOpcao = {

            0: 'teste',
            1: '19',
            2: 'novato',
            3: 'não',
            4: '1',
            5: 'corrida'
        };

        // Define a animação do título do menu
        this.menuTitulo = {pos: 0, direcao: 1}
    }

    // Inicia a corrida com as opções selecionadas
    iniciarCorrida(jogador, estrada, diretor) {

        // Obtém a referência para o objeto de estrada
        const estradaParam = estrada;

        // Constante para evitar erro de sintaxe
        const zero = 0;

        // Calcula a posição inicial na pista com base nas opções selecionadas
        posicaoInicial(pistas[this.selecionarOpcao[zero]].tamanhoPista);

        // Define o nome da pista com base na opção selecionada
        estradaParam.pistaNome = this.selecionarOpcao[0];

        // Cria a pista com base na opção selecionada
        estradaParam.create();

        jogador.create(this, pistas[this.selecionarOpcao[zero]].tamanhoPista);
        // Cria o diretor da corrida com a pista selecionada
        // diretor.create(estrada, this.selecionarOpcao[0]);
    
    }

    // Atualiza o menu com base nas entradas do jogador
    update(jogador, estrada, diretor) {

        // Verifica se a tecla Enter foi pressionada e o menu não está exibido
        if (handleInput.mapPress.enter && !this.exibirMenu) {
            
            // Configura a opção de música para "sim"
            // this.selecionarOpcao[3] = 'sim';

            // Exibe o menu
            this.exibirMenu = 1;

            // Define a posição inicial do título do menu
            this.menuTitulo.pos = 0;

            // Marca a tecla Enter como não pressionada
            handleInput.mapPress.enter = false;
        }

        // Verifica se o menu está sendo exibido
        if (this.exibirMenu) {

            // Última opção do menu
            const ultimaOpcaoMenu = Object.keys(this.menu).length - 1;

            // Atualiza a opção selecionada do menu com base na entrada do jogador
            if (this.menuX !== ultimaOpcaoMenu) {
                
                this.selecionarOpcao[this.menuX] = this.menu[this.menuX][this.menuY];
                handleInput.mapPress.enter = false;
            }
            

            // Verifica se a tecla Enter foi pressionada e a última opção do menu foi selecionada
            if (handleInput.mapPress.enter && this.menuX === ultimaOpcaoMenu) {

                // Obtém a referência para o botão "Pausar/Continuar" na tela
                // const botaoPausar = document.querySelector('#botaoPausar');
                // // const fps = document.querySelector('#fps');
                // // Exibe ou oculta o botão "Pausar/Continuar"
                // botaoPausar.classList.toggle('hidden');

                // Inicia a corrida com as opções selecionadas
                this.iniciarCorrida(jogador, estrada, diretor);

                 // Define o estado do menu como "corrida"
                this.estado = 'corrida';

                // Marca a tecla Enter como não pressionada
                handleInput.mapPress.enter = false;
                // fps.firstElementChild.classList.remove('hidden');
                
            }
        }
    }

    // Renderiza o menu na tela
    render(render) {

        // Desenha o título do jogo na tela
        render.desenharTexto('#EB4844', 'Corrida de Carros em JS', 320, 30, 4, 'OutriderCondBold');

        // Verifica se o menu não está sendo exibido
        if (!this.exibirMenu) {
            
            // Exibe uma mensagem para pressionar Enter para iniciar a corrida
            if (window.navigator.maxTouchPoints) {
                
                render.desenharTexto('black', 'Aperte ok para iniciar', 320, 180 + this.menuTitulo.pos);

            } else {

                render.desenharTexto('black', 'Aperte Enter para iniciar', 320, 180 + this.menuTitulo.pos);
            }
        }

        // Verifica se o menu está sendo exibido
        if (this.exibirMenu) {

            // Animação do título do menu
            if(this.menuTitulo.pos >= 4) this.menuTitulo.direcao = -1;
            if(this.menuTitulo.pos <= -4) this.menuTitulo.direcao = 1;

            this.menuTitulo.pos += (this.menuTitulo.direcao / 2);
            
             // Última opção do menu
            const maxX = Object.keys(this.menu).length - 1;

            // Índices das opções do menu acima e abaixo da opção atualmente selecionada
            const menuBaixo = this.menuX - 1 >= 0  ? this.menuX - 1 : maxX;
            const menuAlto = this.menuX + 1 <= maxX ? this.menuX + 1 : 0;

            const textoBaixo = `${this.menuFrase[menuBaixo]} ${this.selecionarOpcao[menuBaixo].toLocaleUpperCase()}`;
            const textoAlto = `${this.menuFrase[menuAlto]} ${this.selecionarOpcao[menuAlto].toLocaleUpperCase()}`;

            render.roundRect('#2C69EB', 100, 100, 440, 170, 20, true, false)
            render.desenharTexto('#FFFAF4', textoBaixo, 320, 180 - 45, 1.6);

            console.log('1', this.menuFrase[this.menuX], '2', this.menu[this.menuX][this.menuY]);

            const frase = `${this.menuFrase[this.menuX]} ${this.menu[this.menuX][this.menuY].toLocaleUpperCase()}`;
            render.desenharTexto('#050B1A', frase, 320, 180 + (this.menuTitulo.pos / 4), 1.6);
            render.desenharTexto('#FFFAF4', textoAlto, 320, 180 + 45, 1.6);

            if (window.navigator.maxTouchPoints) {
                

            }
        }

    }

}

export default Menu;