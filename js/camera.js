import { canvas, theta } from "./util.js";


class Camera {
    
    // Propriedades da câmera
    x = 0;
    y = 1500;
    z = 0;
    h = this.y;
    cursor = 0;
    deltaZ = 0;

    // Propriedade privada que armazena a distância do plano do projetor (cálculo do ângulo de visão)
    #distanciaDoPlanoProjetor = 1 / Math.tan(theta);

    // Método getter que retorna a distância do plano do projetor
    get distanciaDoPlanoProjetor() {
        return this.#distanciaDoPlanoProjetor;
      }

    // Propriedade "tela" que contém informações sobre a tela de exibição
    tela = new class {

        // Propriedade "meioTela" que contém informações sobre a posição do meio da tela
        meioTela = new class {
            #tela;
            constructor(tela) {
                this.#tela = tela;
            }

            // Método getter que retorna a coordenada X do meio da tela
            get x() {

                return this.#tela.width * 0.5;
            }

            // Método getter que retorna a coordenada Y do meio da tela
            get y() {

                return this.#tela.height * 0.5;
            }
        }(this);

        // Método getter que retorna a largura da tela
        get width() {

            return canvas.width;
        }
        
        // Método getter que retorna a altura da tela
        get height() {

            return canvas.height;
        }
    }

    /**
     * Método update para atualizar a câmera com base na estrada e no diretor do jogo
     * @param { Estrada } estrada
     */

    update(estrada, diretor) {

        // Obtém o comprimento total da estrada
        const length = estrada.length

        // Verifica se a posição da câmera é maior ou igual ao comprimento da estrada
        if (this.cursor >= length) {


            diretor.temposTotaisVolta.push(diretor.animaTempo);
            
            diretor.animaTempo = 0;

            // Incrementa o contador de voltas do diretor
            diretor.volta += 1;

            // Verifica se existem tempos registrados para voltas completadas
            if (diretor.temposTotaisVolta.length >= 2) {

                // Obtém o tempo da última volta e o adiciona à lista de últimas voltas completadas
                const ultimaVolta = diretor.temposTotaisVolta[diretor.volta - 1];

                diretor.ultimaVolta.push(ultimaVolta);
                
            }

            // Reseta a posição da câmera para continuar na estrada
            this.cursor -= length;
            
        } else if (this.cursor <= 0) {
            
            // Verifica se a posição da câmera é menor ou igual a zero
            // Se sim, ajusta a posição para que a câmera continue na estrada
            this.cursor += length;
        }
    }
}

// Exporta a classe Camera para uso em outros módulos
export default Camera;