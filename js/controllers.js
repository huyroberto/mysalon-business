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
    .controller('SettingsCtrl', function ($scope, $ionicPopup, $ionicActionSheet) {
        //show actionsheet
        $scope.showActionsheet = function () {
            $ionicActionSheet.show({
                // titleText: 'ActionSheet Example',
                buttons: [
                    { text: '<i class="icon ion-social-facebook"></i>Facebook' },
                    { text: '<i class="icon ion-social-twitter"></i>Twitter' },
                    { text: '<i class="icon ion-more"></i>More' },
                ],
                buttonClicked: function (index) {
                    // alert('BUTTON CLICKED' + index);
                    return true;
                },
                cancelText: 'Cancel',
                cancel: function () {
                    console.log('CANCELLED');
                }
            });
        }
        // An alert dialog
        $scope.showAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'My Salon v. 1.0.0<br/>',
                template: '<center>Copyright 2016<br/>My Company, Inc.<br/>All rights reserved.</center>'
            });

            alertPopup.then(function (res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        };
    })
    .controller('QRCtrl', function ($scope, $timeout, $ionicScrollDelegate) {
        $scope.QR = true;
        $scope.hide = function () {
            $scope.QR = true;
        };
        $scope.show = function () {
            $scope.QR = false;
        };
    })
    .controller('ShakeCtrl', function ($scope, $timeout, $ionicScrollDelegate) {
        $scope.shake = true;
        $scope.hide = function () {
            $scope.shake = false;
        };
    })
    .controller('ChatCtrl', function ($scope, $timeout, $ionicScrollDelegate) {
    })
    .controller('HomeCtrl', function ($scope, $state, $window, $rootScope, $stateParams) {
        if (!$rootScope.islogin) {
            $state.go('app.login');
        }
    })
    .controller('ScheduleCtrl', function ($scope, $state, $window, $rootScope, $stateParams, $compile, uiCalendarConfig) {
        if (!$rootScope.islogin) {
            $state.go('app.login');
        }
        $scope.calendar = true;
        $scope.hide = function () {
            $scope.calendar = true;
        };
        $scope.show = function () {
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

        //calendar
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $scope.changeTo = 'Hungarian';
        /* event source that pulls from google.com */
        $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
        };
        /* event source that contains custom events on the scope */
        $scope.events = [
            { title: 'All Day Event', start: new Date(y, m, 1) },
            { title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2) },
            { id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false },
            { id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false },
            { title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false },
            { title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
        ];
        /* event source that calls a function on every view switch */
        $scope.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [{ title: 'Feed Me ' + m, start: s + (50000), end: s + (100000), allDay: false, className: ['customFeed'] }];
            callback(events);
        };

        $scope.calEventsExt = {
            color: '#f00',
            textColor: 'yellow',
            events: [
                { type: 'party', title: 'Lunch', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
                { type: 'party', title: 'Lunch 2', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
                { type: 'party', title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
            ]
        };
        /* alert on eventClick */
        $scope.alertOnEventClick = function (date, jsEvent, view) {
            $scope.alertMessage = (date.title + ' was clicked ');
        };
        /* alert on Drop */
        $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function (sources, source) {
            var canAdd = 0;
            angular.forEach(sources, function (value, key) {
                if (sources[key] === source) {
                    sources.splice(key, 1);
                    canAdd = 1;
                }
            });
            if (canAdd === 0) {
                sources.push(source);
            }
        };
        /* add custom event*/
        $scope.addEvent = function () {
            $scope.events.push({
                title: 'Open Sesame',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                className: ['openSesame']
            });
        };
        /* remove event */
        $scope.remove = function (index) {
            $scope.events.splice(index, 1);
        };
        /* Change View */
        $scope.changeView = function (view, calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
        };
        /* Change View */
        $scope.renderCalender = function (calendar) {
            if (uiCalendarConfig.calendars[calendar]) {
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        };
        /* Render Tooltip */
        $scope.eventRender = function (event, element, view) {
            element.attr({
                'tooltip': event.title,
                'tooltip-append-to-body': true
            });
            $compile(element)($scope);
        };
        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: true,
                header: {
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender
            }
        };

        $scope.changeLang = function () {
            if ($scope.changeTo === 'Hungarian') {
                $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
                $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
                $scope.changeTo = 'English';
            } else {
                $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                $scope.changeTo = 'Hungarian';
            }
        };
        /* event sources array*/
        $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
        $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
    });