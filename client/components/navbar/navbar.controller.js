'use strict';

angular.module('votingAppApp')
    .controller('NavbarCtrl', function($scope, $location, Auth) {
        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        }, {
            'title': 'My Polls',
            'link': '/myPolls'
        }, {
            'title': 'All Polls',
            'link': '/allPolls'
        }];

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function() {
            Auth.logout();
            localStorage.removeItem('polls');
            $location.path('/login');
        };

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });