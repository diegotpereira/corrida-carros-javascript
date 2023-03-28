class SegmentoLinha {
    /**
     * @type {Object}
     */
    cores = {};
  
    /**
     * @type {Sprite[]}
     */
    sprites = [];
  
    /**
     * @type {Object}
     */
    pontos = {
      mundo: {
        x: 0,
        y: 0,
        z: 0,
        w: 0,
      },
      camera: {
        x: 0,
        y: 0,
        z: 0,
        w: 0,
      },
    };
  
    /**
     * @type {number}
     */
    curva = 0;
  
    /**
     * @type {number}
     */
    guia = 0;
  }
  
  export default SegmentoLinha;
  