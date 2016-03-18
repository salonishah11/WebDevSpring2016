(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location) {
        var currentUser = UserService.getCurrentUser();

        var vm = this;
        // updating the scope with current user's information
        vm.user = UserService.getCurrentUser();

        // Function Declarations
        vm.update = update;


        // Function Implementations
        // updates the data of current user
        function update(updatedUser){
            var updatedUserObj = {
                "_id":UserService.getCurrentUser()._id,
                "firstName": updatedUser.firstName,
                "lastName": updatedUser.lastName,
                "username": UserService.getCurrentUser().username,
                "password": updatedUser.password,
                "roles": UserService.getCurrentUser().roles
            };

            UserService
                .updateUser(UserService.getCurrentUser()._id, updatedUserObj)
                .then(function(response){
                    if(response.data){
                        //console.log(response.data);
                        UserService.setCurrentUser(response.data);
                    }
                });
        }
    }
})();