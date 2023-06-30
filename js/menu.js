import { handleInput, pistas } from "./util.js";

class Menu {

    constructor(width, height) {

        this.exibirMenu = 0;

        this.height = height;
        this.width = width;
        this.estado = 'titulo';
        this.menuX = 5;
        this.menuY = 0;

        this.menuFrase = {

            0: 'Circuito: ',
            1: 'Oponentes: ',
            2: 'Dificuldade: ',
            3: 'Música: ',
            4: 'Volume da música: ',
            5: 'Iniciar '
        }

        this.menu = {

            0: Object.keys(pistas),
            1: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19'],
            2: ['novato', 'corredor', 'campeão'],
            3: ['não', 'sim'],
            4: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            5: ['corrida'],
        }

        this.selecionarOpcao = {

            0: 'teste',
            1: '19',
            2: 'novato',
            3: 'não',
            4: '1',
            5: 'corrida'
        }

        this.menuTitulo = {pos: 0, direcao: 1}
    }

    iniciarCorrida(estrada) {

        const estradaParam = estrada;

        // estradaParam.pistaNome = this.selecionarOpcao[0];

        estradaParam.create();
    }

    update(estrada) {

        if (handleInput.mapPress.enter && !this.exibirMenu) {
            
            this.exibirMenu = 1;
            this.menuTitulo.pos = 0;
        }

        if (this.exibirMenu) {

            const ultimaOpcaoMenu = Object.keys(this.menu).length - 1;

            if (this.menuX !== ultimaOpcaoMenu) {
                
                this.selecionarOpcao[this.menuX] = this.menu[this.menuX][this.menuY];
                handleInput.mapPress.enter = false;
            }
            

            if (handleInput.mapPress.enter && this.menuX === ultimaOpcaoMenu) {

                // const fps = document.querySelector('#fps');
                
                this.iniciarCorrida(estrada);
                this.estado = 'corrida';
                handleInput.mapPress.enter = false;
                // fps.firstElementChild.classList.remove('hidden');
                
            }
        }
    }

    render(render) {

        render.desenharTexto('#EB4844', 'Corrida de Carros em JS', 320, 30, 4, 'OutriderCondBold');

        if (!this.exibirMenu) {
            
            
            if (window.navigator.maxTouchPoints) {
                
                render.desenharTexto('black', 'Aperte ok para iniciar', 320, 180 + this.menuTitulo.pos);
            } else {

                render.desenharTexto('black', 'Aperte Enter para iniciar', 320, 180 + this.menuTitulo.pos);
            }
        }

        if (this.exibirMenu) {

            if(this.menuTitulo.pos >= 4) this.menuTitulo.direcao = -1;
            if(this.menuTitulo.pos <= -4) this.menuTitulo.direcao = 1;

            this.menuTitulo.pos += (this.menuTitulo.direcao / 2);
            
            const maxX = Object.keys(this.menu).length - 1;
            const menuBaixo = this.menuX - 1 >= 0  ? this.menuX - 1 : maxX;
            const menuAlto = this.menuX + 1 <= maxX ? this.menuX + 1 : 0;

            const textoBaixo = `${this.menuFrase[menuBaixo]} ${this.selecionarOpcao[menuBaixo].toLocaleUpperCase()}`;
            const textoAlto = `${this.menuFrase[menuAlto]} ${this.selecionarOpcao[menuAlto].toLocaleUpperCase()}`;

            render.roundRect('#2C69EB', 100, 100, 440, 170, 20, true, false)
            render.desenharTexto('#FFFAF4', textoBaixo, 320, 180 - 45, 1.6);


            const frase = `${this.menuFrase[this.menuX]} ${this.menu[this.menuX][this.menuY].toLocaleUpperCase()}`;
            render.desenharTexto('#050B1A', frase, 320, 180 + (this.menuTitulo.pos / 4), 1.6);
            render.desenharTexto('#FFFAF4', textoAlto, 320, 180 + 45, 1.6);

            if (window.navigator.maxTouchPoints) {
                

            }
        }

    }

}

export default Menu;