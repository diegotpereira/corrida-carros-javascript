import { canvas, teta } from "./util.js";

class Camera {

    x = 0;
    y = 1500;
    z = 0;
    h = this.y;
    cursor = 0;
    deltaZ = 0;

    #distanciaDoPlanoProjetor = 1 / Math.tan(teta);

    tela = new class {

        meioTela = new class {

            #tela;

            constructor(tela) {

                this.#tela = tela;
            }

            get x() {

                return this.#tela.width * 0.5;
            }

            get y() {

                return this.#tela.height * 0.5;
            }
        } (this);

        get width() {

            return canvas.width;
        }

        get height() {

            return canvas.height;
        }
    }

    get distanciaDoPlanoProjetor() {

        return this.#distanciaDoPlanoProjetor;
    }

    /**
    * 
    * @param {Estrada} estrada 
    */
    update(estrada, diretor) {

        const length = estrada.length;

        if (this.cursor >= length) {

            diretor.temposTotaisDeVolta.push(diretor.animTempo);
            diretor.animTempo = 0;
            diretor.volta += 1;

            if (diretor.temposTotaisDeVolta.length >= 2) {
                
                const ultimaVolta = diretor.temposTotaisDeVolta[diretor.volta - 1];
                diretor.voltaTempos.push(ultimaVolta);
            }
            
            this.cursor -= length;

        } else if(this.cursor <= 0) {

            this.cursor += length;
        }
   }
}

// console.log(Camera);

export default Camera;