'use strict';

angular.module('votingAppApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('takePoll', {
                url: '/takePoll/:pollId',
                templateUrl: 'app/poll/takePoll/takePoll.html',
                controller: 'TakePollCtrl as vm'
            });
    });