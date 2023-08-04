import SegmentoLinha from "./segmentoLinha.js";
import Sprite from "./sprite.js";
import { pistas, recurso } from "./util.js"

class Estrada {

    /**
    * @type {SegmentoLinha[]}
    */
    #segmentos = []; // Array privado de segmentos de linha
    #segmentoTamanho = 200; // Tamanho de cada segmento de linha
    visibilidadeSegmentos = 600; // Quantidade de segmentos de linha visíveis na tela
    // O valor de 'k' na classe Estrada é utilizado para determinar a frequência com 
    // que as cores dos segmentos de linha se repetem na estrada. 
    #k = 13; // Constante 'k'
    #width = 2000; // Largura da estrada

    constructor(pistaNome) {

        this.pistaNome = pistaNome;
    }

    // Método getter para obter o valor de 'k'
    get k() {

        return this.#k;
    }

    // Método getter para obter o tamanho de cada segmento de linha
    get segmentoTamanho() {

        return this.#segmentoTamanho;
    }

    // Método getter para obter a quantidade de segmentos de linha
    get segmentosTamanho() {

        return this.#segmentos.length
    }

    // Método getter para obter o tamanho total da estrada
    get length() {

        return this.segmentosTamanho * this.segmentoTamanho
    }

    // Método getter para obter a largura da estrada
    get width() {

        return this.#width;
    }


   /**
   * Obtém o segmento de linha correspondente à posição 'cursor'
   * @param {Number} cursor - A posição do cursor
   * @returns O segmento de linha correspondente à posição 'cursor'
   */
    getSegmento(cursor) {

        return this.#segmentos[Math.floor(cursor / this.#segmentoTamanho) % this.segmentosTamanho]
    }

    /**
     * Obtém o segmento de linha do índice especificado
     * @param {Number} index - O índice do segmento
     * @returns O segmento de linha do índice especificado
     */
    getSegmentoDoIndice(index) {

        return this.#segmentos[index % this.segmentosTamanho]
    }

    // Cria a estrada com base na pista definida
    create() {

        
        this.#segmentos = [];

        // Obtém o valor de 'k' da classe Estrada
        const { k } = this;

        // Obtém o tamanho da pista e as cores da pista com base no nome da pista
        const { tamanhoPista, cores } = pistas[this.pistaNome];

        // Loop para criar cada segmento da estrada
        for (let i = 0; i < tamanhoPista; i += 1) {

            // Definir as cores para cada segmento com base no padrão de cores
            const coresMaisClaras = {
                estrada: cores.estradaClara,
                grama: cores.gramaClara,
                guia: cores.guiaClara,
                faixa: ''
            };

            const coresMaisEscuras = {

                estrada: cores.estradaClara,
                grama: cores.gramaEscura,
                guia: cores.guiaEscura,
                faixa: '#fff',

            };

            const coresClaras = {

                estrada: '#393839',
                grama: cores.gramaEscura,
                guia: cores.guiaClara,
                faixa: ''
            };

            const coresEscuras = {

                estrada: '#393839',
                grama: cores.gramaClara,
                guia: cores.guiaEscura,
                faixa: '#fff'
            }

            // Cria um novo segmento de linha
            const segmentoLinha = new SegmentoLinha();

            // Define o índice do segmento
            segmentoLinha.index = i;

            // Define as cores do segmento com base no padrão de cores
            if(Math.floor(i / k) % 4 === 0) segmentoLinha.cores = coresMaisClaras;
            if(Math.floor(i / k) % 4 === 1) segmentoLinha.cores = coresMaisEscuras;
            if(Math.floor(i / k) % 4 === 2) segmentoLinha.cores = coresClaras;
            if(Math.floor(i / k) % 4 === 3) segmentoLinha.cores = coresEscuras;

            // Define cores e padrão para os primeiros 12 segmentos da estrada
            if (i <= 11) {
                
                segmentoLinha.cores.estrada = '#fff'
                i % 4 === 0 || i % 4 === 1 ? segmentoLinha.cores.checkers = 'one' : segmentoLinha.cores.checkers = 'two';
            }

            // Define o tamanho e a posição do segmento no mundo
            const { mundo } = segmentoLinha.pontos;
            mundo.w = this.width;
            mundo.z = (i + 1) * this.segmentoTamanho;

            // Adiciona o segmento à lista de segmentos
            this.#segmentos.push(segmentoLinha);

            // Função interna para criar curvas no segmento
            const criarCurva = (min, max, curva, guia) => {

                if (i >= min && i <= max) {
                    
                    segmentoLinha.curva = curva;
                    segmentoLinha.guia = guia;
                }
            };

            // Loop para criar curvas no segmento com base nas informações da pista
            pistas[this.pistaNome].curvas
                .forEach((curva) => criarCurva(curva.min, curva.max, curva.inclinacaoCurva, curva.guia));

            // adicionando lombada
            const { curva: forcaCurva, guia } = this.getSegmentoDoIndice(i);

            if(i % (k * 2) === 0 && Math.abs(forcaCurva) > 1 && guia) {

                const sinalizacaoCurva = new Sprite();

                sinalizacaoCurva.offsetX = forcaCurva > 0 ? -1.5 : 1.5;
                sinalizacaoCurva.escalaX = 72;
                sinalizacaoCurva.escalaY = 72;
                sinalizacaoCurva.imagem = recurso.get(forcaCurva > 0 ? 'sinalEsquerdo' : 'sinalDireito');
                sinalizacaoCurva.nome = 'tsCurveSignal';

                segmentoLinha.sprites.push(sinalizacaoCurva);
            }
            
        }
    }

    /**
     * Renderiza a estrada na tela
     * @param {Render} render - O renderizador do jogo
     * @param {Camera} camera - A câmera do jogo
     * @param {Jogador} jogador O jogador do jogo
     */

    // Função de renderização, recebe três parâmetros: render, camera e jogador.
    render(render, camera, jogador) {

        // Armazena a referência da classe camera em uma variável local cameraClass
        const cameraClass = camera;

        // Extrai a propriedade segmentosTamanho da classe Estrada e armazena 
        // em uma variável local
        const { segmentosTamanho } = this;

        // Obtém o segmento de linha base com base na posição da câmera e armazena 
        // o índice na variável inicialPos
        const baseSegmento = this.getSegmento(camera.cursor);
        const inicialPos = baseSegmento.index

        // Define a posição vertical da câmera ajustada para a posição do segmento de linha base
        cameraClass.y = camera.h + baseSegmento.pontos.mundo.y;

        // Inicializa variáveis maxY, anx e snx
        let maxY = camera.tela.height;
        let anx = 0;
        let snx = 0

        // Loop para renderizar os segmentos de linha visíveis na tela
        for (let i = inicialPos; i < inicialPos + this.visibilidadeSegmentos; i += 1) {
            
            // Obtém o segmento de linha atual com base no índice do loop
            const atualSegmento = this.getSegmentoDoIndice(i);

            // Ajusta a posição da câmera no eixo Z e no eixo X para acompanhar o 
            // segmento de linha atual e o jogador
            cameraClass.z = camera.cursor - (i >= segmentosTamanho ? this.length : 0);
            cameraClass.x = jogador.x * atualSegmento.pontos.mundo.w - snx;

            // Realiza a projeção do segmento de linha atual na tela
            atualSegmento.projetar(camera);

            // Atualiza as variáveis anx e snx para ajudar no cálculo 
            // do deslocamento horizontal dos segmentos de linha
            anx += atualSegmento.curva;
            snx += anx;
            
            // Armazena a posição do segmento de linha atual na tela
            const atualSegmentoTela = atualSegmento.pontos.tela;  
            atualSegmento.clip = maxY;

            // Verifica se o segmento de linha atual está acima do limite 
            // superior da tela ou se o deltaZ da câmera está abaixo da distância do plano do projetor
            // Se alguma dessas condições for verdadeira, o segmento não será renderizado, 
            // portanto, continua para o próximo segmento
        
            if(
                atualSegmentoTela.y >= maxY
                || camera.deltaZ <= camera.distanciaDoPlanoProjetor
            ) {

                continue;
            }

            // Verifica se o índice é maior que 0 para poder desenhar as áreas da estrada e faixas
            if (i > 0) {
                
                // Obtém o segmento de linha anterior com base no índice do loop anterior
                const anteriorSegmento = this.getSegmentoDoIndice(i - 1);
                const anteriorSegmentoTela = anteriorSegmento.pontos.tela;
                const { cores } = atualSegmento;

                // Verifica se o segmento de linha atual está acima do segmento de linha anterior na tela
                // Se for o caso, o segmento atual não será renderizado, portanto, continua para o próximo segmento
                if (atualSegmentoTela.y >= anteriorSegmentoTela.y) {
                    
                    continue;
                }

                // Desenha o trapézio que representa a área da estrada
                render.drawTrapezium(

                    anteriorSegmentoTela.x, anteriorSegmentoTela.y, anteriorSegmentoTela.w,
                    atualSegmentoTela.x, atualSegmentoTela.y, atualSegmentoTela.w,
                    cores.estrada
                );

                // Desenha as áreas de grama à esquerda
                render.drawPolygon(
                    cores.grama,
                    0, anteriorSegmentoTela.y,
                    anteriorSegmentoTela.x - anteriorSegmentoTela.w, anteriorSegmentoTela.y,
                    atualSegmentoTela.x - atualSegmentoTela.w, atualSegmentoTela.y,
                    0, atualSegmentoTela.y
                );

                // Desenha as áreas de grama à direita da estrada
                render.drawPolygon(
                    cores.grama,
                    anteriorSegmentoTela.x + anteriorSegmentoTela.w * 1, anteriorSegmentoTela.y,
                    camera.tela.width, anteriorSegmentoTela.y,
                    camera.tela.width, atualSegmentoTela.y,
                    atualSegmentoTela.x + atualSegmentoTela.w, atualSegmentoTela.y,
                );

                // Verifica se o segmento de linha atual possui guias laterais (faixas)
                if (atualSegmento.guia) {
                    
                    // Desenha as guias laterais à esquerda
                    render.drawPolygon(

                        // cores.guia,
                        // anteriorSegmentoTela.x - anteriorSegmentoTela.w * 1.3, anteriorSegmentoTela.y,
                        // anteriorSegmentoTela.x - anteriorSegmentoTela.w, anteriorSegmentoTela.y,
                        // atualSegmentoTela.x - atualSegmentoTela.w, atualSegmentoTela.y,
                        // atualSegmentoTela.x - atualSegmentoTela.w * 1.3, atualSegmentoTela.y,

                    );

                    // Desenha as guias laterais à direita da estrada
                    render.drawPolygon(

                        // cores.guia,
                        // anteriorSegmentoTela.x + anteriorSegmentoTela.w * 1.3, anteriorSegmentoTela.y,
                        // anteriorSegmentoTela.x + anteriorSegmentoTela.w, anteriorSegmentoTela.y,
                        // atualSegmentoTela.x + atualSegmentoTela.w, atualSegmentoTela.y,
                        // atualSegmentoTela.x + atualSegmentoTela.w * 1.3, atualSegmentoTela.y,
                    )
                }

                // Verifica se o segmento de linha atual possui faixas (cores.faixa)
                if (cores.faixa) {

                    // Desenha as faixas laterais à esquerda
                    render.drawPolygon(

                        cores.faixa,
                        anteriorSegmentoTela.x + anteriorSegmentoTela.w * -0.97, anteriorSegmentoTela.y,
                        anteriorSegmentoTela.x + anteriorSegmentoTela.w * -0.94, anteriorSegmentoTela.y,
                        atualSegmentoTela.x + atualSegmentoTela.w * -0.94, atualSegmentoTela.y,
                        atualSegmentoTela.x + atualSegmentoTela.w * -0.97, atualSegmentoTela.y,
                    );

                    // Desenha as faixas laterais à direita da estrada
                    render.drawPolygon(

                        cores.faixa,
                        anteriorSegmentoTela.x + anteriorSegmentoTela.w * -0.91, anteriorSegmentoTela.y,
                        anteriorSegmentoTela.x + anteriorSegmentoTela.w * -0.88, anteriorSegmentoTela.y,
                        atualSegmentoTela.x + atualSegmentoTela.w * -0.88, atualSegmentoTela.y,
                        atualSegmentoTela.x + atualSegmentoTela.w * -0.91, atualSegmentoTela.y,
                    );

                    // faixa direita
                    render.drawPolygon(

                        cores.faixa,
                        anteriorSegmentoTela.x + anteriorSegmentoTela.w * 0.97, anteriorSegmentoTela.y,
                        anteriorSegmentoTela.x + anteriorSegmentoTela.w * 0.94, anteriorSegmentoTela.y,
                        atualSegmentoTela.x + atualSegmentoTela.w * 0.94, atualSegmentoTela.y,
                        atualSegmentoTela.x + atualSegmentoTela.w * 0.97, atualSegmentoTela.y,
                    );

                    render.drawPolygon(

                        cores.faixa,
                        anteriorSegmentoTela.x + anteriorSegmentoTela.w * 0.91, anteriorSegmentoTela.y,
                        anteriorSegmentoTela.x + anteriorSegmentoTela.w * 0.88, anteriorSegmentoTela.y,
                        atualSegmentoTela.x + atualSegmentoTela.w * 0.88, atualSegmentoTela.y,
                        atualSegmentoTela.x + atualSegmentoTela.w * 0.91, atualSegmentoTela.y,
                    );

                    const valor = 0.02;

                    // Desenha a faixa central no meio da estrada
                    render.drawTrapezium(

                        anteriorSegmentoTela.x, anteriorSegmentoTela.y, anteriorSegmentoTela.w * valor,
                        atualSegmentoTela.x, atualSegmentoTela.y, atualSegmentoTela.w * valor,
                        cores.faixa
                    );                   
                }

                // Verifica se o segmento de linha atual possui padrão de quadriculado 'one'
                if (cores.checkers === 'one') {

                    for (let i = -1; i < 0.9; i += 2 / 3) {
                        
                        // Desenha os quadriculados na pista
                        render.drawPolygon(
                            // 'black',
                            // anteriorSegmentoTela.x + anteriorSegmentoTela.w * i, anteriorSegmentoTela.y,
                            // anteriorSegmentoTela.x + anteriorSegmentoTela.w * (i + 1 / 3), anteriorSegmentoTela.y,
                            // atualSegmentoTela.x + atualSegmentoTela.w * (i + 1 / 3), atualSegmentoTela.y,
                            // atualSegmentoTela.x + atualSegmentoTela.w * i, atualSegmentoTela.y
                        );
                        
                    }
                    
                }

                // Verifica se o segmento de linha atual possui padrão de quadriculado 'two'
                if (cores.checkers === 'two') {

                    for (let i = -2 / 3; i < 0.9; i += 2 / 3) {
                        
                        // Desenha os quadriculados na pista 
                        render.drawPolygon(
                            // 'black',
                            // anteriorSegmentoTela.x + anteriorSegmentoTela.w * i, anteriorSegmentoTela.y,
                            // anteriorSegmentoTela.x + anteriorSegmentoTela.w * (i + 1 / 3), anteriorSegmentoTela.y,
                            // atualSegmentoTela.x + atualSegmentoTela.w * (i + 1 / 3), atualSegmentoTela.y,
                            // atualSegmentoTela.x + atualSegmentoTela.w * i, atualSegmentoTela.y
                        );
                        
                    }
                    
                }
            }

            // Atualiza o valor de maxY para a próxima iteração do loop         
            maxY = atualSegmentoTela.y;
        }

        // Loop para renderizar os sprites dos segmentos de linha
        for (let i = (this.visibilidadeSegmentos + inicialPos) - 1; i >= inicialPos; i -= 1) {
            
            // Obtém o segmento de linha atual com base no índice do loop
            // this.getSegmentoDoIndice(i)
            // .drawSprite(render, camera, jogador);

            
        }
    }
}

export default Estrada;