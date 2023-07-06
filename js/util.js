import HandleInput from "./handleInput.js"
import Recurso from "./recurso.js"

const canvas = document.querySelector('#canvas_principal')

const campoVisao = (120 / 180) * Math.PI;
const theta = campoVisao * 0.5;
const handleInput = new HandleInput();
const recurso = new Recurso()

const posicaoInicial = (tamanhoPista, posicao) => (tamanhoPista - (posicao * 16)) * 200;

const pistas = {

    teste: {
        pistaNome: 'teste', 
        tamanhoPista: 6656,
        voltas: 78,
        cores: {
            estradaClara: '#424142',
            estradaEscura: '#393839',
            gramaClara: '#008800',
            gramaEscura: '#006600',
            guiaClara: '#ffffff',
            guiaEscura: '#ff0000'
        }
    }
}

// const cores = {
//     faixa: '#ffffff', // cor das faixas
//     grama: '#008800', // cor da grama
//     guia: '#ffffff', // cor das guias
//     estrada: '#424142', // cor da estrada
//   };
  

export {

    recurso, 
    canvas,
    pistas,
    handleInput,
    theta,
    posicaoInicial
}