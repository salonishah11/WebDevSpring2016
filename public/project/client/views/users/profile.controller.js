(function(){
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope, $location) {
        var currentUser = UserService.getCurrentUser();

        var vm = this;
        vm.user = currentUser;

        // Function Declarations
        vm.update = update;


        // Function Implementations
        //updates the data of current user
        function update(updatedUser){
            var updatedUserObj = {
                "_id": UserService.getCurrentUser()._id,
                "name": updatedUser.name,
                "username": updatedUser.username,
                "password": updatedUser.password,
                "email":  updatedUser.email,
                "streetAddress": updatedUser.streetAddress,
                "city": updatedUser.city,
                "state": updatedUser.state,
                "country": updatedUser.country,
                "zipcode": updatedUser.zipcode,
                "accountType": updatedUser.accountType
            };

            //console.log(updatedUserObj);

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