(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $scope) {

        $scope.update = update;

        var user = $rootScope;

        $scope.username = user.username;
        $scope.password = user.password;
        $scope.firstName = user.firstName;
        $scope.lastName = user.lastName;

        //console.log($rootScope+" "+(new Date).getTime());

        function update(password, firstName, lastName,email){
            var updatedUser = { "_id":user._id,
                "firstName": firstName,
                "lastName": lastName,
                "username": user.username,
                "password": password,
                "roles": user.roles};

            UserService.updateUser(user._id, updatedUser, renderUpdateUser);
        }

        function renderUpdateUser(response){
            //console.log(response);
            $rootScope = response;
        }
    }
})();