(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location, $scope) {

        $scope.login = login;

        function login(username, password){
            //console.log("Inside login");
            UserService.findUserByUsernameAndPassword(username, password, renderLogin);
        }

        function renderLogin(response){
            if(response != null) {
                $rootScope = response;
                //$rootScope = response;
                console.log($rootScope);
                $location.path('/profile');
            }
        }
    }
})();