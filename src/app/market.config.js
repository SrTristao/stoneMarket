
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
            });            
    }