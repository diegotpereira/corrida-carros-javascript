import SegmentoLinha from "./segmentolinha.js";
import Sprite from "./sprite.js";
import { recurso, pistas } from "./util.js";

class Estrada {
  /**
   * @type {SegmentoLinha[]}
   */
  #segmentos = [];
  #segmentoTamanho = 200;
  visibilidadeSegmentos = 600;
  #k = 13;
  #width = 2000;


  constructor(pistaNome) {
    this.pistaNome = pistaNome;
  }

  get k() {
    return this.#k;
  }

  get segmentoTamanho() {
    return this.#segmentoTamanho;
  }

  get segmentosTamanho() {
    return this.#segmentos.length;
  }

  get length() {
    return this.segmentosTamanho * this.segmentoTamanho;
  }

  get width() {
    return this.#width;
  }

  /**
   * @param {Number} cursor
   * @returns
   */
  getSegmento(cursor) {

    return this.#segmentos[Math.floor(cursor / this.#segmentoTamanho) % this.segmentosTamanho];

  }


  getSegmentoDoIndice(index) {
    return this.#segmentos[index % this.segmentosTamanho];
  }

  create() {
    this.#segmentos = [];
    const { k } = this;
    const { tamanhoPista, cores } = pistas[this.pistaNome];

    for (let i = 0; i < tamanhoPista; i += 1) {
      const coresMaisClaras = {
        estrada: cores.estradaClara,
        grama: cores.gramaClara,
        guia: cores.guiaClara,
        faixa: "",
        tunel: cores.tunelClara,
      };
      const coresClaras = {
        estrada: "#393839",
        grama: cores.gramaEscura,
        guia: cores.guiaClara,
        faixa: "",
        tunel: cores.tunelClara,
      };
      const coresEscuras = {
        estrada: "#393839",
        grama: cores.gramaClara,
        guia: cores.guiaEscura,
        faixa: "#fff",
        tunel: cores.tunelClara,
      };
      const coresMaisEscuras = {

        estrada: cores.estradaClara,
        grama: cores.gramaEscura,
        guia: cores.guiaEscura,
        faixa: '#fff',
        tunel: cores.tunelEscura
        
      };  
      const segmentoLinha = new SegmentoLinha();

      // console.log(segmentoLinha);
      segmentoLinha.index = i;

      if(Math.floor(i / k) % 4 === 0) segmentoLinha.cores = coresMaisClaras;
      if(Math.floor(i / k) % 4 === 1) segmentoLinha.cores = coresMaisEscuras;
      if(Math.floor(i / k) % 4 === 2) segmentoLinha.cores = coresClaras;
      if(Math.floor(i / k) % 4 === 3) segmentoLinha.cores = coresEscuras;

      if (i <= 11) {
                
        segmentoLinha.cores.estrada = '#fff' 
        i % 4 === 0 || i % 4 === 1 ? segmentoLinha.cores.checkers = 'um' : segmentoLinha.cores.checkers = 'dois';
      }

      const { mundo } = segmentoLinha.pontos;
      mundo.w = this.width;
      mundo.z = (i + 1) * this.segmentoTamanho;
      
      this.#segmentos.push(segmentoLinha);

       // adicionado curvas
       const criarCurvas = (min, max, curva, guia) => {
          if (i >= min && i <= max) {
              
              segmentoLinha.curva = curva;
              segmentoLinha.guia = guia;
          }
        }

        pistas[this.pistaNome].curvas.forEach((curva) => criarCurvas(curva.min, curva.max, curva.curvaInclinacao, curva.guia));

        const { curva: curvaForca, guia} = this.getSegmentoDoIndice(i);

        if (i % (k * 2) === 0 && Math.abs(curvaForca) > 1 && guia) {

          const curvaSinal = new Sprite();
          
          curvaSinal.offsetX = curvaForca > 0 ? -1.5 : 1.5;
          curvaSinal.escalaX = 72;
          curvaSinal.escalaY = 72;
          curvaSinal.imagem = recurso.get(curvaForca > 0 ? 'leftSignal' : 'rightSinal');
          curvaSinal.nome = 'tsCurveSignal';
          segmentoLinha.sprites.push(curvaSinal);
        }
    }
  }

  /**
   *
   * @param {Render} render
   * @param {Camera} camera
   * @param {Jogador} jogador
   */

  render(render, camera, jogador) {


    
    const cameraClass = camera;
    const {segmentosTamanho}  = this;
    const baseSegmento = this.getSegmento(camera.cursor);
    
    const posInicial = baseSegmento.index;


    // const baseSegmento = this.getSegmento(camera.cursor);
    
    // const cameraClass = {cursor: 1683200, deltaZ:1200, h: 1500, x:2000, y: 1499.7854002165225, z: 1683200, distanciaDoPlanoProjetor: 0.577350269189626};
    // camera.x = 2000;
    // const posInicial = baseSegmento.index;
    
    
    cameraClass.y = camera.h + baseSegmento.pontos.mundo.y;
    let maxY = camera.tela.height;
    let anx = 0;
    let snx = 0;

    for(let i = posInicial; i < posInicial + this.visibilidadeSegmentos; i += 1) {

      // let jogador = 1;
      // camera.x = 2000;

        const atualSegmento = this.getSegmentoDoIndice(i);
        // camera.x = 2000;

        cameraClass.z = camera.cursor - (i >= segmentosTamanho ? this.length : 0)
        // camera.x = 2000;
        cameraClass.x = jogador.x * atualSegmento.pontos.mundo.w - snx;
        // camera.x = 2000;
        
        atualSegmento.projetar(camera);

        anx += atualSegmento.curva;
        snx += anx;

        const atualPontoTela = atualSegmento.pontos.tela;
        atualSegmento.clip = maxY;

        if (atualPontoTela.y >= maxY 
            
            || camera.deltaZ <= camera.distanciaDoPlanoProjetor) {
            
            continue;
        }

        if (i > 0) {
            
            const segmentosAnterior = this.getSegmentoDoIndice(i - 1);
            const pontoDeTelaAnterior = segmentosAnterior.pontos.tela;
            const { cores } = atualSegmento;

            if (atualPontoTela.y >= pontoDeTelaAnterior.y) {
                
                continue;
            }

            render.drawTrapezium(

                pontoDeTelaAnterior.x, pontoDeTelaAnterior.y, pontoDeTelaAnterior.w,
                atualPontoTela.x, atualPontoTela.y, atualPontoTela.w,
                cores.estrada
            );

            // grama esquerda
            render.drawPolygon(
                cores.grama,
                0, pontoDeTelaAnterior.y,
                pontoDeTelaAnterior.x - pontoDeTelaAnterior.w, pontoDeTelaAnterior.y,
                atualPontoTela.x - atualPontoTela.w, atualPontoTela.y,
                0, atualPontoTela.y
            );

            // grama direita
            render.drawPolygon(
                cores.grama,
                pontoDeTelaAnterior.x + pontoDeTelaAnterior.w * 1, pontoDeTelaAnterior.y,
                camera.tela.width, pontoDeTelaAnterior.y,
                camera.tela.width, atualPontoTela.y,
                atualPontoTela.x + atualPontoTela.w, atualPontoTela.y,
            );

            if (atualSegmento.guia) {
                
                // guia esquerdo
                render.drawPolygon(

                    cores.guia,
                    pontoDeTelaAnterior.x - pontoDeTelaAnterior.w * 1.3, pontoDeTelaAnterior.y,
                    pontoDeTelaAnterior.x - pontoDeTelaAnterior.w, pontoDeTelaAnterior.y,
                    atualPontoTela.x - atualPontoTela.w, atualPontoTela.y,
                    atualPontoTela.x - atualPontoTela.w * 1.3, atualPontoTela.y,
                );

                // guia direito
                render.drawPolygon(

                    cores.guia,
                    pontoDeTelaAnterior.x + pontoDeTelaAnterior.w * 1.3, pontoDeTelaAnterior.y,
                    pontoDeTelaAnterior.x + pontoDeTelaAnterior.w, pontoDeTelaAnterior.y,
                    atualPontoTela.x + atualPontoTela.w, atualPontoTela.y,
                    atualPontoTela.x + atualPontoTela.w * 1.3, atualPontoTela.y,
                );
            }

            // faixa central e faixas laterais
            if (cores.faixa) {
                    
                // faixa esquerda
                render.drawPolygon(

                    cores.faixa,
                    pontoDeTelaAnterior.x + pontoDeTelaAnterior.w * -0.97, pontoDeTelaAnterior.y,
                    pontoDeTelaAnterior.x + pontoDeTelaAnterior.w * -0.94, pontoDeTelaAnterior.y,
                    atualPontoTela.x + atualPontoTela.w * -0.94, atualPontoTela.y,
                    atualPontoTela.x + atualPontoTela.w * -0.97, atualPontoTela.y,
                );

                render.drawPolygon(

                    cores.faixa,
                    pontoDeTelaAnterior.x + pontoDeTelaAnterior.w * -0.91, pontoDeTelaAnterior.y,
                    pontoDeTelaAnterior.x + pontoDeTelaAnterior.w * -0.88, pontoDeTelaAnterior.y,
                    atualPontoTela.x + atualPontoTela.w * -0.88, atualPontoTela.y,
                    atualPontoTela.x + atualPontoTela.w * -0.91, atualPontoTela.y,

                );

                // faixa direita
                render.drawPolygon(

                    cores.faixa,
                    pontoDeTelaAnterior.x + pontoDeTelaAnterior.w * 0.97, pontoDeTelaAnterior.y,
                    pontoDeTelaAnterior.x + pontoDeTelaAnterior.w * 0.94, pontoDeTelaAnterior.y,
                    atualPontoTela.x + atualPontoTela.w * 0.94, atualPontoTela.y,
                    atualPontoTela.x + atualPontoTela.w * 0.97, atualPontoTela.y,

                );

                render.drawPolygon(

                    cores.faixa,
                    pontoDeTelaAnterior.x + pontoDeTelaAnterior.w * 0.91, pontoDeTelaAnterior.y,
                    pontoDeTelaAnterior.x + pontoDeTelaAnterior.w * 0.88, pontoDeTelaAnterior.y,
                    atualPontoTela.x + atualPontoTela.w * 0.88, atualPontoTela.y,
                    atualPontoTela.x + atualPontoTela.w * 0.91, atualPontoTela.y,

                );

                // centro da faixa
                const valor = 0.02;

                render.drawTrapezium(

                    pontoDeTelaAnterior.x, pontoDeTelaAnterior.y, pontoDeTelaAnterior.w * valor,
                    atualPontoTela.x, atualPontoTela.y, atualPontoTela.w * valor,
                    cores.faixa,
                )
            }
            //checkered road
            if (cores.checkers === 'um') {
                for (let i = -1; i < 0.9; i += 2 / 3) {
                render.drawPolygon(
                    'black',
                    pontoDeTelaAnterior.x + pontoDeTelaAnterior.w * i, pontoDeTelaAnterior.y,
                    pontoDeTelaAnterior.x + pontoDeTelaAnterior.w * (i + 1 / 3), pontoDeTelaAnterior.y,
                    atualPontoTela.x + atualPontoTela.w * (i + 1 / 3), atualPontoTela.y,
                    atualPontoTela.x + atualPontoTela.w * i, atualPontoTela.y,
                );
                };
            }
            if (cores.checkers === 'dois') {
                for (let i = -2 / 3; i < 0.9; i += 2 / 3) {
                render.drawPolygon(
                    'black',
                    pontoDeTelaAnterior.x + pontoDeTelaAnterior.w * i, pontoDeTelaAnterior.y,
                    pontoDeTelaAnterior.x + pontoDeTelaAnterior.w * (i + 1 / 3), pontoDeTelaAnterior.y,
                    atualPontoTela.x + atualPontoTela.w * (i + 1 / 3), atualPontoTela.y,
                    atualPontoTela.x + atualPontoTela.w * i, atualPontoTela.y,
                );
                };
            }
        }

        maxY = atualPontoTela.y;
    }

    for(let index = (600 + posInicial) - 1; index >= posInicial; index -= 1) {

        this.getSegmentoDoIndice(index)
            .drawSprite(render, camera, jogador)
            // .drawTunnel(render, camera, jogador);
    }
  }
  // drawRoad(ctx, width, lanes) {
  //   let dx = 0;
  //   let segmentW = this.roadWidth / lanes;

  //   ctx.save();

  //   // Desenha a grama
  //   ctx.fillStyle = COLORS.GRASS;
  //   ctx.fillRect(0, 0, this.roadWidth, this.roadHeight);

  //   // Desenha as faixas laterais
  //   ctx.fillStyle = COLORS.ROAD.LIGHT;
  //   ctx.fillRect(dx, 0, segmentW * 0.25, this.roadHeight);
  //   ctx.fillStyle = COLORS.ROAD.DARK;
  //   ctx.fillRect(dx + segmentW * 0.25, 0, segmentW * 0.5, this.roadHeight);
  //   ctx.fillStyle = COLORS.ROAD.LIGHT;
  //   ctx.fillRect(dx + segmentW * 0.75, 0, segmentW * 0.25, this.roadHeight);

  //   // Desenha a faixa central
  //   ctx.fillStyle = COLORS.ROAD.WHITE;
  //   ctx.fillRect(dx + segmentW * 0.48, 0, segmentW * 0.04, this.roadHeight);

  //   ctx.restore();
  // }
}

export default Estrada;
