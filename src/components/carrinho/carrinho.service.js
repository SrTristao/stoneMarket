    angular.module('market')        
        .service('carrinhoService', carrinhoService)        

        carrinhoService.$inject = ['HTTPSERVICE', 'CONST', '$q'];

        function carrinhoService( HTTPSERVICE, CONST, $q) {
            let vm = this;             
            
            vm.getCupom = (cupom) => {
                let defer = $q.defer();

                HTTPSERVICE.get(CONST.getCupom + `?cupom=${cupom}`).then(data => {                    
                    defer.resolve(data);
                }).catch(err => { 
                    defer.reject(err)
                });

                return defer.promise;
            }
        }