(function () {

    'use strict';

    angular.module('market')
        .controller('headerController', headerController)
        .component('mktHeader', {
                templateUrl: '../components/partials/header/header.html',
                controller: 'headerController',
                controllerAs: 'vm'
            });

        headerController.$inject = ['$state', 'DataFactory', 'ngDialog'];

        function headerController($state, DataFactory, ngDialog) {
            let vm = this;
            vm.data = DataFactory; 
            
            vm.carrinhoContador = () => {
                return vm.data.carrinho.reduce((tot,livro) => {
                    return tot + livro.qtde;
                }, 0)
            }            
            vm.goCarrinho = () => {            
                $state.go('carrinho');                         
            }

            vm.goInicio = () => {            
                $state.go('/');            
            }              

        }
    
})();