(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, UserService) {
    //     UserService.setCurrentUser(null);
    //
    //     // Function Declarations
    //     $scope.displayLink = displayLink;
    //     $scope.checkUserAdmin = checkUserAdmin;
    //
    //
    //     // Function Implementations
    //     // decides whether link associated with the model calling
    //     // this function is to be displayed on sidebar or not
    //     function displayLink(){
    //         if(UserService.getCurrentUser() != null){
    //             return true;
    //         }
    //         else{
    //             return false;
    //         }
    //     }
    //
    //
    //     // checks whether current user is Admin or not
    //     function checkUserAdmin(){
    //         if(UserService.getCurrentUser() != null){
    //             if(UserService.getCurrentUser().roles.indexOf('admin') >= 0){
    //                 return true;
    //             }
    //             else {
    //                 return false;
    //             }
    //         }
    //         return false;
    //     }
    }
})();