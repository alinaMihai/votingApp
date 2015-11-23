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
        vm.data = [];
        vm.labels = [];
        vm.voters = [];

        activate();

        ////////////////

        function activate() {
            PollService.getPoll($stateParams.pollId).then(function(poll) {
                vm.poll = poll;
                getGraphData();
            });

        }

        function getGraphData() {
            var voters = [];
            _.each(vm.poll.options, function(option) {
                vm.data.push(option.vots || 0);
                vm.labels.push(option.text);
                voters.push(option.voters);
            });
            vm.voters = [].concat.apply([], voters);
        }
    }
})();