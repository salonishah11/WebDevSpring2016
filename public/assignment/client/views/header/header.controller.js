(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {
        // UserService.setCurrentUser(null);

        var vm = this;
        // Function Declarations
        vm.logout = logout;


        // Function Implementations

        // checks whether current user is Admin or not
        // function checkUserAdmin(){
        //     if(UserService.getCurrentUser() != null){
        //         if(UserService.getCurrentUser().roles.indexOf('admin') >= 0){
        //             return true;
        //         }
        //         else {
        //             return false;
        //         }
        //     }
        //     return false;
        // }


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