

class SegmentoLinha {

    escala = 0;
    index = 0;
    curva = 0;
    guia = 0;
    /**
    * @type {Tunel}
    */
    tunel;

    /**
    * @type {Sprite[]}
    */
    sprites = [];
    clip = 0;
    #cores = { estrada: '', grama: '', guia: '', faixa: '', tunel: ''};
    pontos = new class {

        mundo = new class {

            x = 0;
            y = 0;
            z = 0;
            w = 0;
        };

        tela = new class {

            xNaoArredondado = 0;
            yNaoArredondado = 0;
            wNaoArredondado = 0;
            x = 0;
            y = 0;
            w = 0;
        }
    };

    get cores() {

        return this.#cores;
    }

    set cores(cores) {

        this.#cores = cores;
    }

    /**
    * 
    * @param {Camera} camera 
    */

    projetar(camera) {

        const {mundo, tela} = this.pontos;
        const meioTela = camera.tela.meioTela;

        camera.deltaZ = mundo.z - camera.z;

        const escala = this.escala = camera.distanciaDoPlanoProjetor / camera.deltaZ;

        tela.xNaoArredondado = (1 + (mundo.x - camera.x) * escala) * meioTela.x;
        tela.yNaoArredondado = (1 + (mundo.y - camera.y) * escala) * meioTela.y;
        tela.wNaoArredondado = mundo.w  * escala * camera.tela.width;
        tela.x = Math.round(tela.xNaoArredondado);
        tela.y = Math.round(tela.yNaoArredondado);
        tela.w = Math.round(tela.wNaoArredondado);
        

    }
   
}

export default SegmentoLinha;