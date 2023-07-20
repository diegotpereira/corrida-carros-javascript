import SegmentoLinha from "./segmentoLinha.js";
import { pistas } from "./util.js"

class Estrada {

    /**
    * @type {SegmentoLinha[]}
    */

    // Array para armazenar os segmentos da estrada
    #segmentos = [];

    // Comprimento do segmento da estrada
    #segmentoTamanho = 200;

    // Número de segmentos visíveis na tela
    visibilidadeSegmentos = 600;

    // Número de segmentos para alterar a cor do meio-fio
    #k = 13;

    // Largura da estrada
    #width = 2000;

    constructor(pistaNome) {

        this.pistaNome = pistaNome;
    }

    // Getter para o valor de k
    get k() {

        return this.#k;
    }

    // Getter para o comprimento do segmento da estrada
    get segmentoTamanho() {

        return this.#segmentoTamanho;
    }

    // Getter para o comprimento total da pista (em unidades de segmento)
    get segmentosTamanho() {

        return this.#segmentos.length
    }

    // Getter para o comprimento total da estrada
    get length() {

        return this.segmentosTamanho * this.segmentoTamanho
    }

    // Getter para a largura da estrada
    get width() {

        return this.#width;
    }


   /**
   *
   * @param {Number} cursor
   * @returns
   */

    // Método para obter o segmento da estrada com base na posição do cursor
    getSegmento(cursor) {

        return this.#segmentos[Math.floor(cursor / this.#segmentoTamanho) % this.segmentosTamanho]
    }

    // Método para obter o segmento da estrada com base no índice fornecido
    getSegmentoDoIndice(index) {

        return this.#segmentos[index % this.segmentosTamanho]
    }

    // Método para criar a pista de acordo com o nome da pista fornecido
    create() {

        this.#segmentos = [];
        const { k } = this;
        const { tamanhoPista, cores } = pistas[this.pistaNome];

        // Loop para criar cada segmento da estrada
        for (let i = 0; i < tamanhoPista; i += 1) {

            // Definir as cores para cada segmento com base no padrão de cores
            const coresMaisClaras = {
                estrada: cores.estradaClara,
                grama: cores.gramaClara,
                guia: cores.guiaClara,
                faixa: ''
            };

            const coresMaisEscuras = {

                estrada: cores.estradaClara,
                grama: cores.gramaEscura,
                guia: cores.guiaEscura,
                faixa: '#fff',

            };

            const coresClaras = {

                estrada: '#393839',
                grama: cores.gramaEscura,
                guia: cores.guiaClara,
                faixa: ''
            };

            const coresEscuras = {

                estrada: '#393839',
                grama: cores.gramaClara,
                guia: cores.guiaEscura,
                faixa: '#fff'
            }

            const segmentoLinha = new SegmentoLinha();
            segmentoLinha.index = i;

            if(Math.floor(i / k) % 4 === 0) segmentoLinha.cores = coresMaisClaras;
            if(Math.floor(i / k) % 4 === 1) segmentoLinha.cores = coresMaisEscuras;
            if(Math.floor(i / k) % 4 === 2) segmentoLinha.cores = coresClaras;
            if(Math.floor(i / k) % 4 === 3) segmentoLinha.cores = coresEscuras;

            if (i <= 11) {
                
                segmentoLinha.cores.estrada = '#fff';

                i % 4 === 0 || i % 4 === 1 ? segmentoLinha.cores.checkers = 'one' : segmentoLinha.cores.checkers = 'two';
            }


            const { mundo } = segmentoLinha.pontos;
            mundo.w = this.width;
            mundo.z = (i + 1) * this.segmentoTamanho;
            this.#segmentos.push(segmentoLinha);
            
        }
    }

    /**
     * @param {Render} render
     * @param {Camera} camera
     * @param {Jogador} jogador
     */

    // Função de renderização, recebe três parâmetros: render, camera e jogador.
    render(render, camera, jogador) {

        // // Cria uma constante chamada cameraClass que recebe o valor do parâmetro 'camera'.
        // const cameraClass = camera;
        
        // // Destruturação do objeto 'this', buscando o valor de segmentosTamanho.
        // const { segmentosTamanho } = this//8736;
        // // let cursor = 1683200;

        // // Obtém o segmento base com base no cursor da câmera.
        // const baseSegmento = this.getSegmento(camera.cursor);

        // // Obtém a posição inicial a partir do índice do segmento base.
        // const inicialPos = baseSegmento.index
        // // const inicialPos = 8416

        // // Configura a posição 'y' da câmera para a altura da tela mais o valor 'y' do ponto 'mundo' do segmento base.
        // cameraClass.y = camera.h + baseSegmento.pontos.mundo.y;

        // // Define a variável 'maxY' com a altura da tela.
        // let maxY = camera.tela.height;

        // // Inicializa as variáveis 'anx' e 'snx' com zero.
        // let anx = 0;
        // let snx = 0

        // // Loop que percorre os segmentos a serem visualizados.
        // for (let i = inicialPos; i < inicialPos + this.visibilidadeSegmentos; i += 1) {
            
        //     // Obtém o segmento atual a partir do índice 'i'.
        //     const atualSegmento = this.getSegmentoDoIndice(i);

        //     // Configura a posição 'z' da câmera com base no cursor, considerando a extensão do cenário.
        //     cameraClass.z = camera.cursor - (i >= segmentosTamanho ? this.length : 0);

        //     // Calcula a posição 'x' da câmera com base na posição 'x' do jogador e na largura do segmento atual.
        //     cameraClass.x = jogador.x * atualSegmento.pontos.mundo.w - snx;

        //     // Projeta o segmento atual na câmera.
        //     atualSegmento.projetar(camera);

        //     // Incrementa 'snx' com 'anx'.
        //     snx += anx;
            
        //     // Obtém os pontos de tela do segmento atual.
        //     const atualSegmentoTela = atualSegmento.pontos.tela;

        //     // Define o valor de 'clip' do segmento atual com base em 'maxY'.   
        //     atualSegmento.clip = maxY;

        //     // Verifica se o segmento atual está fora da tela ou muito próximo do plano do projetor da câmera.
        //     if(
        //         atualSegmentoTela.y >= maxY
        //         || camera.deltaZ <= camera.distanciaDoPlanoProjetor
        //     ) {

        //         // Caso a condição seja satisfeita, continua para o próximo segmento.
        //         continue;
        //     }

        //     // Verifica se o índice 'i' é maior que zero.
        //     if (i > 0) {
                
        //         // Obtém o segmento anterior com base no índice 'i - 1'.
        //         const anteriorSegmento = this.getSegmentoDoIndice(i - 1);
        //         const anteriorSegmentoTela = anteriorSegmento.pontos.tela;
        //         const { cores } = atualSegmento;

        //         if (atualSegmentoTela.y >= anteriorSegmentoTela.y) {
                    
        //             continue;
        //         }

        //         render.drawTrapezium(

        //             anteriorSegmentoTela.x, anteriorSegmentoTela.y, anteriorSegmentoTela.w,
        //             atualSegmentoTela.x, atualSegmentoTela.y, atualSegmentoTela.w,
        //             cores.estrada
        //         );

        //         // grama esquerdo
        //         render.drawPolygon(
        //             cores.grama,
        //             0, anteriorSegmentoTela.y,
        //             anteriorSegmentoTela.x - anteriorSegmentoTela.w, anteriorSegmentoTela.y,
        //             atualSegmentoTela.x - atualSegmentoTela.w, atualSegmentoTela.y,
        //             0, atualSegmentoTela.y
        //         );

        //         // grama direita
        //         render.drawPolygon(
        //             cores.grama,
        //             anteriorSegmentoTela.x + anteriorSegmentoTela.w * 1, anteriorSegmentoTela.y,
        //             camera.tela.width, anteriorSegmentoTela.y,
        //             camera.tela.width, atualSegmentoTela.y,
        //             atualSegmentoTela.x + atualSegmentoTela.w, atualSegmentoTela.y,
        //         );

        //         // if (atualSegmento.guia) {
                    
        //         //     // guia esquerda
        //         //     render.drawPolygon(

        //         //         cores.guia,
        //         //         anteriorSegmentoTela.x - anteriorSegmentoTela.w * 1.3, anteriorSegmentoTela.y,
        //         //         anteriorSegmentoTela.x - anteriorSegmentoTela.w, anteriorSegmentoTela.y,
        //         //         atualSegmentoTela.x - atualSegmentoTela.w, atualSegmentoTela.y,
        //         //         atualSegmentoTela.x - atualSegmentoTela.w * 1.3, atualSegmentoTela.y,

        //         //     );

        //         //     // guia direita
        //         //     render.drawPolygon(

        //         //         cores.guia,
        //         //         anteriorSegmentoTela.x + anteriorSegmentoTela.w * 1.3, anteriorSegmentoTela.y,
        //         //         anteriorSegmentoTela.x + anteriorSegmentoTela.w, anteriorSegmentoTela.y,
        //         //         atualSegmentoTela.x + atualSegmentoTela.w, atualSegmentoTela.y,
        //         //         atualSegmentoTela.x + atualSegmentoTela.w * 1.3, atualSegmentoTela.y,
        //         //     )
        //         // }

        //         // if (cores.faixa) {

        //         //     // faixa esquerda
        //         //     render.drawPolygon(

        //         //         cores.faixa,
        //         //         anteriorSegmentoTela.x + anteriorSegmentoTela.w * -0.97, anteriorSegmentoTela.y,
        //         //         anteriorSegmentoTela.x + anteriorSegmentoTela.w * -0.94, anteriorSegmentoTela.y,
        //         //         atualSegmentoTela.x + atualSegmentoTela.w * -0.94, atualSegmentoTela.y,
        //         //         atualSegmentoTela.x + atualSegmentoTela.w * -0.97, atualSegmentoTela.y,
        //         //     );

        //         //     render.drawPolygon(

        //         //         cores.faixa,
        //         //         anteriorSegmentoTela.x + anteriorSegmentoTela.w * -0.91, anteriorSegmentoTela.y,
        //         //         anteriorSegmentoTela.x + anteriorSegmentoTela.w * -0.88, anteriorSegmentoTela.y,
        //         //         atualSegmentoTela.x + atualSegmentoTela.w * -0.88, atualSegmentoTela.y,
        //         //         atualSegmentoTela.x + atualSegmentoTela.w * -0.91, atualSegmentoTela.y,
        //         //     );

        //         //     // faixa direita
        //         //     render.drawPolygon(

        //         //         cores.faixa,
        //         //         anteriorSegmentoTela.x + anteriorSegmentoTela.w * 0.97, anteriorSegmentoTela.y,
        //         //         anteriorSegmentoTela.x + anteriorSegmentoTela.w * 0.94, anteriorSegmentoTela.y,
        //         //         atualSegmentoTela.x + atualSegmentoTela.w * 0.94, atualSegmentoTela.y,
        //         //         atualSegmentoTela.x + atualSegmentoTela.w * 0.97, atualSegmentoTela.y,
        //         //     );

        //         //     render.drawPolygon(

        //         //         cores.faixa,
        //         //         anteriorSegmentoTela.x + anteriorSegmentoTela.w * 0.91, anteriorSegmentoTela.y,
        //         //         anteriorSegmentoTela.x + anteriorSegmentoTela.w * 0.88, anteriorSegmentoTela.y,
        //         //         atualSegmentoTela.x + atualSegmentoTela.w * 0.88, atualSegmentoTela.y,
        //         //         atualSegmentoTela.x + atualSegmentoTela.w * 0.91, atualSegmentoTela.y,
        //         //     );

        //         //     const valor = 0.02;

        //         //     render.drawTrapezium(

        //         //         anteriorSegmentoTela.x + anteriorSegmentoTela.y, anteriorSegmentoTela.w * valor,
        //         //         atualSegmentoTela.x + atualSegmentoTela.y, atualSegmentoTela.w * valor,
        //         //         cores.faixa
        //         //     );
                    
                    
                    
                    
        //         // }

        //         // if (cores.checkers === 'one') {

        //         //     for (let i = 0; i < 0.9; i++) {
                        
        //         //         render.drawPolygon(
        //         //             'black',
        //         //             anteriorSegmentoTela.x + anteriorSegmentoTela.w * i, anteriorSegmentoTela.y,
        //         //             anteriorSegmentoTela.x + anteriorSegmentoTela.w * (i + 1 / 3), anteriorSegmentoTela.y,
        //         //             atualSegmentoTela.x + atualSegmentoTela.w * (i + 1 / 3), atualSegmentoTela.y,
        //         //             atualSegmentoTela.x + atualSegmentoTela.w * i, atualSegmentoTela.y
        //         //         );
                        
        //         //     }
                    
        //         // }

        //         // if (cores.checkers === 'two') {

        //         //     for (let i = 0; i < 0.9; i++) {
                        
        //         //         render.drawPolygon(
        //         //             'black',
        //         //             anteriorSegmentoTela.x + anteriorSegmentoTela.w * i, anteriorSegmentoTela.y,
        //         //             anteriorSegmentoTela.x + anteriorSegmentoTela.w * (i + 1 / 3), anteriorSegmentoTela.y,
        //         //             atualSegmentoTela.x + atualSegmentoTela.w * (i + 1 / 3), atualSegmentoTela.y,
        //         //             atualSegmentoTela.x + atualSegmentoTela.w * i, atualSegmentoTela.y
        //         //         );
                        
        //         //     }
                    
        //         // }
        //     }
        //     maxY = atualSegmentoTela.y;
        // }

        // for (let i = (this.visibilidadeSegmentos + inicialPos) - 1; i >= inicialPos; i -= 1) {
            
        //     this.getSegmentoDoIndice(i)
        //     .drawSprite(render, camera, jogador);
            
        // }
    }
}






//     /**
//   * @type {SegmentoLinha[]}
//   */

//   // Lista de segmentos da estrada
//   #segments = [];

//   // Comprimento de cada segmento da estrada
//   #segmentLength = 200; 

//   // Número de segmentos visíveis na tela
//   visibleSegments = 600;

//   // Número de segmentos para alterar a cor do meio-fio
//   #k = 13;

//   // Largura da estrada
//   #width = 2000;
//   constructor(pistaNome) {
//     this.pistaNome = pistaNome;
//   }

//   get k() {
//     return this.#k;
//   }

//   /**
//    * Segment size on estrada
//    */
//   get segmentLength() {
//     return this.#segmentLength;
//   }

//   /**
//    * Total of segments (track length)
//    */
//   get segmentsLength() {
//     return this.#segments.length;
//   }

//   get length() {
//     return this.segmentsLength * this.segmentLength;
//   }

//   get width() {
//     return this.#width;
//   }

//   /**
//    *
//    * @param {Number} cursor
//    * @returns
//    */
//   getSegment(cursor) {
//     return this.#segments[Math.floor(cursor / this.#segmentLength) % this.segmentsLength];
//   }

//   getSegmentFromIndex(index) {
//     return this.#segments[index % this.segmentsLength];
//   }

//   create() {
//     this.#segments = [];
//     const { k } = this;
//     const { tamanhoPista, cores } = pistas[this.pistaNome];
//     for (let i = 0; i < tamanhoPista; i += 1) {
      
//         const coresMaisClaras = {
//                             estrada: cores.estradaClara,
//                             grama: cores.gramaClara,
//                             guia: cores.guiaClara,
//                             faixa: ''
//                         };
            
//                         const coresMaisEscuras = {
            
//                             estrada: cores.estradaClara,
//                             grama: cores.gramaEscura,
//                             guia: cores.guiaEscura,
//                             faixa: '#fff',
            
//                         };
            
//                         const coresClaras = {
            
//                             estrada: '#393839',
//                             grama: cores.gramaEscura,
//                             guia: cores.guiaClara,
//                             faixa: ''
//                         };
            
//                         const coresEscuras = {
            
//                             estrada: '#393839',
//                             grama: cores.gramaClara,
//                             guia: cores.guiaEscura,
//                             faixa: '#fff'
//                         }

//       const segmentLine = new SegmentoLinha();
//       segmentLine.index = i;

//       if(Math.floor(i / k) % 4 === 0) segmentLine.cores = coresMaisClaras;
//       if(Math.floor(i / k) % 4 === 1) segmentLine.cores = coresMaisEscuras;
//       if(Math.floor(i / k) % 4 === 2) segmentLine.cores = coresClaras;
//       if(Math.floor(i / k) % 4 === 3) segmentLine.cores = coresEscuras;

//       if (i <= 11) {
//         segmentLine.cores.estrada = '#fff'
//         i % 4 === 0 || i % 4 === 1 ? segmentLine.cores.checkers = 'one' : segmentLine.cores.checkers = 'two';
//       }

//       const { mundo } = segmentLine.pontos;
//       mundo.w = this.width;
//       mundo.z = (i + 1) * this.segmentLength;
//       this.#segments.push(segmentLine);

//     }

// }

  
  

//   /**
//    *
//    * @param {Render} render
//    * @param {Camera} camera
//    * @param {Jogador} jogador
//    */
//   render(render, camera, jogador) {
//     const cameraClass = camera;
//     const { segmentsLength } = this;
//     const baseSegment = this.getSegment(camera.cursor);
//     // const startPos = baseSegment.index;
//     const startPos = 8416
//     cameraClass.y = camera.h + baseSegment.pontos.mundo.y;
//     let maxY = camera.tela.height;
//     let anx = 0;
//     let snx = 0;

//     for (let i = startPos; i < startPos + this.visibleSegments; i += 1) {
//       const currentSegment = this.getSegmentFromIndex(i);
//       cameraClass.z = camera.cursor - (i >= segmentsLength ? this.length : 0);
//       cameraClass.x = jogador.x * currentSegment.pontos.mundo.w - snx;
//       currentSegment.projetar(camera);
//     //   anx += currentSegment.curve;
//       snx += anx;

//       const currentScreenPoint = currentSegment.pontos.tela;
//       currentSegment.clip = maxY;
//       if (
//         currentScreenPoint.y >= maxY
//         || camera.deltaZ <= camera.distanceToProjectionPlane
//       ) {
//         continue;
//       }

//       if (i > 0) {
//         const previousSegment = this.getSegmentFromIndex(i - 1);
//         const previousScreenPoint = previousSegment.pontos.tela;
//         const { cores } = currentSegment;

//         // if (currentScreenPoint.y >= previousScreenPoint.y) {
//         //   continue;
//         // }

//         if (336 >= 375) {
            
//             continue;
//         }

//         render.drawTrapezium(
//           previousScreenPoint.x, previousScreenPoint.y, previousScreenPoint.w,
//           currentScreenPoint.x, currentScreenPoint.y, currentScreenPoint.w,
//           cores.estrada,
//         );

//         // left grama
//         render.drawPolygon(
//           cores.grama,
//           0, previousScreenPoint.y,
//           previousScreenPoint.x - previousScreenPoint.w, previousScreenPoint.y,
//           currentScreenPoint.x - currentScreenPoint.w, currentScreenPoint.y,
//           0, currentScreenPoint.y,
//         );

//         // right grama
//         render.drawPolygon(
//           cores.grama,
//           previousScreenPoint.x + previousScreenPoint.w * 1, previousScreenPoint.y,
//           camera.tela.width, previousScreenPoint.y,
//           camera.tela.width, currentScreenPoint.y,
//           currentScreenPoint.x + currentScreenPoint.w, currentScreenPoint.y,
//         );

//         if (currentSegment.guia) {
//           // left guia
//           render.drawPolygon(
//             cores.guia,
//             previousScreenPoint.x - previousScreenPoint.w * 1.3, previousScreenPoint.y,
//             previousScreenPoint.x - previousScreenPoint.w, previousScreenPoint.y,
//             currentScreenPoint.x - currentScreenPoint.w, currentScreenPoint.y,
//             currentScreenPoint.x - currentScreenPoint.w * 1.3, currentScreenPoint.y,
//           );

//           // right guia
//           render.drawPolygon(
//             cores.guia,
//             previousScreenPoint.x + previousScreenPoint.w * 1.3, previousScreenPoint.y,
//             previousScreenPoint.x + previousScreenPoint.w, previousScreenPoint.y,
//             currentScreenPoint.x + currentScreenPoint.w, currentScreenPoint.y,
//             currentScreenPoint.x + currentScreenPoint.w * 1.3, currentScreenPoint.y,
//           );
//         }

//         // center faixa and lateral stripes
//         if (cores.faixa) {
//           // left stripe
//           render.drawPolygon(
//             cores.faixa,
//             previousScreenPoint.x + previousScreenPoint.w * -0.97, previousScreenPoint.y,
//             previousScreenPoint.x + previousScreenPoint.w * -0.94, previousScreenPoint.y,
//             currentScreenPoint.x + currentScreenPoint.w * -0.94, currentScreenPoint.y,
//             currentScreenPoint.x + currentScreenPoint.w * -0.97, currentScreenPoint.y,
//           );

//           render.drawPolygon(
//             cores.faixa,
//             previousScreenPoint.x + previousScreenPoint.w * -0.91, previousScreenPoint.y,
//             previousScreenPoint.x + previousScreenPoint.w * -0.88, previousScreenPoint.y,
//             currentScreenPoint.x + currentScreenPoint.w * -0.88, currentScreenPoint.y,
//             currentScreenPoint.x + currentScreenPoint.w * -0.91, currentScreenPoint.y,
//           );

//           // right stripe
//           render.drawPolygon(
//             cores.faixa,
//             previousScreenPoint.x + previousScreenPoint.w * 0.97, previousScreenPoint.y,
//             previousScreenPoint.x + previousScreenPoint.w * 0.94, previousScreenPoint.y,
//             currentScreenPoint.x + currentScreenPoint.w * 0.94, currentScreenPoint.y,
//             currentScreenPoint.x + currentScreenPoint.w * 0.97, currentScreenPoint.y,
//           );

//           render.drawPolygon(
//             cores.faixa,
//             previousScreenPoint.x + previousScreenPoint.w * 0.91, previousScreenPoint.y,
//             previousScreenPoint.x + previousScreenPoint.w * 0.88, previousScreenPoint.y,
//             currentScreenPoint.x + currentScreenPoint.w * 0.88, currentScreenPoint.y,
//             currentScreenPoint.x + currentScreenPoint.w * 0.91, currentScreenPoint.y,
//           );

//           // center faixa
//           const value = 0.02;
//           render.drawTrapezium(
//             previousScreenPoint.x, previousScreenPoint.y, previousScreenPoint.w * value,
//             currentScreenPoint.x, currentScreenPoint.y, currentScreenPoint.w * value,
//             cores.faixa,
//           );
//         }

//         //checkered estrada
//         if (cores.checkers === 'one') {
//           for (let i = -1; i < 0.9; i += 2 / 3) {
//             render.drawPolygon(
//               'black',
//               previousScreenPoint.x + previousScreenPoint.w * i, previousScreenPoint.y,
//               previousScreenPoint.x + previousScreenPoint.w * (i + 1 / 3), previousScreenPoint.y,
//               currentScreenPoint.x + currentScreenPoint.w * (i + 1 / 3), currentScreenPoint.y,
//               currentScreenPoint.x + currentScreenPoint.w * i, currentScreenPoint.y,
//             );
//           };
//         }
//         if (cores.checkers === 'two') {
//           for (let i = -2 / 3; i < 0.9; i += 2 / 3) {
//             render.drawPolygon(
//               'black',
//               previousScreenPoint.x + previousScreenPoint.w * i, previousScreenPoint.y,
//               previousScreenPoint.x + previousScreenPoint.w * (i + 1 / 3), previousScreenPoint.y,
//               currentScreenPoint.x + currentScreenPoint.w * (i + 1 / 3), currentScreenPoint.y,
//               currentScreenPoint.x + currentScreenPoint.w * i, currentScreenPoint.y,
//             );
//           };
//         }
//       }

//       maxY = currentScreenPoint.y;
//     }
//     for (let i = (this.visibleSegments + startPos) - 1; i >= startPos; i -= 1) {
//       this.getSegmentFromIndex(i)
//         .drawSprite(render, camera, jogador);
//     }
//   }
// }

export default Estrada;