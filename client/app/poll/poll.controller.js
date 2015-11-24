(function() {
    'use strict';

    angular
        .module('votingAppApp')
        .controller('PollCtrl', PollController);

    PollController.$inject = ['$uibModal', 'PollService'];

    /* @ngInject */
    function PollController($uibModal, PollService) {
        var vm = this;
        vm.myPolls = [];
        vm.openCreatePollModal = openCreatePollModal;
        vm.deletePoll = deletePoll;
        activate();

        ////////////////

        function activate() {
            PollService.getUserPolls().then(function(polls) {
                vm.myPolls = polls;
            })
        }

        function openCreatePollModal(size) {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/poll/createPollModal.html',
                size: size,
                controller: 'ModalInstanceCtrl as modalCtrl',
                resolve: {
                    data: function() {
                        return {
                            description: '',
                            options: []
                        };
                    }
                }
            });

            modalInstance.result.then(function(data) {
                data.options = data.options.filter(function(option) {
                    return option.text !== "";
                });
                createPoll(data);
            }, function() {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function createPoll(pollObj) {
            PollService.createPoll(pollObj).then(function(poll) {
                vm.myPolls.push(poll);
            });
        }

        function deletePoll(poll) {
            PollService.deletePoll(poll).then(function(poll) {
                var index = vm.myPolls.indexOf(poll);
                vm.myPolls.splice(index, 1);
            });
        }


    }
})();