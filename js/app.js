import { canvas, pistas, recurso } from "./util.js";
import Render from './render.js'
import Diretor from "./diretor.js";
import Estrada from "./estrada.js";

window.onload = () => {

    const containerCanvas = document.querySelector('.container')

    containerCanvas.height = Math.min(window.innerHeight, (0.5625 * window.innerWidth));

}

const loop = (render, estrada, diretor, width, height, imagem) => {

    const diretorParam = diretor;

    render.clear(0, 0, width, height);
    render.save();
    render.drawImage(imagem, 0, 0, width, height);
    render.restore();

    estrada.render(render);

    const { tamanhoPista } = pistas['brasil']


    requestAnimationFrame(() => loop(render, estrada, diretorParam, width, height, imagem));
}

const init = () => {

    const { width, height } = canvas;
    const render = new Render(canvas.getContext('2d'))

    const diretor = new Diretor()
    const estrada = new Estrada()

    let pistaNome = "Brasil";

    diretor.create(estrada, pistaNome);

    const imagem = recurso.get('skyClear')
    loop(render, width, height, imagem)
}

recurso
    .add('skyClear', './img/tela_fundo/skyClear.png')
    .add('hill', './img/tela_fundo/hill.png')
    .load(() => requestAnimationFrame(() => init()));