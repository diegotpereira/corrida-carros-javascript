
<<<<<<< HEAD

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
=======
import { pistas, lidarComEntrada, recurso} from "./util.js";
import Sprite from "./sprite.js";

class Menu {

    constructor(width, height) {

        this.exibirMenu = 0;

        this.height = height;
        this.width = width;
        this.state = 'titulo';
        this.menuY = 0;
        this.menuX = 5;


        this.menuFrase = {

            0: 'Circuito: ',
            1: 'Oponentes:',
            2: 'Dificuldade:',
            3: 'Música:',
            4: 'Volume da música:',
            5: 'Iniciar'
        }

        this.menu = {
            0: Object.keys(pistas),
            1: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19'],
            2: ['novato', 'corredor', 'campeão'],
            3: ['não', 'sim'],
            4: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            5: ['corrida']
        };

        this.selecionarOpcoes = {
            0: 'canada',
            1: '19',
            2: 'novato',
            3: 'não',
            4: '1',
            5: 'corrida'
        };

        this.setaParaCimaPiscar = 0;
        this.setaParaBaixoPiscar = 0;

        this.menuTitulo = { pos: 0, direcao: 1};
    }

    iniciarCorrida(jogador, estrada, diretor) {

        const estradaParam = estrada;
        const zero = 0;

        estradaParam.pistaNome = this.selecionarOpcoes[zero];
        estradaParam.create();
        jogador.create(this, pistas[this.selecionarOpcoes[zero]].tamanhoPista);
        diretor.create(estrada, this.selecionarOpcoes[0]);
    }

    

    update(jogador, estrada, diretor) {

        const { arrowup, arrowdown, arrowleft, arrowright } = lidarComEntrada.map;
        const maxX = Object.keys(this.menu).length - 1;
        const maxY = this.menu[this.menuX].length - 1;


        if (lidarComEntrada.mapPress.enter && !this.exibirMenu) {
            
            this.selecionarOpcoes[3] = 'sim';
            this.exibirMenu = 1;
            this.menuTitulo.pos = 0;
            lidarComEntrada.mapPress.enter = false;
        }

        if(this.exibirMenu) {

            if(!arrowdown) this.setaParaBaixoPiscar = false;
            if(!arrowup) this.setaParaCimaPiscar = false;

            if (this.menuX < maxX && arrowdown) {
                
                this.setaParaBaixoPiscar =  !this.setaParaBaixoPiscar;
                this.menuX += 1;
                this.menuY= this.menu[this.menuX].findIndex((item) => item === this.selecionarOpcoes[this.menuX]);

            } else if (this.menuX === maxX && arrowdown) {
                
                this.setaParaBaixoPiscar = 1;
                this.menuX = 0;
                this.menuY = this.menu[this.menuX].findIndex((item) => item === this.selecionarOpcoes[this.menuX]);
            }

            if (this.menuX > 0 && arrowup) {
                
                this.setaParaCimaPiscar = 1;
                this.menuX -= 1;
                this.menuY = this.menu[this.menuX].findIndex((item) => item === this.selecionarOpcoes[this.menuX]);

            } else if (this.menuX === 0 && arrowup) {
                
                this.setaParaCimaPiscar = 1;
                this.menuX = maxX;
                this.menuY = this.menu[this.menuX].findIndex((item) => item === this.selecionarOpcoes[this.menuX]);
            }

            if(this.menuY < maxY && arrowright) this.menuY += 1;
            else if(this.menuY === maxY && arrowright) this.menuY = 0;

            if(this.menuY > 0 && arrowleft) this.menuY -= 1;
            else if(this.menuY === 0 && arrowleft) this.menuY = maxY;

            const ultimaOpcaoDeMenu = Object.keys(this.menu).length - 1;

            if (this.menuX !== ultimaOpcaoDeMenu) {
                
                this.selecionarOpcoes[this.menuX] = this.menu[this.menuX][this.menuY];
                lidarComEntrada.mapPress.enter = false;
            }

            if (lidarComEntrada.mapPress.enter && this.menuX === ultimaOpcaoDeMenu) {

                const pausaBtn = document.querySelector('#pausarBtn');
                const fps = document.querySelector('#fps');
                const mute = document.querySelector('#mutar');

                pausaBtn.classList.toggle('hidden');
                mute.classList.toggle('hidden');

                const okBtn = document.querySelector('.controleDireito').firstElementChild;

                okBtn.classList.toggle('hidden');

                this.iniciarCorrida(jogador, estrada, diretor);
                this.state = 'corrida';
                
                lidarComEntrada.mapPress.enter = false;

                // fps.firstElementChild.classList.remove('hidden');
            }

            
        }
    }    

    render(render) {
        
        // this.animacoes.forEach((item) => item.render(render));

        render.drawText('#EB4844', 'Corrida de Carros', 320, 30, 4, 'OutriderCondBold');

        if (!this.exibirMenu) {

            if(this.menuTitulo.pos >= 12) this.menuTitulo.direcao = -1;
            if(this.menuTitulo.pos <= -12) this.menuTitulo.direcao = 1;

            this.menuTitulo.pos += (this.menuTitulo.direcao / 2);
            
            if (window.navigator.maxTouchPoints) {
                
                render.drawText('black', 'Aperte OK para iniciar', 320, 180 + this.menuTitulo.pos);

            } else {

                render.drawText('black', 'Aperte Enter para iniciar', 320, 180 + this.menuTitulo.pos);
            }
        }

        if (this.exibirMenu) {
            
            if(this.menuTitulo.pos >= 4) this.menuTitulo.direcao = -1;
            if(this.menuTitulo.pos <= -4) this.menuTitulo.direcao = 1;

            this.menuTitulo.pos += (this.menuTitulo.direcao / 2);

            const maxX = Object.keys(this.menu).length - 1;
            const menuBaixo = this.menuX - 1 >= 0 ? this.menuX - 1 : maxX;
            const menuAlto = this.menuX + 1 <= maxX ? this.menuX + 1 : 0;
            const baixoTexto = `${this.menuFrase[menuBaixo]} ${this.selecionarOpcoes[menuBaixo].toLocaleUpperCase()}`;
            const altoTexto = `${this.menuFrase[menuAlto]} ${this.selecionarOpcoes[menuAlto].toLocaleUpperCase()}`;

            // render.roundRect('#2C69EB', 100, 100, 440, 170, 20, true, false);
            render.drawText('#FFFAF4', baixoTexto, 320, 180 - 45, 1.6);

            const frase = `${this.menuFrase[this.menuX]} ${this.menu[this.menuX][this.menuY].toLocaleUpperCase()}`;

            render.drawText('#050B1A', frase, 320, 180 + (this.menuTitulo.pos / 4), 1.6);
            render.drawText('#FFFAF4', altoTexto, 320, 180 + 45, 1.6);

            if (window.navigator.maxTouchPoints) {

                Menu.drawButtons(render, 145, 310, 15, 'U');
                Menu.drawButtons(render, 185, 310, 15, 'D');
                Menu.drawButtons(render, 225, 310, 15, 'L');
                Menu.drawButtons(render, 265, 310, 15, 'R');

                render.drawText('black', 'Navegar', 150, 345, 1.3, 'OutriderCond', 'left');

                Menu.drawButtons(render, 418, 310, 18, 'OK');

                render.drawText('black', 'Confirmar', 490, 345, 1.3, 'OutriderCond', 'right');

            } else {

                const teclasDeSeta = new Sprite();

                teclasDeSeta.imagem = recurso.get('arrowKeys');
                teclasDeSeta.nome = 'mnArrowKeys';

                const teclaEnter = new Sprite();

                teclaEnter.imagem = recurso.get('enterKey');
                teclaEnter.nome = 'mnEnterKey';

                render.drawText('black', 'Navegar', 590, 320, 1.3, 'OutriderCond', 'right');

                render.ctx.drawImage(teclasDeSeta.imagem, 595, 310, 28, 18);

                render.drawText('black', 'Confirmar', 590, 345, 1.3, 'OutriderCond', 'right');

                render.ctx.drawImage(teclaEnter.imagem, 597, 335, 23, 18);
            }

            if (this.setaParaCimaPiscar) {
                
                render.drawText('#050B1A', 'c', 520, 140, 2, 'Arrows');

            } else {

                render.drawText('#FFFAF4', 'c', 520, 140, 2, 'Arrows');
            }


            if (this.setaParaBaixoPiscar) {
                
                render.drawText('#050B1A', 'd', 520, 240, 2, 'Arrows');

            } else {

                render.drawText('#FFFAF4', 'd', 520, 240, 2, 'Arrows');
            }

>>>>>>> ffcbce6ed61c1bc8b0c00f82f00c380f531d921e
        }
    }
}

export default Menu;