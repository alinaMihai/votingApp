(function() {
    'use strict';

    angular
        .module('votingAppApp')
        .controller('TakePollCtrl', TakePollController);

    TakePollController.$inject = ['PollService', '$stateParams', '$state', 'Auth'];

    /* @ngInject */
    function TakePollController(PollService, $stateParams, $state, Auth) {
        var vm = this;
        vm.poll = {};
        vm.choice;
        vm.takePoll = takePoll;
        var currentUser = Auth.getCurrentUser();
        activate();

        ////////////////

        function activate() {
            PollService.getPoll($stateParams.pollId).then(function(poll) {
                vm.poll = poll;
            });
        }

        function takePoll() {
            if (vm.choice !== undefined) {
                PollService.takePoll(vm.choice).then(function() {
                    //change location to details
                    $state.go('pollDetails', {
                        'pollId': vm.poll._id
                    });
                    //register poll in localstorage, don't allow user to take same poll twice
                    var storedPolls = localStorage["polls"] ? JSON.parse(localStorage["polls"]) : currentUser.polls;
                    storedPolls.push(vm.poll._id);
                    localStorage["polls"] = JSON.stringify(storedPolls);
                }, function(error) {
                    $state.go('allPolls');
                });
            }

        }
    }
})();