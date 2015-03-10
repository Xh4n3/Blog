//angular.module('markdown',[]).config(function (markdownProvider) {
//    markdownProvider.config({
//        extensions: ['table']
//    });
//});

var zoneApp = angular.module('zoneApp', ['ngRoute', 'zoneCtrl', 'markdown'], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});
zoneApp.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://m1.music.126.net/**'
  ]);
});
zoneApp.config(['$routeProvider',
              function ($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'home',
            controller: 'homepageCtrl'
        }).
        when('/post/id/:postid', {
            templateUrl: '/post/show',
            controller: 'postshowCtrl'
        }).
        otherwise({
            redirectTo: '/error'
        });
  }]);
zoneApp.filter('fromNow', function () {
    return function (date) {
        return moment(date).fromNow();
    }
});

zoneApp.factory('searchMusic', function ($http, $q) {
    var _keyword = '';

    service.setkeyword = function (keyword) {
        _keyword = keyword;
    };
    service.search = function () {
        var deferred = $q.defer();
        $http.post('/search/json', {
            keyword: _keyword
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject('error');
        })
        return deferred.promise;
    };
    return service;
});