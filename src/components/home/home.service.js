(function () {

    'use strict';

    angular.module('market')        
        .service('homeService', homeService)        

        homeService.$inject = ['HTTPSERVICE', 'CONST', '$q'];

        function homeService( HTTPSERVICE, CONST, $q) {
            let vm = this;             
            
            vm.getLivros = () => {
                let defer = $q.defer();

                HTTPSERVICE.get(CONST.getLivros).then(data => {                    
                    defer.resolve(data);
                }).catch(err => { 
                    defer.reject(err)
                });

                return defer.promise;
            }
        }
    
})();