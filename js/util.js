
import Recurso from "./recurso.js";
import LidarComEntrada from "./LidarComEntrada.js";

const canvas = document.querySelector('#canvas_principal');

const campoDeVisao = (120 / 180) * Math.PI;
const teta = campoDeVisao * 0.5;

const lidarComEntrada = new LidarComEntrada();
const recurso = new Recurso();

const formatarTempo = (dt) => {

  const tempo = Math.round(dt);
  const minutos = Math.floor(tempo / 60000);
  const segundos = Math.floor(tempo / 1000) - (minutos * 60);
  const decimos = tempo.toString().slice(-3);

  return `${minutos}:${(segundos < 10 ? '0' : '')}${segundos}.${tempo < 100 ? '000' : decimos}`;
}

const posicaoInicial = (tamanhoPista, posicao) => (tamanhoPista - (posicao * 16)) * 200;

const sobreposicao = () => {}

const pistas = {

    brasil: {

        pistaNome: 'Interlagos',
        tamanhoPista: 8632,
        voltas: 71,
        cores: {

            estradaClara: '#424142',
            estradaEscura: '#393839',
            gramaClara: '#008800',
            gramaEscura: '#006600',
            guiaClara: '#ffffff',
            guiaEscura: '#ff0000',
            tunelClara: '#0000ff',
            tunelEscura: '#00008b'

        },
        curvas: [
            {
                min: 200, max: 400, curvaInclinacao: -4, guia: 1
            },
            {
                min: 600, max: 800, curvaInclinacao: 4, guia: 1,
            },
            {
            min: 900, max: 1500, curvaInclinacao: -2, guia: 1,
            },
            {
            min: 2500, max: 2750, curvaInclinacao: -5, guia: 1,
            },
            {
            min: 2950, max: 3200, curvaInclinacao: -3, guia: 1,
            },
            {
            min: 3600, max: 3725, curvaInclinacao: 4, guia: 1,
            },
            {
            min: 3850, max: 3975, curvaInclinacao: 3, guia: 1,
            },
            {
            min: 4225, max: 4475, curvaInclinacao: 5, guia: 1,
            },
            {
            min: 4600, max: 5100, curvaInclinacao: -5, guia: 1,
            },
            {
            min: 5300, max: 5350, curvaInclinacao: 2, guia: 1,
            },
            {
            min: 5475, max: 5675, curvaInclinacao: 6, guia: 1,
            },
            {
            min: 6050, max: 6300, curvaInclinacao: -4, guia: 1,
            },
            {
            min: 6800, max: 7000, curvaInclinacao: -6, guia: 1,
            },
            {
            min: 7100, max: 7200, curvaInclinacao: -3, guia: 1,
            },
            {
            min: 7575, max: 7700, curvaInclinacao: -4, guia: 1,
            },
            {
            min: 8075, max: 8200, curvaInclinacao: -3, guia: 1,
            },
        ],
        colinas: [
            { segmentoInicial: 1, tamanho: 800, topografia: -40 },
            { segmentoInicial: 900, tamanho: 600, topografia: 15 },
            { segmentoInicial: 2500, tamanho: 750, topografia: -35 },
            { segmentoInicial: 3500, tamanho: 500, topografia: 20 },
            { segmentoInicial: 4200, tamanho: 650, topografia: -30 },
            { segmentoInicial: 5000, tamanho: 650, topografia: 35 },
            { segmentoInicial: 5700, tamanho: 600, topografia: -25 },
            { segmentoInicial: 6400, tamanho: 400, topografia: -15 },
            { segmentoInicial: 7000, tamanho: 700, topografia: 80 },
            { segmentoInicial: 7700, tamanho: 300, topografia: 20 },
            { segmentoInicial: 8100, tamanho: 500, topografia: -10 },
            { segmentoInicial: 8632, tamanho: 0, topografia: 0 },
        ],
        tuneis: [
            {
                min: 0, max: 0, nome: '', height: 1,
            }
        ]
    },
    canada: {

        pistaNome: 'Montreal',
        tamanhoPista: 8736,
        voltas: 69,
        cores: {
            estradaClara: '#424142',
            estradaEscura: '#393839',
            gramaClara: '#008800',
            gramaEscura: '#006600',
            guiaClara: '#ffffff',
            guiaEscura: '#ff0000',
            tunelClara: '#0000ff',
            tunelEscura: '#00008b'
          },
          curvas: [
            {
              min: 50, max: 174, curvaInclinacao: 1, guia: 0,
            },
            {
              min: 373, max: 510, curvaInclinacao: -4, guia: 1,
            },
            {
              min: 560, max: 995, curvaInclinacao: 4, guia: 1,
            },
            {
              min: 1244, max: 1368, curvaInclinacao: 1, guia: 0,
            },
            {
              min: 1629, max: 1716, curvaInclinacao: 4, guia: 1,
            },
            {
              min: 1816, max: 1927, curvaInclinacao: -4, guia: 1,
            },
            {
              min: 2114, max: 2164, curvaInclinacao: -2, guia: 1,
            },
            {
              min: 2214, max: 2438, curvaInclinacao: 3, guia: 0,
            },
            {
              min: 2686, max: 2886, curvaInclinacao: -4, guia: 1,
            },
            {
              min: 2961, max: 3110, curvaInclinacao: 3, guia: 1,
            },
            {
              min: 3110, max: 3310, curvaInclinacao: 3, guia: 0,
            },
            {
              min: 3545, max: 3968, curvaInclinacao: 0.5, guia: 0,
            },
            {
              min: 4180, max: 4328, curvaInclinacao: 5, guia: 1,
            },
            {
              min: 4428, max: 4577, curvaInclinacao: -5, guia: 1,
            },
            {
              min: 4975, max: 5286, curvaInclinacao: -1, guia: 0,
            },
            {
              min: 5597, max: 6007, curvaInclinacao: 5, guia: 1,
            },
            {
              min: 6119, max: 6306, curvaInclinacao: -2, guia: 1,
            },
            {
              min: 6654, max: 6765, curvaInclinacao: 2, guia: 1,
            },
            {
              min: 6827, max: 6926, curvaInclinacao: -2, guia: 1,
            },
            {
              min: 6950, max: 7075, curvaInclinacao: 2, guia: 1,
            },
            {
              min: 7761, max: 7923, curvaInclinacao: 6, guia: 1,
            },
            {
              min: 7947, max: 8109, curvaInclinacao: -6, guia: 1,
            },
      
          ],
          colinas: [
            { segmentoInicial: 1, tamanho: 500, topografia: -10 },
            { segmentoInicial: 750, tamanho: 500, topografia: 15 },
            { segmentoInicial: 1575, tamanho: 300, topografia: -20 },
            { segmentoInicial: 2050, tamanho: 375, topografia: 15 },
            { segmentoInicial: 2600, tamanho: 500, topografia: 25 },
            { segmentoInicial: 3350, tamanho: 800, topografia: -10 },
            { segmentoInicial: 4600, tamanho: 600, topografia: -25 },
            { segmentoInicial: 6275, tamanho: 250, topografia: 30 },
            { segmentoInicial: 6600, tamanho: 175, topografia: -15 },
            { segmentoInicial: 6800, tamanho: 100, topografia: 15 },
            { segmentoInicial: 6925, tamanho: 150, topografia: -15 },
            { segmentoInicial: 7200, tamanho: 425, topografia: 10 },
            { segmentoInicial: 8632, tamanho: 0, topografia: 0 },
          ],
          tuneis: [
            {
              min: 0, max: 0, nome: '', height: 1,
            },
        ],
    }
}

const pilotos = [
  {
    energia: 1072, posicao: 1, ladoPista: -1, nome: 'Senna', carroCor: 4,
  }
];

const atualizarDeslocamentoCarroOffset = (carro, jogador, diretor, opoArr) => {

  const carParam = carro;
  const jogadorParam = jogador;
  const opoArrParam = opoArr;
  const olheParaFrente = 40;
  const colidir = 6;
  const { segmentosCarros: carroSeg } = diretor;
  const cSeg = (carroSeg.find(({ nome}) => nome === carParam.oponenteNome));
  const arrObjSeg = carroSeg.filter(({ pos }) => pos < cSeg.pos + olheParaFrente && pos > cSeg.pos);
  const objColidir = carroSeg.find(({ pos }) => pos < cSeg.pos + colidir && pos > cSeg.pos);
  let dir = carParam.opponentX;

  if (cSeg && cSeg.x <= -1.65) dir = 0.5;
  if (cSeg && cSeg.x >= 1.65) dir = -0.5;

  arrObjSeg.forEach((objSeg) => {

    if (objSeg && objSeg.nome != jogadorParam.nome) {
      
      const estaSobreposto = sobreposicao(cSeg.x, 0.663125, objSeg.x, 0.663125, 1);

      if (estaSobreposto) {
        
        const mudarX = 1;
        const difCarrosX = Math.abs(objSeg.x - cSeg.x);

        if(objSeg.x > 1 || (objSeg.x > 0 && difCarrosX < 0.3)) dir = -mudarX;
        if(objSeg.x > -1 || (objSeg.x < 0 && difCarrosX < 0.3)) dir = mudarX;
        if (objColidir && objColidir.nome !== jogadorParam.nome) {
          
          const opon = opoArrParam.findIndex(({ oponenteNome }) => oponenteNome === objColidir.nome);
          opoArrParam[opon].correnteEnergia *= 1.02;
          carParam.correnteEnergia *= 0.98;
        }
      }
    }
    if (objSeg && objSeg.nome === jogadorParam.nome && !carro.ehBatido) {
      
      const estaSobreposto = sobreposicao(cSeg.x, 0.663125, objSeg.x, 0.8, 1.2);

      if (carParam.correnteEnergia > jogadorParam.correnteEnergia && estaSobreposto) {
        
        const mudarX = 5;
        const difCarrosX = Math.abs(objSeg.x - cSeg.x);

        if(objSeg.x > 0.95 || (objSeg.x > 0 && difCarrosX < 0.4)) dir = mudarX * -1;
        else if (objSeg.x < -0.95 || (objSeg.x < 0 && difCarrosX < 0.4)) dir = mudarX;

        if (objColidir) {
          
          const x = (carParam.correnteEnergia - jogadorParam.correnteEnergia) / 2;
          jogadorParam.correnteEnergia += x * 1.8;
          carParam.correnteEnergia += x * -1.5; 
        }
      }
    }
  });
  
  return dir;
}

export {

    recurso, canvas, posicaoInicial, pistas, lidarComEntrada, campoDeVisao, teta, formatarTempo, pilotos, atualizarDeslocamentoCarroOffset
}