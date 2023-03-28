class Recurso {

    // Um Map é criado e atribuído à propriedade privada #cache.
    #cache = new Map;
    // Um array vazio é atribuído à propriedade privada #list.
    #lista = [];

    // Método add é definido.
    add(nome, url) {

        // Se o método add for chamado com dois argumentos, um objeto com as propriedades nome e url é adicionado à #lista.
        if (arguments.length === 2) {
            
            this.#lista.push({

                nome, url
            });
            
            // Se o método add for chamado com um argumento, um objeto com a propriedade name e a url igual ao argumento é adicionado à #list.
        } else if (arguments.length == 1) {
            
            this.#lista.push({

                nome, url
            });
        }

        // O método add retorna a instância de Recursos para permitir o encadeamento.
        return this;
    }

    // Método get é definido.
    get cache() {

        // O método cache retorna a propriedade privada #cache.
        return this.#cache;
    }

    // Método get é definido.
    get (res) {

        // O método get verifica se o recurso está armazenado no cache. Se sim, retorna o recurso, senão retorna null.
        return this.cache.get(res) || null;
    }

    // Método load é definido.
    load(callback) {

        // Se a lista de recursos #lista tem pelo menos um item, o último item é removido e um novo objeto Imagem é criado.
        if (this.#lista.length > 0) {
            
            const res = this.#lista.pop();
            const imagem = new Image;

            // Quando o objeto Image carrega a imagem, ela é armazenada no cache com o nome do 
            // recurso e o método load é chamado novamente para continuar carregando os recursos restantes.
            imagem.onload = () => {

                this.cache.set(res.nome, imagem);
                this.load(callback);
            };
            // A url do recurso é definida como a fonte da imagem.
            imagem.src = res.url;

        // Quando todos os recursos foram carregados, o método de retorno de chamada é chamado, se fornecido.
        } else if (callback) {
            
            callback(this);
        }

    }
}

export default Recurso