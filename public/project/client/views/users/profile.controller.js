(function(){
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService) {
        var currentUser; // = UserService.getCurrentUser();

        var vm = this;
        //vm.user = currentUser;

        // Function Declarations
        vm.update = update;

        function init(){
            UserService
                .getCurrentUser()
                .then(function(response){
                    currentUser = response.data;
                    vm.user = currentUser;
                    //vm.user.emails = currentUser.emails.join(",");
                });
        }
        init();


        // Function Implementations
        //updates the data of current user
        function update(updatedUser){
            var updatedUserObj = {
                "_id": currentUser._id,
                "name": updatedUser.name,
                "username": currentUser.username,
                "password": updatedUser.password,
                "email":  updatedUser.email,
                "streetAddress": updatedUser.streetAddress,
                "city": updatedUser.city,
                "state": updatedUser.state,
                "country": updatedUser.country,
                "zipcode": updatedUser.zipcode,
                "accountType": currentUser.accountType,
                "shelterId": currentUser.shelterId
            };

            //console.log(updatedUserObj);

            UserService
                .updateUser(currentUser._id, updatedUserObj)
                .then(function(response){
                    if(response.data){
                        //console.log(response.data);
                        UserService.setCurrentUser(updatedUserObj);
                    }
                });
        }
    }
})();