
    const staticRoot = 'http://127.0.0.1:3131/api/';
    angular.module('market')
        .constant('CONST', {
            
            getLivros: staticRoot,
            getById: staticRoot.concat('findById'),
            adicionarLivro: staticRoot.concat('adicionar'),
            deleteLivro: staticRoot.concat('remover')

        })