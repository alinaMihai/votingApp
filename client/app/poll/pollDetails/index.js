'use strict';

angular.module('votingAppApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('pollDetails', {
                url: '/myPolls/:pollId',
                templateUrl: 'app/poll/pollDetails/pollDetails.html',
                controller: 'PollDetailsCtrl as vm'
            });
    });