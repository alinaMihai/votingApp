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
        activate();

        ////////////////

        function activate() {
            PollService.getAllPolls().then(function(polls) {
                vm.allPolls = polls;
            });
        }
    }
})();