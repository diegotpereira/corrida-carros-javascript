import { canvas, recurso } from './util.js';
import Render from './render.js';
import TelaFundo from './telafundo.js';

window.onload = () => {
  const containerCanvas = document.querySelector('.container');
  containerCanvas.height = Math.min(
    window.innerHeight,
    0.5625 * window.innerWidth
  );
};

const loop = (render, telaFundo, width, height) => {
  render.clear(0, 0, width, height);
  render.save();
  telaFundo.update();
  telaFundo.render(render);
  render.restore();
  requestAnimationFrame(() => loop(render, telaFundo, width, height));
};

const init = () => {
  const { width, height } = canvas;
  const render = new Render(canvas.getContext('2d'));
  const telaFundo = new TelaFundo();

  // recurso.carregarImagem(() => {
  //   const imagem = recurso.get('hill');
  //   telaFundo.create(imagem);
  //   loop(render, telaFundo, width, height);
  // });

  // const imagem1 = recurso.get('skyClear');
  // const imagem2 = recurso.get('hill');
  // const imagem3 = recurso.get('tree');

  telaFundo.create();

  loop(render, telaFundo, width, height);
};

recurso
  .add('skyClear', './img/tela_fundo/skyClear.png')
  .add('skyDark', './img/tela_fundo/skyDark.png')
  .add('hill', './img/tela_fundo/hill.png')
  .add('tree', './img/tela_fundo/tree.png')
  .carregarImagem(() => requestAnimationFrame(() => init()));
