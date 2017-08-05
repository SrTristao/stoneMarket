
    angular
        .module('market')
        .config(ConfigProvider)
        .run(function () {    
        });

    ConfigProvider.$inject = ['$urlRouterProvider', '$stateProvider'];

    function ConfigProvider($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: '../modules/home/home.html'                
            })

            .state('carrinho', {
                url: '/carrinho',
                templateUrl: '../modules/carrinho/carrinho.html'                
            });            
    }