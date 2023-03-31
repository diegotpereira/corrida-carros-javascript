class Menu {

    constructor(width, height) {

        this.height = height;
        this.width = width;
        this.state = 'corrida';

        this.selecionarOpcoes = {
            0: 'brasil'
        };
    }

    iniciarCorrida(estrada, diretor) {

        const estradaParam = estrada;
        const zero = 0;

        estradaParam.pistaNome = this.selecionarOpcoes[zero];
        estradaParam.create()
        diretor.create(estrada, this.selecionarOpcoes[0]);
    }

    

    update(estrada, diretor) {

        


        this.iniciarCorrida(estrada, diretor);
    }    

    
}

export default Menu;