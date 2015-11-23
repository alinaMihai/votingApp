'use strict';

angular.module('votingAppApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('allPolls', {
                url: '/allPolls',
                templateUrl: 'app/poll/allPolls/allPolls.html',
                controller: 'AllPollsCtrl as vm'
            });
    });