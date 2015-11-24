(function() {
    'use strict';

    angular
        .module('votingAppApp')
        .controller('AllPollsCtrl', AllPollsController);

    AllPollsController.$inject = ['PollService', 'Auth'];

    /* @ngInject */
    function AllPollsController(PollService, Auth) {
        var vm = this;
        var currentUser = Auth.getCurrentUser();
        vm.allPolls = [];
        vm.isLoggedIn = Auth.isLoggedIn();
        vm.isAreadyTaken = isAreadyTaken;

        var storedPolls = localStorage["polls"] ? JSON.parse(localStorage["polls"]) : currentUser.polls;

        activate();

        ////////////////

        function activate() {
            PollService.getAllPolls().then(function(polls) {
                vm.allPolls = polls;
            });
            console.log(currentUser);
}
        function isAreadyTaken(pollId) {

            if (storedPolls.indexOf(pollId) !== -1) {
                return true;
            }
        }
    }
})();