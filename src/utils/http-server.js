angular.module('market')
    .service('HTTPSERVICE', HTTPSERVICE);

    HTTPSERVICE.$inject = ['$http', '$q'];

    function HTTPSERVICE($http, $q) {        
        var vm = this;
        vm.get = _get;
        vm.post = _post;
        vm.delete = _delete;

        function _get(url) {
            var defer = $q.defer();

            $http.get(url).then(function(data) {
                defer.resolve(data.data);
            }, function(err) {
                defer.reject(err);
            })

            return defer.promise;
        }

        function _post(url, params) {
            var defer = $q.defer();
            $http.post(url, params).then(function(data) {
                defer.resolve(data.data);
            }, function(err) {
                defer.reject(err);
            });
            return defer.promise;
        }

        function _delete(url) {
            var defer = $q.defer();
            $http.delete(url).then(function(data) {
                defer.resolve(data);
            }, function(err) {
                defer.reject(err);
            });
            return defer.promise;
        }
    }