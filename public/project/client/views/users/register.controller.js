(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {

        var vm = this;
        vm.register = register;


        // Function Implementations
        // registers a new user
        function register(newUser){

            UserService
                .createUser(newUser)
                .then(function(response){
                    if(response.data){
                        //console.log(response.data);
                        UserService.setCurrentUser(response.data);
                        $location.path('/profile');
                    }
                });
            // if(newUser){
            //     UserService.setCurrentUser(newUser);
            //     $location.path('/profile');
            // }
        }
    }
})();