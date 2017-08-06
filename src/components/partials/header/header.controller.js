angular.module('market')
    .controller('headerController', headerController)
    .component('mktHeader', {
            templateUrl: '../components/partials/header/header.html',
            controller: 'headerController',
            controllerAs: 'vm'
        });

    headerController.$inject = ['$state', 'DataFactory'];

    function headerController($state, DataFactory) {
        let vm = this;
        vm.data = DataFactory;
        //functions
        vm.goCarrinho = _goCarrinho;
        vm.goInicio = _goInicio;
        vm.goSobre = _goSobre;
        vm.lupa = _lupa;

        //var        
        console.log(vm.checkButton);
        function _goCarrinho() {
            vm.data.checkButton = 'carrinho';
            $state.go('carrinho');            
        }

        function _goInicio() {
            vm.data.checkButton = 'inicio';
            $state.go('/');            
        }

        function _goSobre() {
            vm.data.checkButton = 'sobre';
        }

        function _lupa() {
            vm.data.checkButton = 'search';
        }

    }