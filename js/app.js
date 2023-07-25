import { canvas, pistas, posicaoInicial, recurso } from './util.js';
import Render from './render.js';
import TelaFundo from './telafundo.js';
import Estrada from './estrada.js';
import Menu from './menu.js'
import Camera from './camera.js';
import Jogador from './jogador.js';
import Diretor from './diretor.js';

// Evento executado quando a janela é carregada
window.onload = () => {

  // Obtém a referência para o elemento HTML com a classe 'container'
  const containerCanvas = document.querySelector('.container');

  // Define a altura do elemento 'container' como o mínimo entre 
  // a altura da janela e 0.5625 da largura da janela
  containerCanvas.height = Math.min(
    window.innerHeight,
    0.5625 * window.innerWidth
  );
};

/**
 * Função responsável pelo loop principal do jogo
 * @param {Render} render - Instância da classe Render responsável por renderizar na tela
 * @param {Camera} camera - Instância da classe Camera que representa a câmera do jogo
 * @param {Jogador} jogador - Instância da classe Jogador que representa o jogador
 * @param {Estrada} estrada - Instância da classe Estrada que representa a estrada do jogo
 * @param {Menu} menu - Instância da classe Menu que representa o menu do jogo
 * @param {Number} width - Largura da tela do jogo
 * @param {Number} height - Altura da tela do jogo
 */

const loop = (
  render, 
  camera, 
  jogador, 
  estrada, 
  telaFundo, 
  diretor, 
  menu, 
  width, 
  height ) => {

  // Armazena referências para as instâncias dos objetos passados como parâmetros
  const diretorParam = diretor
  const cameraParam = camera;
  const jogadorParam = jogador;

  // Limpa a tela
  render.clear(0, 0, width, height);

  // Salva o estado atual do contexto de renderização
  render.save();

  // Verifica o estado do menu e executa a lógica correspondente
  if (menu.estado === 'corrida') {

    // Atualiza o tempo decorrido para calcular o movimento dos objetos em cena
    const tempoAgora = window.performance.now();
    const tempoDecorrido = (tempoAgora - diretorParam.tempoReal) / 1000;

    diretorParam.tempoReal = tempoAgora;
    diretorParam.tempoDesdeAUltimaTrocaFrame += tempoDecorrido;

    jogadorParam.update(cameraParam, estrada, diretorParam);

    // Atualiza a posição dos elementos em cena
    telaFundo.update(jogadorParam, cameraParam, estrada, diretorParam);

    // Renderiza os elementos na tela
    telaFundo.render(render, cameraParam, jogadorParam, estrada.width);     
    estrada.render(render, cameraParam, jogadorParam);
    jogadorParam.render(render, cameraParam, estrada.width, diretorParam);

    // Restaura o estado anterior do contexto de renderização
    render.restore();
  }

  // Verifica o estado do menu e executa a lógica correspondente
  if (menu.estado === 'titulo') {

    // Obtém as opções selecionadas no menu
    const { selecionarOpcao } = menu;
    
    // Atualiza o tempo decorrido para calcular a animação do menu
    const tempoAgora = window.performance.now();
    const tempoDecorrido = (tempoAgora - diretorParam.tempoReal) / 1000;

    diretorParam.tempoReal = tempoAgora;
    diretorParam.tempoDesdeAUltimaTrocaFrame += tempoDecorrido;

    // Verifica se é necessário atualizar o menu
    if (diretorParam.tempoDesdeAUltimaTrocaFrame > menu.atualizarTempo) {

      // Atualiza o menu com base nas entradas do jogador
      menu.update(jogadorParam, estrada, diretorParam); 
      diretorParam.tempoDesdeAUltimaTrocaFrame = 0;
      
    }

    // Renderiza o menu na tela
    menu.render(render)

    // Obtém o tamanho da pista selecionada no menu
    const { tamanhoPista } = pistas[selecionarOpcao[0]];

    // Calcula a posição de classificação do jogador com base na opção selecionada
    const qualifPos = Number(selecionarOpcao[1]) + 1;
    
    // Define a posição do cursor da câmera com base na posição de classificação do jogador na pista
    cameraParam.cursor = posicaoInicial(tamanhoPista, qualifPos);

    // Define a posição inicial do jogador no eixo X com base na posição de classificação
    // Se a posição de classificação for ímpar, o jogador começa à esquerda, caso contrário, à direita
    jogadorParam.x = qualifPos % 2 ? -1 : 1;

  }
  
  // Solicita a execução da função loop na próxima animação de quadro
  requestAnimationFrame(() => loop(
    render, 
    cameraParam, 
    jogadorParam, 
    estrada, 
    telaFundo, 
    diretorParam, 
    menu, 
    width, 
    height
  ));
};

// Função de inicialização do jogo
const init = () => {

  // Obtém a largura e altura da tela do jogo
  const { width, height } = canvas;
  // Cria uma nova instância da classe Render para renderizar na tela
  const render = new Render(canvas.getContext('2d'));
  // Cria uma nova instância da classe Camera para controlar a câmera do jogo
  const camera = new Camera()
  // Cria uma nova instância da classe Diretor para controlar a corrida
  const diretor = new Diretor();
  // Cria uma nova instância da classe Jogador para representar o jogador
  const jogador = new Jogador();
  // Cria uma nova instância da classe Estrada para representar a estrada do jogo
  const estrada = new Estrada();
  // Cria uma nova instância da classe TelaFundo para representar o cenário do jogo
  const telaFundo = new TelaFundo();
  // Cria uma nova instância da classe Menu para representar o menu do jogo
  const menu = new Menu(width, height);

  // Inicializa o cenário de fundo do jogo
  telaFundo.create();
  
  // Inicia o loop principal do jogo
  loop(render, camera, jogador, estrada, telaFundo, diretor, menu, width, height);
};

// Carrega as imagens necessárias para o jogo usando o recurso e inicia o jogo após o carregamento
recurso
  .add('skyClear', './img/tela_fundo/skyClear.png')
  .add('skyDark', './img/tela_fundo/skyDark.png')
  .add('hill', './img/tela_fundo/hill.png')
  .add('tree', './img/tela_fundo/tree.png')
  .add('playerLeft', './img/jogador/playerLeft.png')
  .add('playerRight', './img/jogador/playerRight.png')
  .carregarImagem(() => requestAnimationFrame(() => init()));
