

class Sprite {
    /**
     * @type {HTMLImagemElement}
     */
    constructor() {
      
      // Propriedade para armazenar a imagem do sprite
      this.imagem = {};

      // Propriedades de deslocamento nas coordenadas X e Y
      this.deslocamentoX = 0;
      this.deslocamentoY = 0;

      // Posição da imagem na folha de sprite nas coordenadas X e Y
      this.posicaoFolhaX = 0;
      this.posicaoFolhaY = 0;

      // Escala do sprite nas coordenadas X e Y
      this.escalaX = 1;
      this.escalaY = 1;

      // Número de sprites na folha de sprite nas direções X e Y
      this.spritesInX = 1;
      this.spritesInY = 1;

      // Nome do sprite
      this.nome = 'sprite';

    }
  
    // Getter para obter a largura do sprite
    get width() {
      return this.imagem.width;
    }

    // Getter para obter a altura do sprite
    get height() {
      return this.imagem.height;
    }
  }
  
  // Exporta a classe Sprite para ser utilizada em outros módulos
  export default Sprite;
  