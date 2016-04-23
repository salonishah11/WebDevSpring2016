(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {

        var vm = this;
        vm.register = register;

        function init(){
            //For Testing Purpose, all registered Organizations will get
            // 1 of the following IDs
            // var shelterIDs = ["TX2049", "TX1920", "TX1967", "CA1973", "CA1584", "TX192", "RI77", "MA77"];
            // var shelterIDs = ["TX192"];
            // var index = Math.floor((Math.random() * 8));

            UserService
                .findAvailableShelterId()
                .then(function (response) {
                    if(response.data){
                        vm.shelterId = response.data.shelterId;
                    }
                    // console.log(response.data);
                });
        }
        init();

        // Function Implementations
        // registers a new user
        function register(newUser, shelterId){
            // console.log(newUser);

            if((newUser) &&
               (newUser.username != null) &&
               (newUser.name != null) &&
               (newUser.email != null) &&
               (newUser.password != null) &&
               (newUser.streetAddress != null) &&
               (newUser.city != null) &&
               (newUser.state != null) &&
               (newUser.country != null) &&
               (newUser.zipcode != null) &&
               (newUser.accountType != null)){

                if((newUser.accountType == 'Organization')
                    && (shelterId == null)){
                    alert("Sorry. No Shelter IDs are currently available!");
                }
                else{
                    if(newUser.accountType == 'Organization'){
                        newUser.shelterId = shelterId;
                    }
                    else{
                        newUser.shelterId = null;
                    }

                    UserService
                        .createUser(newUser)
                        .then(function(response){
                            if(response.data){
                                // console.log(response.data);
                                UserService.setCurrentUser(response.data);
                                $location.path('/profile');
                            }
                        });

                    if(newUser.shelterId != null){
                        UserService
                            .updateShelterId({"shelterId":newUser.shelterId, "username":newUser.username})
                            .then(function (response) {
                            })
                    }
                }
            }
            else{
                alert("Please enter values for all fields!");
            }
        }
    }
})();