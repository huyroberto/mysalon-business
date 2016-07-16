app
    .controller('MyProfileCtrl', function ($scope, $state, $window, $rootScope, $stateParams, ProfileService) {
        if (!$rootScope.islogin) {
            $state.go('app.login');
        }

        $scope.data = {
            singleSelect: null,
            multipleSelect: [],
            option1: 'option-1',
        };
        $scope.data.singleSelect = $rootScope.user_profile.service;

        $scope.forceUnknownOption = function () {
            $scope.data.singleSelect = 'Hairdresser';
        };
        $scope.save_profile = function () {
            $rootScope.user_profile.service  = $scope.data.singleSelect;
            ProfileService.update_profile($rootScope.user_profile).then(function(response){
                console.log('Save profile remote:', response.data);
            });
            console.log('Save profile: ', $rootScope.user_profile);
            console.log('My service', $scope.data.singleSelect);
        }
    });