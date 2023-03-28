import Recursos from "./recursos.js"

const canvas = document.getElementById('canvas_principal')

const recurso = new Recursos()

const pistas = {

    'brasil': {

        tamanhoPista: 8632
    }
}

export {

    recurso, canvas, pistas
}