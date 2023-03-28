class Render {

    /**
    *
    * @param {CanvasRenderingContext2D} ctx
    */

    constructor(ctx) {

        this.ctx = ctx;
    }

    clear(x, y, w, h) {
        this.ctx.clearRect(x, y, w, h);
    }

    save() {
    this.ctx.save();
    }

    restore() {
    this.ctx.restore();
    }

    drawTrapezium(x1, y1, w1, x2, y2, w2, color = 'green') {
        
        this.drawPolygon(color, x1 - w1, y1, x1 + w1, y1, x2 + w2, y2, x2 - w2, y2);
    }

    drawPolygon(cor, ...coords) {

        if (coords.length > 1) {
            
            const { ctx } = this;

            ctx.save();
            ctx.fillStyle = cor;
            ctx.beginPath();
            ctx.moveTo(coords[0], coords[1]);

            for (let index = 2; index < coords.length; index += 2) {
                
                ctx.lineTo(coords[index], coords[(index + 1) % coords.length]);
                
            }

            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    // drawImage(imagem, x, y, width, height) {

    //     this.ctx.drawImage(imagem, x, y, width, height)
    // }

}

export default Render