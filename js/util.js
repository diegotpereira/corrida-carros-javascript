import Recurso from "./recurso.js"

const canvas = document.getElementById('canvas_principal')


var url = canvas.toDataURL();
console.log(url);

const recurso = new Recurso()

const pistas = {

    brasil: {

        
        pistaNome: 'Interlagos',
        tamanhoPista: 8632
    }
}

export {

    recurso, canvas, pistas
}