

class Menu {

    constructor() {

        this.state = '1';
    }

    iniciarCorrida(estrada, diretor) {

        const estradaParam = estrada;


        diretor.create(estrada, this.selecionarOpcao[0]);
    }

    update(estrada, diretor) {

        if (state === '1') {
            
            this.state = 'corrida'
        }
    }
}

export default Menu;