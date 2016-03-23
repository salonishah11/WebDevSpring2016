(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $scope) {

        // var vm = this;
        // Function Declarations
        // vm.register = register;
        $scope.register = register;


        // Function Implementations
        // registers a new user
        function register(newUser){
            // if(user.password == user.verifyPassword){
            //     console.log("inside register");
            //     var newUser = {
            //         "_id":(new Date).getTime(),
            //         "firstName":null,
            //         "lastName": null,
            //         "username": user.username,
            //         "password": user.password,
            //         "roles": []
            //     };

            newUser = UserService
                .createUser(newUser);

            // .then(function(response){
            // if(response.data){
            //     //console.log(response.data);
            //     UserService.setCurrentUser(response.data);
            //     $location.path('/profile');
            // }
            // });
            // }
            if(newUser){
                UserService.setCurrentUser(newUser);
                $location.path('/profile');
            }
        }
    }
})();