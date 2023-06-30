import { canvas, recurso } from './util.js';
import Render from './render.js';
import TelaFundo from './telafundo.js';
import Estrada from './estrada.js';
import Menu from './menu.js'
import Camera from './camera.js';

window.onload = () => {
  const containerCanvas = document.querySelector('.container');
  containerCanvas.height = Math.min(
    window.innerHeight,
    0.5625 * window.innerWidth
  );
};

/**
 * 
 * @param {Render} render 
 * @param {Camera} camera 
 * @param {Estrada} estrada 
 * @param {Number} width 
 * @param {Number} height 
 */

const loop = (render, camera, estrada, telaFundo, menu, width, height) => {

  const cameraParam = camera;
  // const menuParam = menu

  render.clear(0, 0, width, height);
  render.save();

  // const menuStatus = 'titulo';

  if (menu.estado === 'corrida') {

    telaFundo.update(estrada, cameraParam);
    telaFundo.render(render, cameraParam, estrada.width);
    
    estrada.render(render, cameraParam);

    

    render.restore();
  }

  if (menu.estado === 'titulo') {

    menu.update(estrada);

    menu.render(render)

  }

  
    
  requestAnimationFrame(() => loop(render, camera, estrada, telaFundo, menu, width, height));
};

const init = () => {
  const { width, height } = canvas;
  const render = new Render(canvas.getContext('2d'));
  const camera = new Camera()
  const estrada = new Estrada();
  const telaFundo = new TelaFundo();
  const menu = new Menu(width, height);

  telaFundo.create();
  

  loop(render, camera, estrada, telaFundo, menu, width, height);
};

recurso
  .add('skyClear', './img/tela_fundo/skyClear.png')
  .add('skyDark', './img/tela_fundo/skyDark.png')
  .add('hill', './img/tela_fundo/hill.png')
  .add('tree', './img/tela_fundo/tree.png')
  .carregarImagem(() => requestAnimationFrame(() => init()));
