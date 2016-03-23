(function(){
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope, $location) {
        var currentUser = UserService.getCurrentUser();

        // var vm = this;
        // updating the scope with current user's information
        // vm.user = currentUser;
        $scope.user = currentUser;

        // Function Declarations
        // vm.update = update;
        $scope.update = update;


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

            updatedUser = UserService.updateUser(UserService.getCurrentUser()._id, updatedUserObj);
            if(updatedUser){
                UserService.setCurrentUser(updatedUser);
            }
                // .then(function(response){
                //     if(response.data){
                //         //console.log(response.data);
                //         UserService.setCurrentUser(response.data);
                //     }
                // });
        }
    }
})();