(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location) {
        var vm = this;

        var currentUser;

        UserService
            .getCurrentUser()
            .then(function(response){
                currentUser = response.data;
                vm.user = currentUser;
            });


        // Function Declarations
        vm.update = update;


        // Function Implementations
        // updates the data of current user
        function update(updatedUser){
            var updatedUserObj = {
                "_id": currentUser._id,
                "firstName": updatedUser.firstName,
                "lastName": updatedUser.lastName,
                "username": currentUser.username,
                "password": updatedUser.password,
                "roles": currentUser.roles
            };

            UserService
                .getCurrentUser()
                .then(function(response){
                    if(response){
                        var user = response.data;

                        UserService
                            .updateUser(user._id, updatedUserObj)
                            .then(function(response){
                                if(response.data){
                                    //console.log(response.data);
                                    UserService.setCurrentUser(response.data);
                                }
                            });
                    }
                });
        }
    }
})();