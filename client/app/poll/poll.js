'use strict';

angular.module('votingAppApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('myPolls', {
                url: '/myPolls',
                templateUrl: 'app/poll/myPolls.html',
                controller: 'PollCtrl as vm'
            });
    });