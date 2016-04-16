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
                    vm.user.emails = currentUser.emails.join(",");
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
                "emails": updatedUser.emails.split(','),
                "roles": currentUser.roles
            };

            UserService
                .updateUser(currentUser._id, updatedUserObj)
                .then(function(response) {
                        // UserService.setCurrentUser(updatedUserObj);
                        init();
                });
        }
    }
})();