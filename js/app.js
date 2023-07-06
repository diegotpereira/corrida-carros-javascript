import { canvas, pistas, posicaoInicial, recurso } from './util.js';
import Render from './render.js';
import TelaFundo from './telafundo.js';
import Estrada from './estrada.js';
import Menu from './menu.js'
import Camera from './camera.js';
import Jogador from './jogador.js';
import Diretor from './diretor.js';

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
 * @param {Jogador} jogador
 * @param {Estrada} estrada 
 * @param {Number} width 
 * @param {Number} height 
 */

const loop = (render, camera, jogador, estrada, telaFundo, diretor, menu, width, height) => {

  const diretorParam = diretor
  const cameraParam = camera;
  const jogadorParam = jogador;

  render.clear(0, 0, width, height);
  render.save();

  if (menu.estado === 'corrida') {

    const tempoAgora = window.performance.now();
    const tempoDecorrido = (tempoAgora - diretorParam.tempoReal) / 1000;

    diretorParam.tempoReal = tempoAgora;
    diretorParam.tempoDesdeAUltimaTrocaFrame += tempoDecorrido;

    telaFundo.update(jogadorParam, cameraParam, estrada, diretorParam);
    telaFundo.renderizarTela(render, cameraParam, jogadorParam, estrada.width);    
    estrada.render(render, cameraParam, jogadorParam);

    render.restore();
  }

  if (menu.estado === 'titulo') {

    const { selecionarOpcao } = menu;
    const tempoAgora = window.performance.now();
    const tempoDecorrido = (tempoAgora - diretorParam.tempoReal) / 1000;

    diretorParam.tempoReal = tempoAgora;
    diretorParam.tempoDesdeAUltimaTrocaFrame += tempoDecorrido;

    if (diretorParam.tempoDesdeAUltimaTrocaFrame > menu.atualizarTempo) {

      menu.update(jogadorParam, estrada); 
      diretorParam.tempoDesdeAUltimaTrocaFrame = 0;
      
    }
    

    menu.render(render)

    const { tamanhoPista } = pistas[selecionarOpcao[0]];
    const qualifPos = Number(selecionarOpcao[1]) + 1;
    cameraParam.cursor = posicaoInicial(tamanhoPista, qualifPos);
    jogadorParam.x = qualifPos % 2 ? -1 : 1;

  }

  
    
  requestAnimationFrame(() => loop(render, cameraParam, jogadorParam, estrada, telaFundo, diretorParam, menu, width, height));
};

const init = () => {
  const { width, height } = canvas;
  const render = new Render(canvas.getContext('2d'));
  const camera = new Camera()
  const diretor = new Diretor();
  const jogador = new Jogador();
  const estrada = new Estrada();
  const telaFundo = new TelaFundo();
  const menu = new Menu(width, height);

  telaFundo.create();
  

  loop(render, camera, jogador, estrada, telaFundo, diretor, menu, width, height);
};

recurso
  .add('skyClear', './img/tela_fundo/skyClear.png')
  .add('skyDark', './img/tela_fundo/skyDark.png')
  .add('hill', './img/tela_fundo/hill.png')
  .add('tree', './img/tela_fundo/tree.png')
  .carregarImagem(() => requestAnimationFrame(() => init()));
