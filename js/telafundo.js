import Sprite from './sprite.js';
import { recurso } from './util.js';

class TelaFundo {

  constructor() {

    // Inicializa as propriedades da classe TelaFundo
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.camadaVelocidade1 = 0.001;
    this.camadaVelocidade2 = 0.002;
    this.camadaVelocidade3 = 0.003;
    this.camada1deslocamento = 0;
    this.camada2deslocamento = 0;
    this.camada3deslocamento = 0;
    this.camada1 = new Sprite();
    this.camada2 = new Sprite();
    this.camada3 = new Sprite();

  }

  // Método para criar as camadas de fundo
  create() {

    // Define a imagem para cada camada
    this.camada1.imagem = recurso.get('skyClear');
    this.camada2.imagem = recurso.get('hill'); 
    this.camada3.imagem = recurso.get('tree');

    // Define nomes para cada camada
    this.camada1.nome = 'bgSky';
    this.camada2.nome = 'bgHill';
    this.camada3.nome = 'bgTree';

  }

  // Método para atualizar as camadas de fundo com base no jogador, câmera, estrada e diretor
  update(jogador, camera, estrada, diretor) {

    // Verifica se o jogo está pausado
    if (diretor.pausado) {
      
      // Função para ajustar valores entre 0 e max (loop)
      // const aumentar = (iniciar, incrementar, max) => {

      //   let resultado = iniciar + incrementar;

      //   while(resultado >= max) {

      //     resultado -= max;
      //   }

      //   while (resultado < 0) {
          
      //     resultado += max;
      //   }

      //   return resultado;
      // }

      // // Obtém o segmento de linha atual com base na posição da câmera
      // const segmento = estrada.getSegmento(camera.cursor);

      // // Calcula a velocidade percentual do jogador
      // const velocidadePercentual = jogador.correnteDeEnergia / jogador.maxVelocidade;

      // // Atualiza os deslocamentos das camadas com base na velocidade do jogador 
      // // e na curvatura do segmento de linha
      // this.deslocamentoCamada1 = aumentar(
      //   this.deslocamentoCamada1, this.camadaVelocidade1 * segmento.curva * velocidadePercentual * -1, 2,
      // );

      // this.deslocamentoCamada2 = aumentar(
      //   this.deslocamentoCamada2, this.camadaVelocidade2 * segmento.curva * velocidadePercentual * -1, 2,
      // );

      // this.deslocamentoCamada3 = aumentar(
      //   this.deslocamentoCamada3, this.camadaVelocidade3 * segmento.curva * velocidadePercentual * -1, 2,
      // );
    }
  }

  /**
   * Método para renderizar as camadas de fundo na tela
   * @param {Render} render
   * @param {Camera} camera
   * @param {Number} estradaLargura
   */
  render(render, camera, jogador, estradaLargura) {
    const clip = 0;
    const escala = 1 / camera.h;
    const arrCamadas = ['camada1', 'camada2', 'camada3'];

    
    // Loop para renderizar cada camada de fundo
    arrCamadas.forEach((item) => {
      
      // Define a escala X e Y da camada
      this[item].escalaX = 9;
      this[item].escalaY = 9;

      // Calcula a posição horizontal da camada com base na posição da câmera
      const posicaoW = camera.tela.meioTela.x * 2 * this[`${item}deslocamento`];
      
      // Ajusta a largura correta para o jogador (o jogador é um sprite com tamanho de 64)
      const corretaLargura = jogador.width / 64;

      // Renderiza a camada na tela
      render.drawSprite(
        
        this[item], camera, jogador, estradaLargura, escala * 0.05 * corretaLargura,
        posicaoW, this[item].height, clip,
        
      );

      // Verifica se o valor absoluto do deslocamento da camada é maior que 1
      if (Math.abs(this[`${item}deslocamento`]) > 1) {
        
        // Renderiza novamente a camada com um deslocamento adicional
        render.drawSprite(

          this[item], camera, jogador, estradaLargura,
          escala * 0.05 * corretaLargura, posicaoW - this[item].width, this[item].height, clip,
        );
      }
    });
  }
}

// Exporta a classe TelaFundo
export default TelaFundo;
