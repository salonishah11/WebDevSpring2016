(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $scope) {
        $scope.register = register;

        function register(username, password, verifyPassword, email){
            //console.log("Inside login");
            if(password == verifyPassword){
                var newUser = { "_id":(new Date).getTime(), "firstName":null, "lastName": null,
                                 "username":username, "password":password, "roles": []};

                UserService.createUser(newUser, renderRegistration);
            }
        }

        function renderRegistration(response){
            //console.log(response);
            $rootScope = response;
            //console.log($rootScope);
            $location.path('/profile');
        }
    }
})();