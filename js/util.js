import Recurso from "./recurso.js"

const canvas = document.getElementById('canvas_principal')


var url = canvas.toDataURL();
console.log(url);

const recurso = new Recurso()

const pistas = {

    brasil: {

        
        pistaNome: 'Interlagos',
        tamanhoPista: 8632,
        voltas: 71,
        cores: {

            estradaClara: '#424142',
            estradaEscura: '#393839',
            gramaClara: '#008800',
            gramaEscura: '#006600',
            guiaClara: '#ffffff',
            guiaEscura: '#ff0000',
            tunelClara: '#0000ff',
            tunelEscura: '#00008b'

        },
    }
}

export {

    recurso, canvas, pistas
}