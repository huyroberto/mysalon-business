// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material','dataServices','ngCordova','BackendServices','ui.calendar', 'ui.bootstrap']);
app.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el) {
            $rootScope.hideTabs = true;
            $scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
});
app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
app.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top
    $ionicConfigProvider.navBar.alignTitle('center');

}]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    
    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            }
        }
    })
    
    .state('app.login', {
        url: '/login',
        views: {
            'menuContent':{
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            }
            
        }    
    })
    
    .state('app.register', {
        url: '/register',
        views: {
            'menuContent':{
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            }
        }    
    })
    
     .state('app.schedule', {
        url: '/schedule',
        views: {
            'menuContent': {
                templateUrl: 'templates/schedule.html',
                controller: 'ScheduleCtrl'
            }
        }
    })
    .state('app.messager', {
        url: '/messager',
        views: {
            'menuContent': {
                templateUrl: 'templates/messager.html',
                // controller: 'MysalonCtrl'
            }
        }
    })

    .state('app.chat', {
        url: '/chat',
        views: {
            'menuContent': {
                templateUrl: 'templates/chat.html',
                controller: 'ChatCtrl'
            }
        }
    })

    .state('app.setting', {
        url: '/setting',
        views: {
            'menuContent': {
                templateUrl: 'templates/setting.html',
                controller: 'SettingsCtrl'
            }
        }
    })

    .state('app.addreservation', {
        url: '/add-reservation',
        views: {
            'menuContent': {
                templateUrl: 'templates/addreservation.html',
                controller: 'AddreservationCtrl'
            }
        }
    })

    .state('app.addclient', {
        url: '/add-client',
        views: {
            'menuContent': {
                templateUrl: 'templates/addclient.html',
                // controller: 'MysalonCtrl'
            }
        }
    })

    .state('app.qrcode', {
        url: '/qr-code',
        views: {
            'menuContent': {
                templateUrl: 'templates/add-client/qr.html',
                controller: 'QRCtrl'
            }
        }
    })

    .state('app.shake', {
        url: '/shake-it',
        views: {
            'menuContent': {
                templateUrl: 'templates/add-client/shake.html',
                controller: 'ShakeCtrl'
            }
        }
    })

    .state('app.manually', {
        url: '/manually',
        views: {
            'menuContent': {
                templateUrl: 'templates/add-client/manually.html',
                controller: 'ManuallyCtrl'
            }
        }
    })

    .state('app.myprofile', {
        url: '/my-profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/setting/myprofile.html',
                controller: 'MyProfileCtrl'
            }
        }
    })
     .state('app.mymenu', {
        url: '/my-menu',
        views: {
            'menuContent': {
                templateUrl: 'templates/setting/mymenu.html',
                controller: 'MyMenuCtrl'
            }
        }
    })
    .state('app.download', {
        url: '/download-data',
        views: {
            'menuContent': {
                templateUrl: 'templates/download.html',
                // controller: 'MysalonCtrl'
            }
        }
    })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
