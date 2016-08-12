app.controller('SettingsCtrl', function ($scope, $ionicPopup) {
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