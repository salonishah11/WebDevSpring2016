(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $scope) {
        var currentUser = UserService.getCurrentUser();

        // updating the scope with current user's information
        $scope.username = currentUser.username;
        $scope.password = currentUser.password;
        $scope.firstName = currentUser.firstName;
        $scope.lastName = currentUser.lastName;

        // Function Declarations
        $scope.update = update;


        // Function Implementations
        // updates the data of current user
        function update(password, firstName, lastName,email){
            var updatedUser = {
                "_id":UserService.getCurrentUser()._id,
                "firstName": firstName,
                "lastName": lastName,
                "username": UserService.getCurrentUser().username,
                "password": password,
                "roles": UserService.getCurrentUser().roles
            };

            UserService.updateUser(UserService.getCurrentUser()._id, updatedUser, renderUpdateUser);
        }

        // callback function for update()
        // renders the updated data of user
        function renderUpdateUser(response){
            UserService.setCurrentUser(response);
        }
    }
})();