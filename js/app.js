import { canvas, recurso, pistas } from "./util.js";
import Render from './render.js'
import Diretor from "./diretor.js";
import Estrada from "./estrada.js";
import Menu from './menu.js'

window.onload = () => {

    const containerCanvas = document.querySelector('.container')

    containerCanvas.height = Math.min(window.innerHeight, (0.5625 * window.innerWidth));

}

const loop = (render, estrada, diretor, menu, width, height) => {

    const diretorParam = diretor;

    render.clear(0, 0, width, height);
    render.save();
   

    if (menu.state === 'corrida') {

        // estrada.drawRoad(ctx, width, pistas)
        estrada.render(render);
        diretorParam.render(render);
        render.restore();
        menu.update(estrada, diretorParam);
        // menu.render(render)
    }
    // render(render) {}
    // const { tamanhoPista } = pistas[pistaNome];

    requestAnimationFrame(() => loop(render, estrada, diretorParam, menu, width, height));
}

const init = () => {

    const { width, height } = canvas;
    const render = new Render(canvas.getContext('2d'))

    const diretor = new Diretor()
    const estrada = new Estrada()
    const menu = new Menu(width, height)
    // const imagem = recurso.get('skyClear')
    loop(render, estrada, diretor, menu, width, height)
}

recurso
    .add('skyClear', './img/tela_fundo/skyClear.png')
    .add('hill', './img/tela_fundo/hill.png')
    .load(() => requestAnimationFrame(() => init()));