(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $scope) {
        
        var vm = this;
        // Function Declarations
        vm.register = register;


        // Function Implementations
        // registers a new user
        function register(user){
            if(user.password == user.verifyPassword){
                console.log("inside register");
                var newUser = {
                    "username": user.username,
                    "password": user.password,
                    "firstName":null,
                    "lastName": null,
                    "email": user.email,
                    "roles": []
                };

                UserService
                    .createUser(newUser)
                    .then(function(response){
                    if(response.data){
                        //console.log(response.data);
                        UserService.setCurrentUser(response.data);
                        $location.path('/profile');
                    }
                });
            }
        }
    }
})();