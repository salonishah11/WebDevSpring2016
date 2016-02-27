(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location, $scope) {
        // Function Declarations
        $scope.login = login;


        // Function Implementations
        // finds a user given username and password
        function login(username, password){
            UserService.findUserByCredentials(username, password, renderLogin);
        }

        // callback function of login()
        // if response is not null, i.e. user exists, user is navigated
        // to their profile page
        function renderLogin(response){
            if(response != null) {
                UserService.setCurrentUser(response);
                $location.path('/profile');
            }
        }
    }
})();