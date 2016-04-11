(function(){
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $location) {
        var vm = this;
        
        //UserService.setCurrentUser(null);

        vm.logout = logout;


        // logs out the user by setting $rootScope to null
        function logout(){
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
    }
})();