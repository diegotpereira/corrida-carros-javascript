import { canvas, recurso, pistas, posicaoInicial } from "./util.js";
import Render from './render.js'
import Diretor from "./diretor.js";
import Estrada from "./estrada.js";
import Menu from './menu.js'
import Camera from "./camera.js";
import TelaDeFundo from "./teladefundo.js";
import Jogador from "./jogador.js";

window.onload = () => {

    const containerCanvas = document.querySelector('.container')

    containerCanvas.height = Math.min(window.innerHeight, (0.5625 * window.innerWidth));

}

/**
 *
 * @param {Render} render
 * @param {Camera} camera
 * @param {Jogador} jogador
 * @param {Estrada} estrada
 * @param {Number} width
 * @param {Number} height
 */

const loop = (render, camera, jogador, estrada, bg, diretor, menu, width, height) => {

    const diretorParam = diretor;
    const cameraParam = camera;
    const jogadorParam = jogador;

    render.clear(0, 0, width, height);
    render.save();

    if (menu.state === 'corrida') {

        jogadorParam.update(cameraParam, estrada, diretorParam);

        bg.update(jogadorParam, cameraParam, estrada, diretorParam);
        diretorParam.update(jogadorParam)
        bg.render(render, cameraParam, jogadorParam, estrada.width);
        estrada.render(render, cameraParam, jogadorParam);
        jogadorParam.render(render, cameraParam, estrada.width, diretorParam);
        diretorParam.render(render, jogadorParam);    
        
        
        render.restore();
    }

    if (menu.state === 'titulo') {

        const {selecionarOpcoes} = menu;

        const horaAgora = window.performance.now();
        const decorrido = (horaAgora - diretorParam.realTempo) / 1000;

        diretorParam.realTempo = horaAgora;
        diretorParam.tempoDesdeUltimaTrocaQuadro += decorrido;

        // if(menu.atualizarTempoAnimacoes) menu.animacoes.forEach((item) => item.update());

        menu.update(jogadorParam, estrada, diretorParam);  

        // if(diretorParam.tempoDesdeUltimaTrocaQuadro > menu.atualizarTempo) {

        //     menu.update(jogadorParam, estrada, diretorParam);  
        //     diretorParam.tempoDesdeUltimaTrocaQuadro = 0;
        // }

        menu.render(render);

        const { tamanhoPista } = pistas[selecionarOpcoes[0]];
        
        const qualiPos = Number(selecionarOpcoes[1]) + 1;
        cameraParam.cursor = posicaoInicial(tamanhoPista, qualiPos);
        jogadorParam.x = qualiPos % 2 ? -1 : 1;
        
    }

    requestAnimationFrame(() => loop(render, cameraParam, jogadorParam, estrada, bg, diretorParam, menu, width, height));
}

const init = () => {

    const { width, height } = canvas;
    const render = new Render(canvas.getContext('2d'))
    const camera = new Camera();
    // console.log(camera);
    const diretor = new Diretor()
    const jogador = new Jogador();
    const estrada = new Estrada()
    const teladeFundo = new TelaDeFundo
    const menu = new Menu(width, height)
    
    // const imagem = recurso.get('skyClear')

    // menu.iniciarCorrida(estrada, diretor);

    teladeFundo.create();

    

    loop(render, camera, jogador, estrada, teladeFundo, diretor, menu, width, height)
}

recurso
    .add('skyClear', './img/tela_fundo/skyClear.png')
    .add('skyDark', './img/tela_fundo/skyDark.png')
    .add('hill', './img/tela_fundo/hill.png')
    .add('tree', './img/tela_fundo/tree.png')
    .add('arrowKeys', './img/outro/arrowKeys.png')
    .add('enterKey', './img/outro/enterKey.png')
    .add('startLights', './img/outro/startLights.png')
    .add('startLightsBar', './img/outro/startLightsBar.png')
    .add('leftSignal', './img/outro/leftSignal.png')
    .add('rightSignal', './img/outro/rightSignal.png')
    .add('opponents', './img/outro/opponents.png')
    .add('playerLeft', './img/jogador/playerLeft.png')
    .add('playerRight', './img/jogador/playerRight.png')
    .load(() => requestAnimationFrame(() => init()));