(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {
        var vm = this;

        // Function Declarations
        vm.login = login;

        function init() {
        }
        init();


        // Function Implementations
        // finds a user given username and password
        function login(user){
            UserService
                .findUserByCredentials({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    console.log(response.data);
                });
        }

        // callback function of login()
        // if response is not null, i.e. user exists, user is navigated
        // to their profile page
        // function renderLogin(response){
        //     if(response != null) {
        //         UserService.setCurrentUser(response);
        //         $location.path('/profile');
        //     }
        // }
    }
})();