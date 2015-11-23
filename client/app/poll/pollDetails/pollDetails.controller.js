(function() {
    'use strict';

    angular
        .module('votingAppApp')
        .controller('PollDetailsCtrl', PollDetailsController);

    PollDetailsController.$inject = ['PollService', '$stateParams'];

    /* @ngInject */
    function PollDetailsController(PollService, $stateParams) {
        var vm = this;
        vm.poll = {};
        activate();

        ////////////////

        function activate() {
            PollService.getPoll($stateParams.pollId).then(function(poll) {
                vm.poll = poll;
            });
        }
    }
})();