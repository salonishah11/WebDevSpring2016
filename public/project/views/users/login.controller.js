(function() {
    angular
        .module("AdoptAPet")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location ,UserService) {

        $scope.login = login;

        function login(user){
            user = UserService.findUserByCredentials(user);
            if(user){
                UserService.setCurrentUser(user);
                $location.path('/profile');
            }
                // .then(function(response){
                //     if(response.data){
                //         //console.log(response.data);
                //         UserService.setCurrentUser(response.data);
                //         $location.path('/profile');
                //     }
                // });
            //console.log(user);
        }
    }
})();