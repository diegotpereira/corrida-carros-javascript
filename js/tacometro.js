

// Importa funções utilitárias de outro módulo
import { velocidadeEmGraus, grausEmRadiano } from "./util.js";

// Classe para representar o Tacômetro
class Tacometro {

    constructor() {

        // Inicializa a propriedade de corrente de energia
        this.correnteDeEnergia = 0;
    }

    // Método para atualizar o Tacômetro
    update(jogador, diretor) {

        // Verifica se o jogo está pausado
        if (diretor.pausado) {
            
            // Atualiza a corrente de energia com base na corrente do jogador
            this.correnteDeEnergia = jogador.correnteDeEnergia;

            // Verifica se a corrente de energia é maior que 1140
            if (this.correnteDeEnergia > 1140) {
                
                // Reduz a corrente de energia de forma aleatória
                this.correnteDeEnergia = this.correnteDeEnergia - 2 + Math.random() * 6;
            }
        }
    }

    // Método para desenhar a agulha do Tacômetro
    desenharAgulha(opcoes) {

        // Desestruturando as opções para obter os valores necessários
        const  { ctx, x, y, radius } = opcoes;

        // Calcula o ângulo da agulha com base na corrente de energia
        const velocidadeAngulo = velocidadeEmGraus(this.correnteDeEnergia / 4, 360, -30, 210);

        // Converte o ângulo para radianos
        const velocidadeRad = grausEmRadiano(velocidadeAngulo);

        // Calcula as coordenadas da agulha no arco externo
        const noArcoX = radius - (Math.cos(velocidadeRad) * 0);
        const noArcoY = radius - (Math.sin(velocidadeRad) * 0);

        // Calcula as coordenadas da agulha no arco interno
        const interiorX = radius - (Math.cos(velocidadeRad) * (radius * 0.7));
        const interiorY = radius - (Math.sin(velocidadeRad) * (radius * 0.7));

        // Calcula as coordenadas iniciais da linha da agulha
        const deX = x - radius + noArcoX;
        const deY = y - radius + noArcoY;

        // Calcula as coordenadas finais da linha da agulha
        const paraX = x - radius + interiorX;
        const paraY = y - radius + interiorY;

        // Salva o estado do contexto de renderização
        ctx.save();

        // Inicia um novo caminho no contexto de renderização
        ctx.beginPath();

        // Define a cor e a largura da linha
        ctx.strokeStyle = '#f00';
        ctx.lineWidth = 2;

        // Move o ponto de partida da linha
        ctx.moveTo(deX, deY);

        // Desenha a linha da agulha até o ponto final
        ctx.lineTo(paraX, paraY);

        // Renderiza a linha no contexto
        ctx.stroke();

        // Restaura o estado anterior do contexto de renderização
        ctx.restore();

    }

    // Definindo uma função estática para desenhar um mostrador com agulha, 
    // recebendo as opções como parâmetro
    static desenharMostradorAgulha(opcoes) {

        // Desestruturando as opções para obter os valores necessários
        const { ctx, x, y, radius } = opcoes;

        // Definindo as cores para a agulha e o fundo
        const sCor = 'rgb(127, 127, 127)'; // Cor da agulha
        const fCor = 'rgb(255, 255, 255)'; // Cor do fundo

        // Loop para desenhar oito elementos do mostrador
        for (let index = 0; index < 8; index += 1) {
            
            // Salvando o contexto atual do canvas
            ctx.save();

            // Definindo a largura da linha
            ctx.lineWidth = 3;

            // Iniciando um novo caminho de desenho
            ctx.beginPath();

            // Definindo a cor da linha da agulha
            ctx.strokeStyle = sCor;

            // Definindo a cor de preenchimento do desenho
            ctx.fillStyle = fCor;

            // Desenhando um arco
            ctx.arc(x, y, index, 15, Math.PI, true)

            // Preenchendo o desenho com a cor de preenchimento definida
            ctx.fill();

            // Desenhando a linha do contorno
            ctx.stroke();

            // Restaurando o contexto para seu estado anterior
            ctx.restore();
            
        }
    }

    // Definindo uma função estática para desenhar o arco metálico externo do tacômetro, 
    // recebendo as opções como parâmetro
    static desenharArcoMetalicoExterno(opcoes) {

        // Desestruturando as opções para obter os valores necessários
        const { ctx, x, y, radius, arcY } = opcoes;

        // Salvando o contexto atual do canvas
        ctx.save();

        // Configurando a transparência global do contexto para 0.75 (75% opaco)
        ctx.globalAlpha = 0.75;

        // Iniciando um novo caminho de desenho
        ctx.beginPath();

        // Definindo a cor de preenchimento como cinza escuro
        ctx.fillStyle = 'rgb(63, 63, 63)';

        // Desenhando um arco no canvas com centro em (x, y), 
        // raio "radius", começando no ângulo "arcY" e indo 
        // até Math.PI (180 graus) no sentido anti-horário
        ctx.arc(x, y, radius, arcY, Math.PI, true);

        // Preenchendo o arco com a cor definida
        ctx.fill();

        // Restaurando o contexto para seu estado anterior
        ctx.restore();
    }

    // Definindo uma função estática para desenhar as marcas no mostrador
    static desenharMarcas(opcoes) {

        // Desestruturando as opções para obter os valores necessários
        const { ctx, x, y, radius } = opcoes;

        // Loop para desenhar as marcas internas brancas
        for (let index = -30; index <= 210; index += 40) {
            
             // Convertendo graus em radianos
            const iRad = grausEmRadiano(index);

            // Calculando as coordenadas no arco interno
            const noArcoX = radius - (Math.cos(iRad) * (radius - 10));
            const noArcoY = radius - (Math.sin(iRad) * (radius - 10));

            // Calculando as coordenadas no arco externo
            const externoX = radius - (Math.cos(iRad) * radius);
            const externoY = radius - (Math.sin(iRad) * radius);

            // Calculando as coordenadas de início (doX, doY) ajustadas ao centro do mostrador
            const doX = x - radius + noArcoX;
            const doY = y - radius + noArcoY;

            // Calculando as coordenadas de término (paraX, paraY) ajustadas ao centro do mostrador
            const paraX = x - radius + externoX;
            const paraY = y - radius + externoY;

            // Salvando o contexto atual do canvas
            ctx.save();

            // Iniciando um novo caminho de desenho
            ctx.beginPath();

            // Definindo a cor da linha como branca
            ctx.strokeStyle = '#FFFFFF';

            // Definindo a largura da linha
            ctx.lineWidth = 1.5;

            // Movendo-se para a coordenada de início
            ctx.moveTo(doX, doY);

            // Desenhando uma linha até a coordenada de término
            ctx.lineTo(paraX, paraY);

            // Desenhando a linha no canvas
            ctx.stroke();

            // Restaurando o contexto para seu estado anterior
            ctx.restore();
  
        }

        // Loop para desenhar as marcas externas pretas
        for (let index = -30; index <= 210; index += 40) {
            
            // Convertendo graus em radianos
            const iRad = grausEmRadiano(index);

            // Calculando as coordenadas no arco interno
            const noArcoX = radius - (Math.cos(iRad) * (radius - 5));
            const noArcoY = radius - (Math.sin(iRad) * (radius - 5));

            // Calculando as coordenadas no arco externo
            const externoX = radius - (Math.cos(iRad) * radius);
            const externoY = radius - (Math.sin(iRad) * radius);

            // Calculando as coordenadas de início (doX, doY) ajustadas ao centro do mostrador
            const doX = x - radius + noArcoX;
            const doY = y - radius + noArcoY;

            // Calculando as coordenadas de término (paraX, paraY) ajustadas ao centro do mostrador
            const paraX = x - radius + externoX;
            const paraY = y - radius + externoY;

            // Salvando o contexto atual do canvas
            ctx.save();

            // Iniciando um novo caminho de desenho
            ctx.beginPath();

            // Definindo a cor da linha como preta
            ctx.strokeStyle = '#000000';

            // Definindo a largura da linha
            ctx.lineWidth = 1.5;

            // Movendo-se para a coordenada de início
            ctx.moveTo(doX, doY);

            // Desenhando uma linha até a coordenada de término
            ctx.lineTo(paraX, paraY);

            // Desenhando a linha no canvas
            ctx.stroke();

            // Restaurando o contexto para seu estado anterior
            ctx.restore();

        }
    }

    // Define um método estático para desenhar texto em um gráfico, 
    // com base nas opções fornecidas e na função de renderização especificada.
    static desenharTexto(opcoes, render) {

        // Extrai as propriedades x, y e radius do objeto "opcoes".
        const { x, y, radius } = opcoes;

        // Loop para iterar por diferentes ângulos no intervalo de -30 a 210, 
        // incrementando em 40 a cada iteração.
        for (let index = -30, compare = 0; index <= 210; index += 40) {
            
            // Incrementa o valor de "compare" a cada iteração.
            compare += 1;

            // Converte o ângulo de graus para radianos.
            const iRad = grausEmRadiano(index);

            // Calcula a posição no eixo X ao longo do arco do círculo.
            const noArcoX = radius - (Math.cos(iRad) * (radius - 19 - (compare * 0.8)));

            // Define um ajuste para a posição no eixo Y com base na condição. 
            // Subtrai 1 do ajuste quando "compare" não é igual a 4.
            const iFix = compare !== 4 ? 4 : -1;

            // Calcula a posição no eixo Y ao longo do arco do círculo.
            const noArcoY = radius - (Math.sin(iRad) * (radius - 15 - iFix));

            // Calcula as coordenadas absolutas X e Y para desenhar o texto.
            const deX = x - radius + noArcoX;
            const deY = y - radius + noArcoY;

            // Calcula a velocidade com base no índice e em um fator de ajuste.
            const velocidade = 10 + index + 20 * compare;

            // Chama a função de renderização para desenhar o texto com as configurações especificadas.
            render.desenharTexto('#000', velocidade, deX, deY, 0.75, 'OutRiderCond', 'center', '#000', false);
            
        }
    }
    // Método estático para desenhar o arco colorido no Tacômetro
    static desenharArcoCores(opcoes, render) {

        // Desestruturando as opções para obter os valores necessários
        const { ctx, x, y, radius, } = opcoes;

        // Converte ângulos para radianos para os limites de cores
        const incial = grausEmRadiano(149.5);

        const finalVerde = grausEmRadiano(291);

        const finalAmarelo = grausEmRadiano(10);

        const finalVermelho = grausEmRadiano(30.5);

        // Salva o estado do contexto de renderização
        ctx.save();

        // Define a largura da linha
        ctx.lineWidth = 3;

        // Renderiza os arcos de cores nos limites definidos
        render.desenharCirculo(x, y, radius + 1, incial, finalVerde, false, 'rgb(82, 240, 55)');
        render.desenharCirculo(x, y, radius + 1, finalVerde, finalAmarelo, false, 'yellow');
        render.desenharCirculo(x, y, radius + 1, finalAmarelo, finalVermelho, false, 'red');

        // Restaura o estado anterior do contexto de renderização
        ctx.restore();

    }

    // Método para renderizar o Tacômetro
    render(render) {

        const { ctx } = render;

        // Define as opções de renderização do Tacômetro
        const opcoes = {

            ctx: ctx,
            x: 570,
            y: 300,
            radius: 50,
            arcX: 50,
            arcY: 15
        };

        // Chamando o método para desenhar o arco metálico externo do tacômetro, 
        // passando as opções como parâmetro
        Tacometro.desenharArcoMetalicoExterno(opcoes);

        // Chamando o método para desenhar as marcas no mostrador do tacômetro, 
        // passando as opções como parâmetro
        Tacometro.desenharMarcas(opcoes);

        // Chama o método para desenhar o texto no tacômetro, 
        // recebendo as opções e a função de renderização como parâmetros
        Tacometro.desenharTexto(opcoes, render);

        // Chama o método estático para desenhar o arco colorido
        Tacometro.desenharArcoCores(opcoes, render);

        Tacometro.desenharMostradorAgulha(opcoes, render);

        // Chama o método para desenhar a agulha do Tacômetro
        this.desenharAgulha(opcoes);
    }
}

// Exporta a classe Tacometro para uso em outros módulos
export default Tacometro;