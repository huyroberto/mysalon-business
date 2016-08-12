app
    .controller('MyMenuCtrl', function ($scope, $state, $window, $rootScope, $stateParams, SettingService) {
        $scope.menu = {};
        if (!$rootScope.islogin) {
            //$state.go('app.login');
        }
        $scope.myMenus = [];
        SettingService.menu_list($rootScope.user_profile.email).then(function (response) {
            $scope.myMenus = response.data.data;
        });
        
        $scope.select_to_edit = function (menu) {
            $scope.menu = menu;
        }
        $scope.save_menu = function () {
            console.log('menu to save:', $scope.menu);

            var menu_to_save = {};
            menu_to_save._id = $scope.menu.title.toLowerCase();
            menu_to_save.title = $scope.menu.title;
            menu_to_save.price = $scope.menu.price;
            menu_to_save.time = $scope.menu.time;
            var is_existed = false;
            angular.forEach($scope.myMenus, function (m) {
                if (m._id == menu_to_save._id /*is in array1*/) {
                    m.price = menu_to_save.price;
                    m.time = menu_to_save.time;
                    is_existed = true;
                }
            });
            menu_to_save.user_id = $rootScope.user_profile.email;
            SettingService.menu_save(menu_to_save).then(function (response) {
                console.log('Save menu remote:', response.data);
            }
            );
            if (!is_existed) {
                $scope.myMenus.push(menu_to_save);
            }
        }
    });