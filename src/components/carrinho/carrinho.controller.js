    angular.module('market')        
        .controller('carrinhoController', carrinhoController)
        .component('carrinho', {
            templateUrl: '../components/carrinho/carrinho.html',
            controller: 'carrinhoController',
            controllerAs: 'vm'
        });

        carrinhoController.$inject = [];

        function carrinhoController() {
            let vm = this;        
        }