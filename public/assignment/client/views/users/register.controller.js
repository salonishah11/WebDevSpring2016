(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        
        var vm = this;
        // Function Declarations
        vm.register = register;


        // Function Implementations
        // registers a new user
        function register(user){
            if(user.password == user.verifyPassword){
                // console.log("inside register");
                var newUser = {
                    "username": user.username,
                    "password": user.password,
                    "firstName":null,
                    "lastName": null,
                    "emails": user.emails.split(","),
                    "roles": ["student"]
                };
               
                UserService
                    .register(newUser)
                    .then(function(response){
                    if(response.data){
                        // console.log(response.data);
                        UserService.setCurrentUser(response.data);
                        $location.path('/profile');
                    }
                });
            }
        }
    }
})();