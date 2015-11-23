(function() {
    'use strict';

    angular
        .module('votingAppApp')
        .controller('ModalInstanceCtrl', Controller);

    Controller.$inject = ['$uibModalInstance', 'data'];

    /* @ngInject */
    function Controller($uibModalInstance, data) {
        var vm = this;
        vm.data = data;
        vm.ok = okHandler;
        vm.cancel = cancelHandler;

        function okHandler() {
            $uibModalInstance.close(data);
        }

        function cancelHandler() {
            $uibModalInstance.dismiss('cancel');
        }
    }

})();