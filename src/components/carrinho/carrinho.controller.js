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

            let calculaSubTotal = () => {
                vm.subtotal = vm.data.carrinho.reduce((tot, livro) => {
                    return tot + (livro.qtde * livro.preco);
                }, 0);
            }

            let getLocalStorage = () => {
                if (vm.data.carrinho.length == 0) {
                    let carrinho = localStorageService.get('carrinho');
                    if (carrinho) {
                        vm.data.carrinho = carrinho;
                    }
                }

                if(vm.data.livros.length == 0) {
                    let livros = localStorageService.get('livros');
                    if(livros) {
                        vm.data.livros = livros;
                    }
                }
            }

            let init = () => {
                getLocalStorage();
                calculaSubTotal();                
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
                carrinhoService.getCupom(vm.cupom).then(data => {
                    if (data) {
                        vm.itensDesconto = 0;
                        vm.desconto = 0;
                        data.autores.forEach(autor => {
                            vm.data.carrinho.forEach(param => {
                                if (param.autor == autor) {
                                    vm.itensDesconto++;
                                    vm.desconto += ((param.preco * param.qtde)*data.desconto)/100;
                                } else {
                                    console.log('sei la');
                                }

                            })
                        });

                        vm.subtotal -= vm.desconto;
                    } else {
                        ngDialog.open({
                            template: '<div> Cupom inválido. </div>',
                            plain: true,
                            className: 'ngdialog-theme-default',
                            closeByDocument: true,
                            closeByEscape: true,
                            showClose: false
                        });
                    }
                });                
                vm.cupom = '';
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
                vm.data.carrinho = [];
                vm.data.livros = [];
                $state.go('/');
            }
            
        }