
    angular
        .module('market')
        .config(ConfigProvider)
        .config(ConfigLocalStorage)
        .run(function () {    
        });

    ConfigProvider.$inject = ['$urlRouterProvider', '$stateProvider'];

    function ConfigProvider($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('/', {
                url: '/',
                views: {
                    'header': {
                        template: '<mkt-header></mkt-header>'
                    },
                    'body': {
                        template: '<home></home>'
                    },                    
                    'footer': {
                        template: '<mkt-footer></mkt-footer>'
                    }
                }
            })
            .state('carrinho', {
                url: '/carrinho',
                views: {
                'header': {
                        template: '<mkt-header></mkt-header>'
                    },
                    'body': {
                        template: '<carrinho></carrinho>'
                    },                    
                    'footer': {
                        template: '<mkt-footer></mkt-footer>'
                    }  
                }              
            })
            .state('detalhes-produto', {
                url: '/detalhes-produto',
                params: {livro: null},
                views: {
                'header': {
                        template: '<mkt-header></mkt-header>'
                    },
                    'body': {
                        template: '<detalhes-produto></detalhes-produto>'
                    },                    
                    'footer': {
                        template: '<mkt-footer></mkt-footer>'
                    }  
                }                          
            });            
    }

    ConfigLocalStorage.$inject = ['localStorageServiceProvider'];

    function ConfigLocalStorage(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('market');
    }