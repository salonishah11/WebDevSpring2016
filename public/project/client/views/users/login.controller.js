(function() {
    angular
        .module("AdoptAPet")
        .controller("LoginController", LoginController);

    function LoginController($location ,UserService) {

        var vm = this;
        vm.login = login;

        function login(user){
            UserService
                .login({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    if(response.data){
                        UserService.setCurrentUser(response.data);
                        $location.path('/profile');
                    }
                });
            
            
            // UserService
            //     .findUserByCredentials(user)
            //     .then(function(response){
            //         if(response.data){
            //             //console.log(response.data);
            //             UserService.setCurrentUser(response.data);
            //             $location.path('/profile');
            //         }
            //     });
        }
    }
})();