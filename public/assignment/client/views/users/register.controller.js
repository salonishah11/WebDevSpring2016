(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $scope) {
        // Function Declarations
        $scope.register = register;


        // Function Implementations
        // registers a new user
        function register(username, password, verifyPassword, email){
            if(password == verifyPassword){
                var newUser = {
                    "_id":(new Date).getTime(),
                    "firstName":null,
                    "lastName": null,
                    "username":username,
                    "password":password,
                    "roles": []
                };

                UserService.createUser(newUser, renderRegistration);
            }
        }

        // callback function for register()
        // navigates the user to profile page after successful registration
        // sets the value of $rootScope with current user
        function renderRegistration(user){
            UserService.setCurrentUser(user);
            $location.path('/profile');
        }
    }
})();