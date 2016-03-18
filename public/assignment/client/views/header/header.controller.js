(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, UserService) {
        UserService.setCurrentUser(null);

        // Function Declarations
        $scope.displayLink = displayLink;
        $scope.checkUserAdmin = checkUserAdmin;
        $scope.logout = logout;


        // Function Implementations
        // decides whether link associated with the model calling
        // this function is to be displayed on header or not
        function displayLink(){
            if(UserService.getCurrentUser() != null){
                $scope.username =  UserService.getCurrentUser().username;
                return false;
            }
            else{
                return true;
            }
        }


        // checks whether current user is Admin or not
        function checkUserAdmin(){
            if(UserService.getCurrentUser() != null){
                if(UserService.getCurrentUser().roles.indexOf('admin') >= 0){
                    return true;
                }
                else {
                    return false;
                }
            }
            return false;
        }


        // logs out the user by setting $rootScope to null
        function logout(){
            UserService.setCurrentUser(null);
        }
    }
})();