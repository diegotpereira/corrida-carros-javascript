import { lidarComEntrada, canvas, pistas, recurso} from "./util.js";
import Sprite from './sprite.js'


class Diretor {

    constructor() {

        this.animTempo = 0;

        this.posicao = '';
        this.posicoes = [];
        this.iniciarLuzes = new Sprite();
        this.pistaNome = '';
        this.pausado = false;

    }

    create(estrada, pistaNome) {

        lidarComEntrada.mapPress.p = true;

        const segmentoLinhaPrimeira = estrada.getSegmentoDoIndice(0);
        const segmentoLinhaDez = estrada.getSegmentoDoIndice(pistas[estrada.pistaNome].tamanhoPista - 160);

        this.pistaNome = pistaNome;
        this.iniciarLuzes.offsetX= 0;
        this.iniciarLuzes.offsetY = 2;
        this.iniciarLuzes.escalaX = 27;
        this.iniciarLuzes.escalaY = 27;
        this.iniciarLuzes.spritesEmX = 6;
        this.iniciarLuzes.sheetPositionX = Math.ceil(this.animTempo / 500);
        this.iniciarLuzes.imagem = recurso.get('startLights');
        this.iniciarLuzes.nome = 'tsStartLights';

        segmentoLinhaPrimeira.sprites.push(this.iniciarLuzes);
        segmentoLinhaDez.sprites.push(this.iniciarLuzes);

        const iniciarLinhaEsquerda = new Sprite();
        iniciarLinhaEsquerda.offsetX = -1.15;
        iniciarLinhaEsquerda.escalaX = 216;
        iniciarLinhaEsquerda.escalaY = 708;
        iniciarLinhaEsquerda.imagem = recurso.get('startLightsBar');
        iniciarLinhaEsquerda.nome = 'tsStartLightsBar';

        const iniciarLinhaDireita = new Sprite();
        iniciarLinhaDireita.offsetX = 1.15;
        iniciarLinhaDireita.escalaX = 216;
        iniciarLinhaDireita.escalaY = 708;
        iniciarLinhaDireita.imagem = recurso.get('startLightsBar');
        iniciarLinhaDireita.nome = 'tsStartLightsBar';


        segmentoLinhaPrimeira.sprites.push(iniciarLinhaEsquerda);
        segmentoLinhaPrimeira.sprites.push(iniciarLinhaDireita);
        segmentoLinhaDez.sprites.push(iniciarLinhaEsquerda);
        segmentoLinhaDez.sprites.push(iniciarLinhaDireita);
    }

    update(jogador) {

        // this.pausado = lidarComEntrada.mapPress.p;

        // if(this.tempoTotal < this.iniciarTempo || !this.pausado) this.correndo  = false;
        // else if(this.tempoTotal >= this.iniciarTempo && this.pausado) this.correndo = true;

        // this.tempoTotal += (1/ 60) * 1000 * this.pausado;
        // this.animTempo += (1 / 60) * 1000 * this.pausado;
        // this.ultimaVolta = this.voltaTempos[this.volta - 2] ? this.voltaTempos[this.volta - 2] : 0;
        // this.voltaRapida = this.voltaTempos.length ? Math.min.apply(null, this.voltaTempos) : 0;

        this.posicao = (this.posicoes.findIndex((elemento) => elemento.nome === jogador.nome) + 1).toString();

        // if(this.posicao < 10) this.posicao = `0${this.posicao}`;

        // let numeroDeCarros = this.posicoes.length;

        // if(numeroDeCarros < 10) numeroDeCarros = `0${numeroDeCarros}`;

        // this.atualizarPosicoes(jogador, oponente);

        // if(this.animTempo > this.iniciarTempo) this.iniciarLuzes.sheetPositionX = 0;
        // else if(this.animTempo > 2000 + 2500) this.iniciarLuzes.sheetPositionX = 5;
        // else if(this.animTempo > 2000 + 2000) this.iniciarLuzes.sheetPositionX = 4;
        // else if(this.animTempo > 2000 + 1500) this.iniciarLuzes.sheetPositionX = 3;
        // else if(this.animTempo > 2000 + 1000) this.iniciarLuzes.sheetPositionX = 2;
        // else if(this.animTempo > 2000 + 500) this.iniciarLuzes.sheetPositionX = 1;

        // if(this.pausado) {

        //     const posAtual = Number(this.posicao);
        //     this.hudPosicoes = this.posicoes.filter((_, index) => {

        //         if(posAtual <= 2) return index <= 2 && index >= 0;
        //         if(posAtual === this.posicoes.length) return index === 0 || index >= posAtual - 2;

        //         return (index === 0) || (index >= posAtual - 2 && index <= posAtual - 1);
        //     }).map((item, index, array) => {

        //         const resultado = {

        //             pos: item.posicao, nome: item.nome, volta: item.horaCorrida.length, realTempo: '- Líder', tempoTotal: (Math.round(item.horaCorrida.at(-1)) / 1000).toFixed(3),

        //         };

        //         const atualItem = item.horaCorrida.at(-1);
        //         const atualVolta = item.horaCorrida.length;

        //         if (index) {
                    
        //             const antItem = array[index - 1].horaCorrida.at(-1) || 0;
        //             const antVolta = array[index - 1].horaCorrida.length || 0;

        //             if (atualVolta === antVolta) {
                        

        //                 resultado.horaCorrida = `+ ${(Math.round(atualItem - antItem) / 1000).toFixed(3)}` ;

        //             } else if (atualVolta !==  antVolta) {
                        
        //                 resultado.horaCorrida = `${antVolta - atualVolta} Volta`;
        //             }
        //         }   

        //         return resultado;
        //     });

        //     this.segmentosCarros = this.posicoes.map((piloto) => ({

        //         nome: piloto.nome,
        //         pos: Math.floor(piloto.pos / 200) % pistas[this.pistaNome].tamanhoPista,
        //         x: piloto.x
        //     })).sort((a, b) => a.pos - b.pos);

        //     if(this.chovendo) this.chuva.forEach((item) => item.update());
        // }
    }

    render(render, jogador){

        // if (!this.pausado) {
            
        //     render.drawText('#FFFAF4', 'Jogo pausado!', 320, 175, 2, 'OutriderCond', 'center', 'black', true);
        // }

        // if (!this.pausado) {
            
        //     render.drawText('#FFFAF4', 'Aperte "P" para continuar', 320, 215, 2, 'OutriderCond', 'center', 'black', true);

        // }

        // if (this.tempoTotal < 2500) {
            
        //     render.drawText('#FFFAF4', 'Prepare-se...', 320, 135, 2, 'OutriderCond', 'center', 'black', true);
        // }

        // render.drawText('#050B1A', `Volta ${this.volta} de ${pistas[this.pistaNome].voltas}`, 4, 44, 0.8, 'Computo', 'left');

        // this.hudPosicoes.forEach(({ pos, nome, realTempo}, index) => {

        //     const alinharPos = pos < 10 ? `0${pos}` : pos;
        //     render.drawText('#050B1A', `${alinharPos}`, 4, `${60 + (index * 16)}`, 0.8, 'Computo', 'left');
        //     render.drawText('#050B1A', `${nome} ${realTempo}`, 32, `${60 + (index * 16)}`, 0.8, 'Computo', 'left');
        // });
        // render.drawText('#050B1A', `Total: ${formatarTempo(this.tempoTotal)}`, 636, 44, 0.8, 'Computo', 'right');
        // render.drawText('#050B1A', `Volta: ${formatarTempo(this.animTempo)}`, 636, 60, 0.8, 'Computo', 'right');
        // render.drawText('#050B1A', `Ultima: ${formatarTempo(this.ultimaVolta)}`, 636, 76, 0.8, 'Computo', 'right');
        // render.drawText('#050B1A', `Rapida: ${formatarTempo(this.voltaRapida)}`, 636, 92, 0.8, 'Computo', 'right');

        // if(this.chovendo) this.chuva.forEach((item) => item.render(render, jogador));

    }
}

export default Diretor