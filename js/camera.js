import { canvas, theta } from "./util.js";


class Camera {
    
    x = 0;
    y = 1500;
    z = 0;
    h = this.y;
    cursor = 0;
    deltaZ = 0;

    #distanciaDoPlanoProjetor = 1 / Math.tan(theta);

    get distanciaDoPlanoProjetor() {
        return this.#distanciaDoPlanoProjetor;
      }

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
        }(this);

        get width() {

            return canvas.width;
        }
        
        get height() {

            return canvas.height;
        }
    }

    /**
     * @param { Estrada } estrada
     */

    update(estrada, diretor) {

        const length = estrada.length

        if (this.cursor >= length) {

            diretor.volta += 1;

            if (diretor.temposTotaisVolta.length >= 2) {

                const ultimaVolta = diretor.temposTotaisVolta[diretor.volta - 1];

                diretor.ultimaVolta.push(ultimaVolta);
                
            }

            this.cursor -= length;
            
        } else if (this.cursor <= 0) {
            
            this.cursor += length;
        }
    }
}

export default Camera;