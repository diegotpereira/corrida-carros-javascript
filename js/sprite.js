class Sprite {
    /**
     * @type {HTMLImageElement}
     */
    constructor() {
      this.imagem = {};
      this.offsetX = 0;
      this.offsetY = 0;
      this.sheetPositionX = 0;
      this.sheetPositionY = 0;
      this.escalaX = 1;
      this.escalaY = 1;
      this.spritesEmX = 1;
      this.spritesEmY = 1;
      this.nome = 'sprite';
      this.runningPower = { speed: 0, mult: 0 };
    }
  
    get width() {
      return this.imagem.width;
    }
  
    get height() {
      return this.imagem.height;
    }
  }
  
  export default Sprite;
  