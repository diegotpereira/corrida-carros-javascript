class Jogador{

    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        
    }

    get width() {
        return 4800;
    }
      

    // get width() {

    //     return this.sprite.width;
    // }

    get height() {

        return this.sprite.height;
    }

}

export default Jogador;