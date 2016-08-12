angular.module('dataServices', [])

  .factory('FaceService', function () {

    //for the purpose of this example I will store user data on ionic local storage but you should save it on a database

    var setUser = function (user_data) {
      window.localStorage.starter_facebook_user = JSON.stringify(user_data);
    };

    var getUser = function () {
      return JSON.parse(window.localStorage.starter_facebook_user || '{}');
    };

    return {
      getUser: getUser,
      setUser: setUser
    };
  });


angular.module('BackendServices', [])
  .factory('ProfileService', function ($http) {
    var api_gateway_url = 'http://192.168.99.100:99/';
    return {
      get_profile: function (email) {
        var parameter = JSON.stringify({ email: email });
        var url = api_gateway_url + 'profile';
        var header = { headers: { 'Content-Type': 'application/json', 'app_id': 'lextenweb_1.0.0.0' } };
        return $http.post(url, parameter, header);
      },
      update_profile: function (user_data) {
        var parameter = JSON.stringify(user_data);
        var url = api_gateway_url + 'profile/save';
        var header = { headers: { 'Content-Type': 'application/json', 'app_id': 'lextenweb_1.0.0.0' } };
        return $http.post(url, parameter, header);
      }
    }
  })
  .factory('SettingService', function ($http) {
    var api_gateway_url = 'http://192.168.99.100:99/';
    return {
      menu_save: function (menu) {
        var parameter = JSON.stringify(menu);
        var url = api_gateway_url + 'business/menu/save';
        var header = { headers: { 'Content-Type': 'application/json', 'app_id': 'lextenweb_1.0.0.0' } };
        return $http.post(url, parameter, header);
      },
      menu_list: function (user_id) {
        var parameter = JSON.stringify({user_id:user_id});
        var url = api_gateway_url + 'business/menu/list';
        var header = { headers: { 'Content-Type': 'application/json', 'app_id': 'lextenweb_1.0.0.0' } };
        return $http.post(url, parameter, header);
      },
      client_list : function(user_id){
        var parameter = JSON.stringify({user_id:user_id});
        var url = api_gateway_url + 'business/client/list';
        var header = { headers: { 'Content-Type': 'application/json', 'app_id': 'lextenweb_1.0.0.0' } };
        return $http.post(url, parameter, header);
        }
    }
  })
  ;