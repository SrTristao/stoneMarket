(function () {

    'use strict';
    angular.module('market')
        .service('HTTPSERVICE', HTTPSERVICE);

        HTTPSERVICE.$inject = ['$http', '$q'];

        function HTTPSERVICE($http, $q) {        
            let vm = this;        

            vm.get = (url) => {
                var defer = $q.defer();

                $http.get(url).then(function(data) {
                    defer.resolve(data.data);
                }, function(err) {
                    defer.reject(err);
                })

                return defer.promise;
            }

            vm.post = (url, params) => {
                var defer = $q.defer();
                $http.post(url, params).then(function(data) {
                    defer.resolve(data.data);
                }, function(err) {
                    defer.reject(err);
                });
                return defer.promise;
            }

            vm.delete = (url) => {
                var defer = $q.defer();
                $http.delete(url).then(function(data) {
                    defer.resolve(data);
                }, function(err) {
                    defer.reject(err);
                });
                return defer.promise;
            }
        }

})();