
angular.module('market')
    .controller('marketController', marketController);

    marketController.$inject = ['DataFactory'];

    function marketController(DataFactory) {
        let vm = this;
        vm.data = DataFactory;
        
        vm.data.checkButton = 'inicio';
    }
