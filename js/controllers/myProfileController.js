app
    .controller('MyProfileCtrl', function ($scope, $state, $window, $rootScope, $stateParams) {
        if (!$rootScope.islogin) {
            $state.go('app.login');
        }

        $scope.data = {
            singleSelect: null,
            multipleSelect: [],
            option1: 'option-1',
        };

        $scope.forceUnknownOption = function () {
            $scope.data.singleSelect = 'Hairdresser';
        };
        $scope.save_profile = function () {

            console.log('Save profile: ', $rootScope.user_profile);
            console.log('My service', $scope.data.singleSelect);
        }
    });