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

    render.clear(0, 0, width, height);
    render.save();

    if (menu.state === 'corrida') {

        bg.update(cameraParam, estrada, diretorParam);
        bg.render(render, cameraParam, estrada.width);
        estrada.render(render, cameraParam);
        diretorParam.render(render);    
        
        
        render.restore();
    }

    requestAnimationFrame(() => loop(render, camera, estrada, bg, diretorParam, menu, width, height));
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
    menu.iniciarCorrida(estrada, diretor);
    // const imagem = recurso.get('skyClear')

    teladeFundo.create();

    loop(render, camera, estrada, teladeFundo, diretor, menu, width, height)
}

recurso
    .add('skyClear', './img/tela_fundo/skyClear.png')
    .add('hill', './img/tela_fundo/hill.png')
    .load(() => requestAnimationFrame(() => init()));