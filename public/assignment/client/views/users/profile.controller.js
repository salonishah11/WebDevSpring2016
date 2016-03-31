(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location) {
        var vm = this;

        var currentUser;

        // Function Declarations
        vm.update = update;

        function init(){
            UserService
                .getCurrentUser()
                .then(function(response){
                    currentUser = response.data;
                    vm.user = currentUser;
                });
        }
        init();


        // Function Implementations
        // updates the data of current user
        function update(updatedUser){
            var updatedUserObj = {
                "_id": currentUser._id,
                "username": currentUser.username,
                "password": updatedUser.password,
                "firstName": updatedUser.firstName,
                "lastName": updatedUser.lastName,
                "email": updatedUser.email,
                "roles": currentUser.roles
            };

            UserService
                .updateUser(currentUser._id, updatedUserObj)
                .then(function() {
                    return UserService
                        .findUserByCredentials({
                            username: updatedUser.username,
                            password: updatedUser.password
                        });
                })
                .then(function(response){
                    if (response.data){
                        UserService.setCurrentUser(response.data);
                        UserService.getCurrentUser();
                    }
                });
        }
    }
})();