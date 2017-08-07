(function () {

    'use strict';

    angular.module('market')        
        .controller('homeController', homeController)
        .component('home', {
            templateUrl: '../components/home/home.html',
            controller: 'homeController',
            controllerAs: 'vm'
        });

        homeController.$inject = ['homeService', '$q', '$state', 'DataFactory', 'ngDialog', 'localStorageService'];

        function homeController(homeService, $q, $state, DataFactory, ngDialog, localStorageService) {
            let vm = this;
            vm.data = DataFactory;            
            vm.carregando = true;            
           
            let init = () => {
                //Ao recarregar a pagina verifica se existe livros no carrinho
                //e se existe livros já carregados;
                if (vm.data.livros.length == 0) {
                    let livros = localStorageService.get('livros');                                                                    
                    let carrinho = localStorageService.get('carrinho');

                    if (carrinho) {
                        vm.data.carrinho = carrinho;
                    }
                    if (!livros) {
                        getLivros().then(livros => {
                            vm.data.livros = livros;
                        }).catch(err => {
                            $state.go('error-page');
                        })
                    } else {
                        vm.data.livros = livros;
                    }
                    vm.carregando = false;
                } else {                  
                    vm.carregando = false;  
                }
            }

            init();

            let salvarLocalStorage = () => {
                //Salva em cache os dados para não perder.
                localStorageService.set('livros', vm.data.livros);
                localStorageService.set('carrinho', vm.data.carrinho);
            }

            function getLivros() {
                let defer = $q.defer();
                
                homeService.getLivros().then(livros => {
                    defer.resolve(livros);
                }).catch(err => {
                    defer.reject(err);
                })

                return defer.promise;
            }          

            vm.adicionarCarrinho = (param, index) => {
                let count = 0;
                //Copia o objeto Livro
                let livroTemp = angular.copy(param);                
                //Seta a qtde 1, pois ao clicar no carrinho sempre adicionar 1;
                livroTemp.qtde = 1;                
                
                //Procura o produto no estoque;
                let livroEstoque = vm.data.livros.find( livro => { count++; return livro.id == param.id });

                if (livroEstoque.qtde > 0) {
                    livroEstoque.qtde--;

                    vm.data.livros.splice(count-1, 1, livroEstoque);

                    //Procura no carrinho se já existe um produto igual
                    let livroCarrinho = vm.data.carrinho.find(livro => {
                        return livro.id == livroTemp.id;
                    });

                    //Se existir soma +1 a qtde e recoloca no array.
                    //Se não adiciona o novo objeto ao array.
                    if (livroCarrinho) {
                        livroCarrinho.qtde ++;
                        vm.data.carrinho.splice(index,1,livroCarrinho);
                    } else {
                        vm.data.carrinho.push(livroTemp);
                    }
                    salvarLocalStorage();
                } else {                   
                    ngDialog.open({
                        template: '<div> Produto fora de estoque. </div>',
                        plain: true,
                        className: 'ngdialog-theme-default',
                        closeByDocument: true,
                        closeByEscape: true,
                        showClose: false
                    })
                    //Remover o focus do botão, pois ao aparecer o ngDialog
                    //O enter continua funcionando e isso pode causar muitos bugs.
                    document.getElementById('btn-adicionar-carrinho-' + index).blur();
                }               
            }
        }

})();