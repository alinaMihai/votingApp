(function() {
    'use strict';

    angular
        .module('votingAppApp')
        .controller('TakePollCtrl', TakePollController);

    TakePollController.$inject = ['PollService', '$stateParams'];

    /* @ngInject */
    function TakePollController(PollService, $stateParams) {
        var vm = this;
        vm.poll = {};
        vm.choice = {};
        activate();

        ////////////////

        function activate() {
            PollService.getPoll($stateParams.pollId).then(function(poll) {
                vm.poll = poll;
            });
        }

        function takePoll() {

        }
    }
})();