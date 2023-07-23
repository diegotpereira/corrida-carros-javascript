import Sprite from './sprite.js';
import { recurso } from './util.js';

class TelaFundo {
  constructor() {
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

  create() {
    this.camada1.imagem = recurso.get('skyClear');
    this.camada2.imagem = recurso.get('hill'); 
    this.camada3.imagem = recurso.get('tree');
    this.camada1.nome = 'bgSky';
    this.camada2.nome = 'bgHill';
    this.camada3.nome = 'bgTree';
  }

  update(jogador, camera, estrada, diretor) {

    if (diretor.pausado) {
      
      const aumentar = (iniciar, incrementar, max) => {

        let resultado = iniciar + incrementar;

        while(resultado >= max) {

          resultado -= max;
        }

        while (resultado < 0) {
          
          resultado += max;
        }

        return resultado;
      }

      const segmento = estrada.getSegmento(camera.cursor);
      const velocidadePercentual = jogador.correnteDeEnergia / jogador.maxVelocidade;

      this.deslocamentoCamada1 = aumentar(
        this.deslocamentoCamada1, this.camadaVelocidade1 * segmento.curva * velocidadePercentual * -1, 2,
      );

      this.deslocamentoCamada2 = aumentar(
        this.deslocamentoCamada2, this.camadaVelocidade2 * segmento.curva * velocidadePercentual * -1, 2,
      );

      this.deslocamentoCamada3 = aumentar(
        this.deslocamentoCamada3, this.camadaVelocidade3 * segmento.curva * velocidadePercentual * -1, 2,
      );
    }
  }

  /**
   * @param {Render} render
   * @param {Camera} camera
   * @param {Number} estradaLargura
   */
  render(render, camera, jogador, estradaLargura) {
    const clip = 0;
    const escala = 1 / camera.h;
    const arrCamadas = ['camada1', 'camada2', 'camada3'];

    
    arrCamadas.forEach((item) => {
      
      this[item].escalaX = 9;
      this[item].escalaY = 9;
      const posicaoW = camera.tela.meioTela.x * 2 * this[`${item}deslocamento`];
      
      const corretaLargura = jogador.width / 64;

      render.drawSprite(
        
        this[item], camera, jogador, estradaLargura, escala * 0.05 * corretaLargura,
        posicaoW, this[item].height, clip,
        
      );

      if (Math.abs(this[`${item}deslocamento`]) > 1) {
        
        render.drawSprite(

          this[item], camera, jogador, estradaLargura,
          escala * 0.05 * corretaLargura, posicaoW - this[item].width, this[item].height, clip,
        );
      }
    });
  }
}

export default TelaFundo;
