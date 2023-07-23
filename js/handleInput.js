class HandleInput {

    constructor() {

      // Adiciona ouvintes de eventos para os eventos 'keydown', 'keyup' e 'keypress'
      window.addEventListener('keydown', (event) => this.handler(event));
      window.addEventListener('keyup', (event) => this.handler(event));
      window.addEventListener('keypress', (event) => this.handler(event));
  
      // Cria um objeto vazio para mapear as teclas pressionadas
      this.map = {};

      // Cria um objeto para mapear as teclas pressionadas que 
      // precisam de verificação de pressionamento único
      this.mapPress = { p: true, enter: false };
    }
  
  
    /**
     * Trata o evento de entrada de teclado
     * @param {KeyboardEvent} event
     */
    handler(event) {

      // Verifica se o evento é do tipo 'keypress'
      if (event.type === 'keypress') {

        // Obtém a tecla pressionada em letras minúsculas
        const key = event.key.toLowerCase();

        // Verifica se o evento não é um evento de repetição
        if (!event.repeat) {

          // Define o estado da tecla no objeto 'mapPress' para 
          // indicar se ela está pressionada ou não
          this.mapPress[key] = !this.mapPress[key];

          // Verifica se a tecla pressionada é 'p' e pausa o jogo se for
          if (event.key === 'p') {
            this.pause(event);
          }
        }

      } else if (event.type === 'keyup' || event.type === 'keydown') {

        // // Obtém a tecla pressionada em letras minúsculas
        // const key = event.key.toLowerCase();

        // // Define o estado da tecla no objeto 'map' para indicar se 
        // // ela está pressionada ou não
        // this.map[key] = event.type === 'keydown';
      }

      // // Verifica se o evento é do tipo 'touchstart' ou 'touchend' e a tecla não é 'p'
      // if ((event.target.name !== 'p') && (event.type === 'touchstart' || event.type === 'touchend')) {

      //   // Obtém o nome do alvo do evento touch
      //   const key = event.target.name;

      //   // Define o estado da tecla no objeto 'map' com base no tipo de evento touch
      //   this.map[key] = event.type === 'touchstart';

      //   // Define o estado da tecla no objeto 'mapPress' com base no tipo de evento touch
      //   this.mapPress[key] = event.type === 'touchend';
      // }

      // // Verifica se o evento é do tipo 'touchend' e a tecla é 'p', alterando o 
      // // estado do pressionamento do botão 'p'
      // if (event.target.name === 'p' && event.type === 'touchend') {
      //   this.mapPress.p = !this.mapPress.p;
      // }
    }
  }
  
  export default HandleInput;
  