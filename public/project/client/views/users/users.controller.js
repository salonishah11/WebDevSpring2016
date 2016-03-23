(function() {
    angular
        .module("AdoptAPet")
        .controller("UsersController", UsersController);

    function UsersController($scope, UserService){
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;

        $scope.selectedIndex = -1;

        UserService.findAllUsers(renderAllUsers);

        function renderAllUsers(response){
            $scope.data = response;
        }


        function addUser(user){
            if(user!= null){
                if((user.name != null) && (user.username != null)
                    && (user.email != null) && (user.accountType != null)){
                    //console.log("inside if");
                    var newUser = {
                        "_id": (new Date).getTime(),
                        "name": user.name,
                        "username": user.username,
                        "password": "",
                        "email": user.email,
                        "accountType": user.accountType
                    };

                    UserService.createUser(newUser, renderAddUser);
                }
            }
        }

        function renderAddUser(response){
            //console.log(response);
            UserService.findAllUsers(renderAllUsers);
            $scope.user = null;
        }


        function deleteUser(index){
            var selectedUser = $scope.data[index];
            UserService.deleteUserById(selectedUser._id, renderAllUsers);
        }


        function selectUser(index){
            $scope.selectedIndex = index;
            var selectedUser = $scope.data[index];
            $scope.user = {"_id": selectedUser._id,
                "name": selectedUser.name,
                "username": selectedUser.username,
                "password": selectedUser.password,
                "email": selectedUser.email,
                "accountType": selectedUser.accountType};
        }


        function updateUser(updatedUser){
            if(updatedUser != null){
                if(($scope.selectedIndex != -1) && (updatedUser.name != null) &&
                    (updatedUser.username != null) && (updatedUser.email != null) &&
                    (updatedUser.accountType != null)){
                    var selectedUser = $scope.data[$scope.selectedIndex];
                    var updatedUserObj = {
                        "_id": selectedUser._id,
                        "name": updatedUser.name,
                        "username": updatedUser.username,
                        "password": selectedUser.password,
                        "email": updatedUser.email,
                        "accountType": updatedUser.accountType
                    };

                    UserService.updateUser(selectedUser._id, updatedUserObj, renderUpdatedUser);
                }
            }
        }

        function renderUpdatedUser(response){
            $scope.data[$scope.selectedIndex] = response;
            $scope.user = null;
            $scope.selectedIndex = -1;
        }
    }
})();