class Jogador{

    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.correnteDeEnergia = 0;
        this.maxVelocidade = 1200;
        
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

    /**
     * @param {Render} render
     * @param {Camera} camera 
     * @param {Number} estradaLargura
     */
    render(render, camera, estradaLargura) {

        // const clip = 0;
        // const escala = 1 / camera.h;

        // render.drawSprite(
        //     this.sprite, camera, this, estradaLargura, escala,
        //     camera.tela.meioTela.x, camera.tela.height, clip,
        //     this.sprite.spritesInX, this.sprite.spritesInY
        // );
    }

}

export default Jogador;