class LidarComEntrada {

    constructor() {

        const telaCheiaBtn = document.getElementById('telaCheiaBtn');

        telaCheiaBtn.addEventListener('click', (event) => LidarComEntrada.alternarParaModoTelaCheia(event));

        const pausarBtn = document.querySelector('#pausarBtn');
        pausarBtn.addEventListener('click', (event) => this.pause(event));

        const moverBtn = document.querySelectorAll('button');

        window.addEventListener('keydown', (event) => this.handler(event));
        window.addEventListener('keyup', (event) => this.handler(event));
        window.addEventListener('keypress', (event) => this.handler(event));

        moverBtn.forEach((button) => {

            if (button.name !== 'telaCheiaBtn') {

                button.addEventListener('contextmenu', (event) => event.preventDefault());
                button.addEventListener('touchstart', (event) => this.event.handler(event));
                button.addEventListener('touchend', (event) => this.event.handler(event));
                
            }
        });

        this.map = {};
        this.mapPress = { p: true, enter: false };
    }

    pause(e) {

        const pausaBtn = document.querySelector('#pausarBtn');
        pausaBtn.classList.toggle('off');

        if (!window.navigator.maxTouchPoints && e.type !== 'keypress') {
            
            this.mapPress.p = !this.mapPress.p;
        }
    }

    /**
     *
     * @param {KeyboardEvent} event
     */

    handler(event) {

        if (event.type === 'keypress') {
            
            const key = event.key.toLowerCase();

            if(!event.repeat) {

                this.mapPress[key] = !this.mapPress[key];

                if (event.key === 'p') {
                    
                    this.pause(event);
                }
            }
        } else if (event.type === 'keyup' || event.type === 'keydown') {
            
            const key = event.key.toLowerCase();
            this.map[key] = event.type === 'keydown';
        }

        if ((event.target.name !== 'p') && (event.type === 'touchstart' || event.type === 'touchend')) {
            
            const key = event.target.name;

            this.map[key] = event.type === 'touchstart';
            this.mapPress[key] = event.type === 'touchend';
        }

        if(event.target.name === 'p' && event.type === 'touchend') {

            this.mapPress.p = !this.mapPress.p;
        }
    }

    isKeyDown(key) {
        
        return Boolean(this.map[key.toLowerCase()]);
    }


    static alternarParaModoTelaCheia() {

        const jogoContainer = document.querySelector('.container');

        if (!document.fullscreenElement) {
            
            jogoContainer.requestFullscreen().catch((err) => {

                alert(`Erro, não é possível ativar a tela cheia ${err.message}`)
            });

        } else {

            document.exitFullscreen();
        }
    }

}

export default LidarComEntrada;