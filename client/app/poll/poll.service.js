(function() {
    'use strict';

    angular
        .module('votingAppApp')
        .service('PollService', PollService);

    PollService.$inject = ['$http', '$q', 'logger'];

    /* @ngInject */
    function PollService($http, $q, logger) {
        this.createPoll = createPoll;
        this.getUserPolls = getUserPolls;
        this.deletePoll = deletePoll;
        this.getPoll = getPoll;
        this.getAllPolls = getAllPolls;
        this.takePoll = takePoll;

        ////////////////

        function createPoll(pollObj) {
            var deferred = $q.defer();
            $http.post('/api/polls/',
                pollObj).then(function(response) {
                deferred.resolve(response.data);
                logger.success("The poll was successfully created", response.data, "Success");
            }, function(response) {
                console.log("error", response);
            });
            return deferred.promise;
        }

        function getUserPolls() {
            var deferred = $q.defer();
            $http.get('/api/polls/myPolls').then(function(response) {
                deferred.resolve(response.data);
            }, function(response) {
                console.log("error", response);
            });
            return deferred.promise;
        }

        function getAllPolls() {
            var deferred = $q.defer();
            $http.get('/api/polls').then(function(response) {
                deferred.resolve(response.data);
            }, function(response) {
                console.log("error", response);
            });
            return deferred.promise;
        }

        function getPoll(pollId) {
            var deferred = $q.defer();
            $http.get('/api/polls/' + pollId).then(function(response) {
                deferred.resolve(response.data);
            }, function(response) {
                console.log("error", response);
            });
            return deferred.promise;
        }

        function deletePoll(poll) {
            var deferred = $q.defer();
            $http.delete('/api/polls/' + poll._id).then(function(response) {
                deferred.resolve();
                logger.success("Poll successfully deleted", null, "Poll Deleted");
            });
            return deferred.promise;
        }

        function takePoll(optionId) {
            var deferred = $q.defer();
            $http.post('/api/options/' + optionId).then(function(response) {
                deferred.resolve();
                logger.success("Thank you for taking this poll", null, "Choice registered");
            }, function(error) {
                console.log(error);
            });
            return deferred.promise;
        }

    }
})();