import HandleInput from "./handleInput.js"
import Recurso from "./recurso.js"

// Seleciona o elemento HTML com o ID "canvas_principal" e armazena na variável canvas
const canvas = document.querySelector('#canvas_principal')

// Define o campo de visão do jogo em graus (120°) e converte para radianos
const campoVisao = (120 / 180) * Math.PI;
const theta = campoVisao * 0.5;

// Cria uma instância da classe HandleInput
const handleInput = new HandleInput();

// Cria uma instância da classe Recurso
const recurso = new Recurso()

// Função para calcular a posição inicial da pista com base no tamanho da pista e na posição
const posicaoInicial = (tamanhoPista, posicao) => (tamanhoPista - (posicao * 16)) * 200;

// Objeto contendo informações sobre a pista de teste
const pistas = {

    teste: {
        pistaNome: 'teste', 
        tamanhoPista: 8736,
        voltas: 69,
        cores: {
            estradaClara: '#424142',
            estradaEscura: '#393839',
            gramaClara: '#008800',
            gramaEscura: '#006600',
            guiaClara: '#ffffff',
            guiaEscura: '#ff0000'
        },

        // Array de objetos representando as curvas da pista de teste
        curvas: [

            {
            min: 50, max: 174, inclinacaoCurva: 1, guia: 0,
            },
            {
            min: 373, max: 510, inclinacaoCurva: -4, guia: 1,
            },
            {
            min: 560, max: 995, inclinacaoCurva: 4, guia: 1,
            },
            {
            min: 1244, max: 1368, inclinacaoCurva: 1, guia: 0,
            },
            {
            min: 1629, max: 1716, inclinacaoCurva: 4, guia: 1,
            },
            {
            min: 1816, max: 1927, inclinacaoCurva: -4, guia: 1,
            },
            {
            min: 2114, max: 2164, inclinacaoCurva: -2, guia: 1,
            },
            {
            min: 2214, max: 2438, inclinacaoCurva: 3, guia: 0,
            },
            {
            min: 2686, max: 2886, inclinacaoCurva: -4, guia: 1,
            },
            {
            min: 2961, max: 3110, inclinacaoCurva: 3, guia: 1,
            },
            {
            min: 3110, max: 3310, inclinacaoCurva: 3, guia: 0,
            },
            {
            min: 3545, max: 3968, inclinacaoCurva: 0.5, guia: 0,
            },
            {
            min: 4180, max: 4328, inclinacaoCurva: 5, guia: 1,
            },
            {
            min: 4428, max: 4577, inclinacaoCurva: -5, guia: 1,
            },
            {
            min: 4975, max: 5286, inclinacaoCurva: -1, guia: 0,
            },
            {
            min: 5597, max: 6007, inclinacaoCurva: 5, guia: 1,
            },
            {
            min: 6119, max: 6306, inclinacaoCurva: -2, guia: 1,
            },
            {
            min: 6654, max: 6765, inclinacaoCurva: 2, guia: 1,
            },
            {
            min: 6827, max: 6926, inclinacaoCurva: -2, guia: 1,
            },
            {
            min: 6950, max: 7075, inclinacaoCurva: 2, guia: 1,
            },
            {
            min: 7761, max: 7923, inclinacaoCurva: 6, guia: 1,
            },
            {
            min: 7947, max: 8109, inclinacaoCurva: -6, guia: 1,
            }
        ]
    }
}

// Função para formatar o tempo em milissegundos para uma string no formato de tempo
const formatarHora = (dt) => {

    // Arredonda o tempo total para o número inteiro mais próximo
    const hora = Math.round(dt);

    // Calcula a quantidade de minutos
    const minutos = Math.floor(hora / 60000);

    // Calcula a quantidade de segundos
    const segundos = Math.floor(hora / 1000) - (minutos * 60);

    // Extrai os últimos 3 dígitos para obter os decimos de segundo
    const decimos = hora.toString().slice(-3);

    // Retorna a string formatada no formato 'minutos:segundos.decimos'
    return `${minutos}:${(segundos < 10 ? '0' : '')}${segundos}.${hora < 100 ? '000' : decimos}`;
}

// Exporta as variáveis e a função para serem utilizadas em outros módulos
export {

    handleInput,
    recurso, 
    canvas,
    theta,
    posicaoInicial,
    pistas,
    formatarHora
}