class Menu {

    constructor(width, height) {

        this.height = height;
        this.width = width;
        this.state = 'corrida';
    }

    iniciarCorrida(estrada, diretor) {

        const estradaParam = estrada;

        let pistaNome = ''

        estradaParam.pistaNome = 'brasil'
        estradaParam.create()
        diretor.create(estrada, pistaNome)
    }

    update(estrada, diretor) {


        this.iniciarCorrida(estrada, diretor);
    }

    
}

export default Menu;