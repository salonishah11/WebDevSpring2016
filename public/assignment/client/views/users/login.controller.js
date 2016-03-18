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
            //console.log("inside login" + user);
            UserService
                .findUserByCredentials({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    if(response.data){
                        //console.log(response.data);
                        UserService.setCurrentUser(response.data);
                        $location.path('/profile');
                    }
                });
        }
    }
})();