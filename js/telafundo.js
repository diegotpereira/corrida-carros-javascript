import Sprite from './sprite.js';
import { recurso } from './util.js';

class TelaFundo {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.camada1 = new Sprite();
    this.camada2 = new Sprite();
    this.camada3 = new Sprite();
  }

  create(imagem) {
    this.camada1.imagem = recurso.get('skyClear');
    this.camada2.imagem = recurso.get('hill'); 
    this.camada3.imagem = recurso.get('tree');
    this.camada1.nome = 'bgSky';
    this.camada2.nome = 'bgHill';
    this.camada3.nome = 'bgTree';
  }

  update() {}

  render(render) {
    const arrCamadas = ['camada1', 'camada2', 'camada3'];
    arrCamadas.forEach((item) => {
      this[item].escalaX = 9;
      this[item].escalaY = 9;
      render.drawSprite(this[item]);
    });
  }
}

export default TelaFundo;
