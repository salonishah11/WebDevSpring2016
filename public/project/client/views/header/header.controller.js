(function(){
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService) {
        var vm = this;
        
        UserService.setCurrentUser(null);

        vm.logout = logout;


        // logs out the user by setting $rootScope to null
        function logout(){
            UserService.setCurrentUser(null);
        }
    }
})();