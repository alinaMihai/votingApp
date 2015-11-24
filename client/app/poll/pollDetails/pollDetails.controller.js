(function() {
    'use strict';

    angular
        .module('votingAppApp')
        .controller('PollDetailsCtrl', PollDetailsController);

    PollDetailsController.$inject = ['PollService', '$stateParams', '$uibModal', '$location'];

    /* @ngInject */
    function PollDetailsController(PollService, $stateParams, $uibModal, $location) {
        var vm = this;
        vm.poll = {};
        vm.data = [];
        vm.openCopyPollUrl = openCopyPollUrl;
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

        function openCopyPollUrl(size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/poll/pollDetails/urlTakePoll.html',
                size: size,
                controller: 'ModalInstanceCtrl as modalCtrl',
                resolve: {
                    data: function() {
                        return {
                            url: $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/takePoll/' + vm.poll._id

                        };
                    }
                }
            });

        }
    }
})();