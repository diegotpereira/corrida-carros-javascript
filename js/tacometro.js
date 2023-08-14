

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

    static desenharTexto(opcoes, render) {

        const { x, y, radius } = opcoes;

        for (let index = -30, compare = 0; index <= 210; index += 40) {
            
            compare += 1;
            const iRad = grausEmRadiano(index);
            const noArcoX = radius - (Math.cos(iRad) * (radius - 19 - (compare * 0.8)));
            const iFix = compare !== 4 ? 4 : -1;
            const noArcoY = radius - (Math.sin(iRad) * (radius - 15 - iFix));

            const deX = x - radius + noArcoX;
            const deY = y - radius + noArcoY;

            const velocidade = 10 + index + 20 * compare;

            render.desenharTexto('#000', velocidade, deX, deY, 0.75, 'OutRiderCond', 'center', '#000', false);
            
        }
    }
    // Método estático para desenhar o arco colorido no Tacômetro
    static desenharArcoCores(opcoes, render) {

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

        Tacometro.desenharTexto(opcoes, render);

        // Chama o método estático para desenhar o arco colorido
        Tacometro.desenharArcoCores(opcoes, render);



        // Chama o método para desenhar a agulha do Tacômetro
        this.desenharAgulha(opcoes);
    }
}

// Exporta a classe Tacometro para uso em outros módulos
export default Tacometro;