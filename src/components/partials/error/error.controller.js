
(function () {

    'use strict';
    angular.module('market')
        .controller('errorController', errorController)
        .component('mktError', {
                templateUrl: '../components/partials/error/error.html',
                controller: 'errorController',
                controllerAs: 'vm'
            });

        errorController.$inject = [];

        function errorController() {

        }

})();