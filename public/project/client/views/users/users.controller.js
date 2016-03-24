(function() {
    angular
        .module("AdoptAPet")
        .controller("UsersController", UsersController);

    function UsersController(UserService){
        var vm = this;
        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;

        vm.selectedIndex = -1;

        function init(){
            UserService
                .findAllUsers()
                .then(function(response){
                    if(response){
                        vm.data = response.data;
                    }
                });
        }
        init();


        function addUser(user){
            if(user){
                if((user.name != null) && (user.username != null)
                    && (user.email != null) && (user.accountType != null)){
                    //console.log("inside if");
                    var newUser = {
                        "name": user.name,
                        "username": user.username,
                        "password": null,
                        "email": user.email,
                        "streetAddress": null,
                        "city": null,
                        "state": null,
                        "country": null,
                        "zipcode": null,
                        "accountType": user.accountType
                    };

                    UserService
                        .createUser(newUser)
                        .then(function(response){
                            if(response){
                                vm.user = null;
                                init();
                            }
                        });
                }
            }
        }


        function deleteUser(index){
            var selectedUser = vm.data[index];
            UserService
                .deleteUserById(selectedUser._id)
                .then(function(response){
                   if(response){
                       init();
                   }
                });
        }


        function selectUser(index){
            vm.selectedIndex = index;
            var selectedUser = vm.data[index];
            vm.user = {
                "_id": selectedUser._id,
                "name": selectedUser.name,
                "username": selectedUser.username,
                "password": selectedUser.password,
                "email": selectedUser.email,
                "streetAddress": selectedUser.streetAddress,
                "city": selectedUser.city,
                "state": selectedUser.state,
                "country": selectedUser.country,
                "zipcode": selectedUser.zipcode,
                "accountType": selectedUser.accountType
            };
            //vm.user = selectedUser;
        }


        function updateUser(updatedUser){
            if(updatedUser){
                if((vm.selectedIndex != -1) && (updatedUser.name != null) &&
                    (updatedUser.username != null) && (updatedUser.email != null) &&
                    (updatedUser.accountType != null)){
                    var selectedUser = vm.data[vm.selectedIndex];
                    var updatedUserObj = {
                        "_id": selectedUser._id,
                        "name": updatedUser.name,
                        "username": updatedUser.username,
                        "password": selectedUser.password,
                        "email": updatedUser.email,
                        "streetAddress": selectedUser.streetAddress,
                        "city": selectedUser.city,
                        "state": selectedUser.state,
                        "country": selectedUser.country,
                        "zipcode": selectedUser.zipcode,
                        "accountType": updatedUser.accountType
                    };

                    UserService
                        .updateUser(selectedUser._id, updatedUserObj)
                        .then(function(response){
                            vm.data[vm.selectedIndex] = response.data;
                            vm.user = null;
                            vm.selectedIndex = -1;
                        });
                }
            }
        }
    }
})();