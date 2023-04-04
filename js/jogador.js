import Sprite from './sprite.js';
import { pistas, posicaoInicial, recurso } from './util.js';

class Jogador {

    constructor() {

        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.sprite = new Sprite();
        this.posicaoPista = 0;
        this.nome = 'Jogador X';
        this.cursor = 0;
    }

    get width() {

        return this.sprite.width;
    }

    get height() {

        return this.sprite.height;
    }



    create(menu, tamanhoPista) {

        this.sprite.imagem = recurso.get('playerRight');
        this.sprite.nome = 'Jogador';
        this.sprite.spritesInx = 6;
        this.sprite.spritesIny = 2;
        this.sprite.sheetPositionY = 1;
        this.sprite.escalaX = 2.5;
        this.sprite.escalaY = 3;

        const qualiPos = Number(menu.selecionarOpcoes[1]) + 1;
        this.posicaoPista = posicaoInicial(tamanhoPista, qualiPos);
        // this.correnteEnergia = 0;
    }

    update(camera, estrada, diretor) {

        const cameraClass = camera;
        // const opoArrClass = opoArr
        
        if (diretor.correndo) {
            
            this.sprite.nome = 'Jogador';
        

            // corretor de falhas
            // const 

            // if(lidarComEntrada.isKeyDown('*')) {}

            // if (lidarComEntrada.isKeyDown('-')) {
                
            // }

            // const aceleracao = (velocidade, mult) => ((this.maxVelocidade + 300) / (velocidade + 300)) * mult * (1.5 - (velocidade / this.maxVelocidade));

            let segmento = estrada.getSegmento(camera.cursor);


            segmento = estrada.getSegmento(camera.cursor);
            
    
            const { tamanhoPista } = pistas[estrada.pistaNome];
            const posicaoAtual = this.posicaoPista / 200;
            const atualVolta = Math.floor(posicaoAtual / tamanhoPista);

            // if (this.volta < atualVolta) {
                
            //     this.horaCorrida.push(diretor.horaTotal);
            //     this.volta += 1;
            // }

            // if(this.correnteEnergia < 0) this.correnteEnergia = 0;
            this.cursor = camera.cursor;
            camera.update(estrada, diretor);
        }
    }

    /**
     *
     * @param {Render} render
     * @param {Camera} camera
     * @param {Number} estradaLargura
     */
        
    render(render, camera, estradaLargura) {

        const clip = 0;
        const escala = 1 / camera.h;

        render.drawSprite(

            this.sprite, camera, this, estradaLargura, escala,
            camera.tela.meioTela.x, camera.tela.height, clip,
            this.sprite.spritesEmX, this.sprite.spritesEmY
        );
    }

}

export default Jogador;