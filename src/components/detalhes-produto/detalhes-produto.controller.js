    angular.module('market')        
        .controller('detalhesController', detalhesController)
        .component('detalhesProduto', {
            templateUrl: '../components/detalhes-produto/detalhes-produto.html',
            controller: 'detalhesController',
            controllerAs: 'vm'
        });

        detalhesController.$inject = ['$stateParams', '$state'];

        function detalhesController($stateParams, $state) {
            let vm = this;            
            
            let init = () => {
                if ($stateParams.livro == null)
                    $state.go('/')
                else
                    vm.livro = $stateParams.livro;
            }

            init();
        }