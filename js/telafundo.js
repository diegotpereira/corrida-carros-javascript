import Sprite from './sprite.js';

class TelaFundo {
  constructor() {
    this.camada1 = new Sprite();
    this.camada2 = new Sprite();
    this.camada3 = new Sprite();
  }

  create(imagem) {
    this.camada1.imagem = imagem;
    this.camada2.imagem = imagem; // Exemplo: mesmo sprite para todas as camadas
    this.camada3.imagem = imagem; // Exemplo: mesmo sprite para todas as camadas
    this.camada1.nome = 'bgSky';
    this.camada2.nome = 'bgHill';
    this.camada3.nome = 'bgTree';
  }

  update() {}

  render(render) {
    const arrCamadas = ['camada1', 'camada2', 'camada3'];
    arrCamadas.forEach((item) => {
      render.drawSprite(this[item]);
    });
  }
}

export default TelaFundo;
