import { canvas, recurso, pistas } from "./util.js";
import Render from './render.js'
import Diretor from "./diretor.js";
import Estrada from "./estrada.js";
import Menu from './menu.js'
import Camera from "./camera.js";

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

const loop = (render, camera, estrada, diretor, menu, width, height) => {

    const diretorParam = diretor;
    const cameraParam = camera;

    render.clear(0, 0, width, height);
    render.save();

    if (menu.state === 'corrida') {

        estrada.render(render, cameraParam);
        diretorParam.render(render);        
    }

    

    

    // menu.update(estrada, diretorParam)
    
   

    // if (menu.state === 'corrida') {

    //     estrada.create()
    //     estrada.render(render, cameraParam);
    //     diretorParam.render(render);
        
    // }

    render.restore();

    // menu.update(estrada, diretorParam)

    requestAnimationFrame(() => loop(render, camera, estrada, diretorParam, menu, width, height));
}

const init = () => {

    const { width, height } = canvas;
    const render = new Render(canvas.getContext('2d'))
    const camera = new Camera();
    const diretor = new Diretor()
    const estrada = new Estrada()
    const menu = new Menu(width, height)
    menu.iniciarCorrida(estrada, diretor);
    // const imagem = recurso.get('skyClear')
    loop(render, camera, estrada, diretor, menu, width, height)
}

recurso
    .add('skyClear', './img/tela_fundo/skyClear.png')
    .add('hill', './img/tela_fundo/hill.png')
    .load(() => requestAnimationFrame(() => init()));