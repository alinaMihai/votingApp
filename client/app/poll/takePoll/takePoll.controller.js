(function() {
    'use strict';

    angular
        .module('votingAppApp')
        .controller('TakePollCtrl', TakePollController);

    TakePollController.$inject = ['PollService', '$stateParams', '$state'];

    /* @ngInject */
    function TakePollController(PollService, $stateParams, $state) {
        var vm = this;
        vm.poll = {};
        vm.choice = {};
        vm.takePoll = takePoll;
        activate();

        ////////////////

        function activate() {
            PollService.getPoll($stateParams.pollId).then(function(poll) {
                vm.poll = poll;
            });
        }

        function takePoll() {
            PollService.takePoll(vm.choice).then(function() {
                console.log(vm.choice);
                //change location to details
                $state.go('pollDetails', {
                    'pollId': vm.poll._id
                });
                //register poll in localstorage, don't allow user to take same poll twice
                var storedPolls = localStorage["polls"] ? JSON.parse(localStorage["polls"]) : [];
                storedPolls.push(vm.poll._id);
                localStorage["polls"] = JSON.stringify(storedPolls);
            }, function(error) {
                $state.go('allPolls');
            });
        }
    }
})();