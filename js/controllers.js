angular.module('starter.controllers', ['ionic', 'ngResource', 'ngSanitize', 'ionic.utils', 'chart.js'])
app.controller('AppCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    // .fromTemplate() method
    var template = '<ion-popover-view>' +
        '   <ion-header-bar>' +
        '       <h1 class="title">My Popover Title</h1>' +
        '   </ion-header-bar>' +
        '   <ion-content class="padding">' +
        '       My Popover Contents' +
        '   </ion-content>' +
        '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });


    $scope.groups = [];
    for (var i = 0; i < 1; i++) {
        $scope.groups[i] = {
            name: i,
            items: [],
            show: false
        };
    }

    /*
    * if given group is the selected group, deselect it
    * else, select the given group
    */
    $scope.toggleGroup = function (group) {
        group.show = !group.show;
    };
    $scope.isGroupShown = function (group) {
        return group.show;
    };


})
    .controller('LoginCtrl', function ($scope, $state, $window, $rootScope, $stateParams, $ionicPopup, $ionicLoading, $q, ProfileService) {
        $rootScope.toggledrag = false;
        $rootScope.islogin = false;
        $rootScope.show = false;
        $scope.setlogin = function () {
            $rootScope.islogin = true;
            $rootScope.show = true;
        }
        $scope.login = function (user_data) {
            console.log('call login');
            Backendless.UserService.login(user_data.username, user_data.password, true, new Backendless.Async(userLoggedInStatus, gotError));
        }

        function userLoggedInStatus(user) {
            $rootScope.islogin = true;
            console.log('logged user:', user);
            $rootScope.user_profile = user;
            ProfileService.get_profile(user.email).then(function (response) {
                if (response.data) {
                    console.log('Remote User data:', response.data.data);
                    $rootScope.user_profile = response.data.data;
                }
            });
            $window.location.reload(true);
            $state.go('app.home');
            
        }
        function gotError(err) { // see more on error handling
            var alertPopup = $ionicPopup.alert({
                title: 'Login Error!',
                template: '<center>' + err.message + '</center>'
            });
        }
        console.log('Load login page');

    })
    .controller('RegisterCtrl', function ($scope, $state, $window, $ionicPopup, $rootScope, $stateParams, ProfileService) {

        $scope.register = function (user_data) {
            user_data.customer_type = 'PERSONAL';
            var user = new Backendless.User();
            user['email'] = user_data.email;
            user['password'] = user_data.password;
            user['name'] = user_data.name;
            user['address'] = user_data.address;
            user['customer_type'] = user_data.customer_type;

            ProfileService.update_profile(user_data).then(function (response) {
                console.log('Profile Register: ', response.data);
            })
            console.log(Backendless.UserService.register(user, new Backendless.Async(userRegistered, gotErrorRegister)));
        }

        function gotErrorRegister(err) { // see more on error handling
            var alertPopup = $ionicPopup.alert({
                title: 'Register Error!',
                template: '<center>' + err.message + '</center>'
            });
            console.log("error message - " + err.message);
            console.log("error code - " + err.statusCode);
        }
        function userRegistered(user) {
            console.log("user has been registered");
            $state.go('app.login');
        }
    })

    .controller('SettingsCtrl', function($scope, $ionicPopup, $ionicActionSheet){
         //show actionsheet
            $scope.showActionsheet = function () {
                $ionicActionSheet.show({
                    	// titleText: 'ActionSheet Example',
                        buttons: [
                            { text: '<i class="icon ion-social-facebook"></i>Facebook' },
                            { text: '<i class="icon ion-social-twitter"></i>Twitter' },
                            { text: '<i class="icon ion-more"></i>More' }, 
                        ],
                        buttonClicked: function(index) {
                            // alert('BUTTON CLICKED' + index);
                            return true;
                        },
                        cancelText: 'Cancel',
                        cancel: function() {
                            console.log('CANCELLED');
                            }
                });
            }
         // An alert dialog
            $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'My Salon v. 1.0.0<br/>',
                template: '<center>Copyright 2016<br/>My Company, Inc.<br/>All rights reserved.</center>'
            });

            alertPopup.then(function (res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        };
    })
    .controller('ChatCtrl', function ($scope, $timeout, $ionicScrollDelegate) {
    })
    .controller('HomeCtrl', function ($scope, $state, $window, $rootScope, $stateParams) {
        if (!$rootScope.islogin) {
            $state.go('app.login');
        }
    })
    .controller('ScheduleCtrl', function ($scope, $state, $window, $rootScope, $stateParams) {
        if (!$rootScope.islogin) {
            $state.go('app.login');
        }
        $scope.calendar = true;
        $scope.hide = function(){
            $scope.calendar = true;
        };
        $scope.show = function (){
            $scope.calendar = false;
        };
        $("#newcalendar").ionCalendar({
            lang: "en",                     // language
            sundayFirst: false,             // first week day
            years: "15",                    // years diapason
            format: "DD/MM/YYYY",           // date format
            onClick: function (date) {        // click on day returns date
                console.log(date);
            }
        });
    });