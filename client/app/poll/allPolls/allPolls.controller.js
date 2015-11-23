(function() {
    'use strict';

    angular
        .module('votingAppApp')
        .controller('AllPollsCtrl', AllPollsController);

    AllPollsController.$inject = ['PollService'];

    /* @ngInject */
    function AllPollsController(PollService) {
        var vm = this;
        vm.allPolls = [];
        vm.isAreadyTaken = isAreadyTaken;
        var storedPolls = localStorage["polls"] ? JSON.parse(localStorage["polls"]) : [];

        activate();

        ////////////////

        function activate() {
            PollService.getAllPolls().then(function(polls) {
                vm.allPolls = polls;
            });
        }

        function isAreadyTaken(pollId) {

            if (storedPolls.indexOf(pollId) !== -1) {
                return true;
            }
        }
    }
})();