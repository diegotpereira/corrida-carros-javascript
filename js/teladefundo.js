import Diretor from "./diretor.js";
import Sprite from "./sprite.js";
import { recurso } from "./util.js";

class TelaDeFundo {

    constructor() {

        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.camada1Velocidade = 0.001;
        this.camada2Velocidade = 0.002;
        this.camada3Velocidade = 0.003;
        this.camada1Offset = 0;
        this.camada2Offset = 0;
        this.camada3Offset = 0;
        this.camada1 = new Sprite();
        this.camada2 = new Sprite();
        this.camada3 = new Sprite();
        this.jogador = 1;
        this.pausado = false;
    }
    create() {

        this.camada1.imagem = recurso.get('skyClear');
        this.camada2.imagem = recurso.get('hill');
        this.camada3.imagem = recurso.get('tree');

        this.camada1.nome = 'bgSky';
        this.camada2.nome = 'bgHill';
        this.camada3.nome = 'bgTree';
    }



    update(jogador, camera, estrada) {

        const diretor = new Diretor();

        if (diretor.pausado) {
            
            const aumentar = (iniciar, incrementar, max) => {

                let resultado = iniciar + incrementar;

                while(resultado >= max) {

                    resultado -= max;
                }

                while (resultado < 0 ) {
                    
                    resultado += max;
                }

                return resultado;
            }

            const segmento = estrada.getSegmento(camera.cursor);
            const velocidadePercentual = jogador.correnteEnergia / jogador.maxVelocidade;

            this.camada1Offset = aumentar(

                this.camada1Offset, this.camada1Velocidade * segmento.curva * velocidadePercentual * -1, 2,
            );
            this.camada2Offset = aumentar(

                this.camada2Offset, this.camada2Velocidade * segmento.curva * velocidadePercentual * -1, 2,
            );

            this.camada3Offset = aumentar(

                this.camada3Offset, this.camada3Velocidade * segmento.curva * velocidadePercentual * -1, 2
            )
        }

    }

     /**
     *
     * @param {Render} render
     * @param {Camera} camera
     * @param {Number} estradaLargura
     */

    render(render, camera, jogador, estradaLargura) {

        const clip = 0;
        const escala = 1 / camera.h;
        const arrayCamadas = ['camada1', 'camada2', 'camada3'];

        arrayCamadas.forEach((item) => {

            this[item].escalaX = 9;
            this[item].escalaY = 9;
            

            const posicaoW = camera.tela.meioTela.x * 2 * this[`${item}Offset`];
            // const posicaoW = isNaN(this[`${item}Offset`]) ? 0 : camera.tela.meioTela.x * 2 * this[`${item}Offset`];
            const corretaLargura = jogador.width / 64;
            
            // render.drawSprite(
            //     this[item], camera, jogador, estradaLargura, escala * 0.05 * corretaLargura,
            //     posicaoW, this[item].height, clip);

            if (Math.abs(this[`${item}Offset`]) > 1) {
                
                render.drawSprite(
                    this[item], camera ,jogador, estradaLargura,
                    escala * 0.05 * corretaLargura, posicaoW - this[item].width, this[item].height, clip
                )
            }
        })
    }
}

export default TelaDeFundo;