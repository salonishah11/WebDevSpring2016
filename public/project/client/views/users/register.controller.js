(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {

        var vm = this;
        vm.register = register;

        function init(){
            //For Testing Purpose, all registered Organizations will get
            // 1 of the following IDs
            var shelterIDs = ["MA38", "MA77", "MA13", "CA2312", "CA1685"];
            var index = Math.floor((Math.random() * 5));
            vm.shelterId = shelterIDs[index];
        }
        init();

        // Function Implementations
        // registers a new user
        function register(newUser, shelterId){

            console.log(shelterId);

            // UserService
            //     .createUser(newUser)
            //     .then(function(response){
            //         if(response.data){
            //             //console.log(response.data);
            //             UserService.setCurrentUser(response.data);
            //             $location.path('/profile');
            //         }
            //     });
            // if(newUser){
            //     UserService.setCurrentUser(newUser);
            //     $location.path('/profile');
            // }
        }
    }
})();