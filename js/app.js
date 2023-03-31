import { canvas, recurso, pistas } from "./util.js";
import Render from './render.js'
import Diretor from "./diretor.js";
import Estrada from "./estrada.js";
import Menu from './menu.js'
import Camera from "./camera.js";
import TelaDeFundo from "./teladefundo.js";

window.onload = () => {

    const containerCanvas = document.querySelector('.container')

    containerCanvas.height = Math.min(window.innerHeight, (0.5625 * window.innerWidth));

}

/**
 *
 * @param {Render} render
 * @param {Camera} camera
 * @param {Estrada} estrada
 * @param {Number} width
 * @param {Number} height
 */

const loop = (render, camera, estrada, bg, diretor, menu, width, height) => {

    const diretorParam = diretor;
    const cameraParam = camera;

    console.log(estrada);

    render.clear(0, 0, width, height);
    render.save();

    if (menu.state === 'corrida') {

        bg.update(cameraParam, estrada, diretorParam);
        bg.render(render, cameraParam, estrada.width);
        estrada.render(render, cameraParam);
        diretorParam.render(render);    
        
        
        render.restore();
    }

    requestAnimationFrame(() => loop(render, cameraParam, estrada, bg, diretorParam, menu, width, height));
}

const init = () => {

    const { width, height } = canvas;
    const render = new Render(canvas.getContext('2d'))
    const camera = new Camera();
    // console.log(camera);
    const diretor = new Diretor()
    const estrada = new Estrada()
    const teladeFundo = new TelaDeFundo
    const menu = new Menu(width, height)
    
    // const imagem = recurso.get('skyClear')

    menu.iniciarCorrida(estrada, diretor);

    // teladeFundo.create();

    

    loop(render, camera, estrada, teladeFundo, diretor, menu, width, height)
}

recurso
    .add('skyClear', './img/tela_fundo/skyClear.png')
    .add('skyDark', './img/tela_fundo/skyDark.png')
    .add('hill', './img/tela_fundo/hill.png')
    .add('tree', './img/tela_fundo/tree.png')
    .add('arrowKeys', './img/outro/arrowKeys.png')
    .add('enterKey', './img/outro/enterKey.png')
    .add('billboardSega', './img/outro/billboard04.png')
    .add('startLights', './img/outro/startLights.png')
    .add('startLightsBar', './img/outro/startLightsBar.png')
    .add('leftSignal', './img/outro/leftSignal.png')
    .add('rightSignal', './img/outro/rightSignal.png')
    .add('opponents', './img/outro/opponents.png')
    .add('playerLeft', './img/jogador/playerLeft.png')
    .add('playerRight', './img/jogador/playerRight.png')
    .load(() => requestAnimationFrame(() => init()));