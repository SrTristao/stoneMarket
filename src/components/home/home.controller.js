    angular.module('market')        
        .controller('homeController', homeController)
        .component('home', {
            templateUrl: '../components/home/home.html',
            controller: 'homeController',
            controllerAs: 'vm'
        });

        homeController.$inject = ['HTTPSERVICE', 'CONST', '$q','$timeout'];

        function homeController(HTTPSERVICE, CONST, $q, $timeout) {
            let vm = this;
            vm.livros = {};
            vm.carregando = true;

            let init = () => {
                getLivros().then(livros => {
                    $timeout(timeout => {
                        vm.livros = livros;
                        vm.carregando = false;
                    }, 1000);
                    
                });
            }

            init();

            function getLivros() {
                let defer = $q.defer();
                
                HTTPSERVICE.get(CONST.getLivros).then( livros => {
                    defer.resolve(livros);
                }).catch(err => { 
                    defer.reject(err) 
                });

                return defer.promise;
            }
        }