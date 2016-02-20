(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location, $scope) {

        $scope.login = login;

        function login(username, password){
            UserService.findUserByUsernameAndPassword(username, password, renderLogin);
        }

        function renderLogin(response){
            if(response != null) {
                //console.log("YES");
                $rootScope = response;
                $location.path('/profile');
            }
        }
    }
})();