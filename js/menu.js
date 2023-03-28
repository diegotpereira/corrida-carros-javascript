class Menu {

    constructor(width, height) {

        this.height = height;
        this.width = width;
        this.state = 'corrida';
    }

    iniciarCorrida(estrada) {

        const estradaParam = estrada;

        estradaParam.pistaNome = 'brasil'
        estradaParam.create()
    }

    update(estrada, diretor) {


        this.iniciarCorrida(estrada, diretor);
    }
}

export default Menu;