(function () {

    'use strict';

    angular.module('market')        
        .controller('carrinhoController', carrinhoController)
        .component('carrinho', {
            templateUrl: '../components/carrinho/carrinho.html',
            controller: 'carrinhoController',
            controllerAs: 'vm'
        });

        carrinhoController.$inject = ['DataFactory', 'ngDialog', 'carrinhoService', 'localStorageService', '$state'];

        function carrinhoController(DataFactory, ngDialog, carrinhoService, localStorageService, $state) {
            let vm = this;  
            vm.data = DataFactory;
            vm.subtotal = 0;

            let calculaDesconto = () => {
                if (vm.cupom) {
                    vm.itensDesconto = 0; 
                    vm.desconto = 0; 
                    //Percorre todos os autores com desconto no cupom
                    vm.cupom.autores.forEach(autor => {
                            //Percorre todos os livros e aplica o desconto.
                            vm.desconto += vm.data.carrinho.reduce((tot, livro) => {
                                if (livro.autor === autor) {
                                    vm.itensDesconto++;
                                    return tot + ((livro.preco * livro.qtde)*vm.cupom.desconto)/100;
                                } else {
                                    return tot;
                                }                                
                            },0)
                        });
                }
            }

            let calculaSubTotal = () => {
                vm.subtotal = vm.data.carrinho.reduce((tot, livro) => {
                    return tot + (livro.qtde * livro.preco);
                }, 0);

                calculaDesconto();
            }

            let getLocalStorage = () => {
                if (vm.data.carrinho.length == 0) {
                   let carrinho = localStorageService.get('carrinho');                    
                   if(carrinho) {
                       vm.data.carrinho = carrinho;
                   }
                }

                if (!vm.cupom) {
                    vm.cupom = localStorageService.get('cupom');                    
                }
            }

            let init = () => {
                getLocalStorage();
                if (vm.data.carrinho) {
                    calculaSubTotal();
                }                
            }

            init();

            let salvarLocalStorage = () => {
                localStorageService.set('livros', vm.data.livros);
                localStorageService.set('carrinho', vm.data.carrinho);
            }           

            vm.aumentarQtde = (param) => {
                let count = 0;
                //Procura o livro no estoque
                let livroEstoque = vm.data.livros.find(livro => { count++; return livro.id == param.id} );
                //Se o estoque for maior que 0,
                //Remove 1, e adiciona 1 no carrinho
                if(livroEstoque.qtde > 0) {                    
                    livroEstoque.qtde --;
                    vm.data.livros.splice(count-1, 1, livroEstoque);
                    param.qtde ++;                    
                    calculaSubTotal();
                    salvarLocalStorage();
                }                                
            }

            vm.diminuirQtde = (param) => {
                if (param.qtde > 1) {
                    let count = 0;
                    //Procura o livro no estoque
                    let livroEstoque = vm.data.livros.find(livro => { count++; return livro.id == param.id} );
                    //Acrescenta 1 no estoque e remove 1 no carrinho
                    livroEstoque.qtde ++;                    
                    vm.data.livros.splice(count-1, 1, livroEstoque);
                    param.qtde --;
                    calculaSubTotal(); 
                    salvarLocalStorage();                   
                }                
            }

            vm.removerItem = (param ,index) => {
                let count = 0;
                //Procura o livro no estoque
                let livroEstoque = vm.data.livros.find(livro => { count++; return livro.id == param.id} );
                //Adiciona a quantidade total de volta para o estoque;
                livroEstoque.qtde += param.qtde;
                vm.data.livros.splice(count-1, 1, livroEstoque);
                //remove o item do carrinho;
                vm.data.carrinho.splice(index, 1);
                calculaSubTotal();
                salvarLocalStorage();
            }            

            vm.aplicarCupom = () => {

                carrinhoService.getCupom(vm.cupom.cupom).then(data => {
                    if (data) {                                              
                        vm.cupom = data;
                        calculaDesconto();
                        localStorageService.set('cupom', vm.cupom);
                    } else {      
                        localStorageService.remove('cupom');                  
                        ngDialog.open({
                            template: '<div> Cupom inválido. </div>',
                            plain: true,
                            className: 'ngdialog-theme-default',
                            closeByDocument: true,
                            closeByEscape: true,
                            showClose: false
                        });  
                        //Remover o focus do botão, pois ao aparecer o ngDialog
                        //O enter continua funcionando e isso pode causar muitos bugs.
                        document.getElementById('btn-aplicar-cupom').blur();
                        document.getElementById('input-aplicar-cupom').blur(); 
                        vm.cupom.cupom = '';
                    }
                }).catch(err => {
                    localStorageService.remove('cupom');
                    ngDialog.open({
                        template: '<div> Ocorreu um erro ao aplicar o cupom. </div>',
                        plain: true,
                        className: 'ngdialog-theme-default',
                        closeByDocument: true,
                        closeByEscape: true,
                        showClose: false
                    }); 
                    //Remover o focus do botão, pois ao aparecer o ngDialog
                    //O enter continua funcionando e isso pode causar muitos bugs.
                    document.getElementById('btn-aplicar-cupom').blur();
                    document.getElementById('input-aplicar-cupom').blur();
                    vm.cupom.cupom = '';
                });                            
            }

            vm.finalizarCompra = () => {
                ngDialog.open({
                    template: '<div>Compra finalizada com sucesso ! <br/> Obrigado por navegar no mktBook. </div>',
                    plain: true,
                    className: 'ngdialog-theme-default',
                    closeByDocument: true,
                    closeByEscape: true,
                    showClose: false
                });
                localStorageService.remove('livros');
                localStorageService.remove('carrinho');
                localStorageService.remove('cupom');
                vm.data.carrinho = [];
                vm.data.livros = [];
                $state.go('/');
            }
            
        }
    
})();