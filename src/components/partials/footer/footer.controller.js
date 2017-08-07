
(function () {

    'use strict';
    angular.module('market')
        .controller('footerController', footerController)
        .component('mktFooter', {
                templateUrl: '../components/partials/footer/footer.html',
                controller: 'footerController',
                controllerAs: 'vm'
            });

        footerController.$inject = [];

        function footerController() {

        }

})();