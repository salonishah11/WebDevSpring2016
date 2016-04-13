(function(){
    angular
        .module("AdoptAPet")
        .controller("AdoptPetDetailsController", AdoptPetDetailsController);

    function AdoptPetDetailsController($routeParams, $location, UserService, PetService){
        var vm = this;
        
        var id = $routeParams.id;

        vm.adopt = adopt;

        PetService
            .findPetByID(id)
            .then(function(response){
                if(response){
                    console.log(response);
                    vm.petDet = response.data;
                }
            });

        function adopt(pet){
            //console.log(pet);
            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;

                    if (currentUser) {
                        $location.path('/adoptionRequest/user/' + currentUser._id + '/pet/' + pet.petfinder.pet.id.$t);
                    }
                    else {
                        alert("Please Login/Register!");
                        $location.path('/login');
                    }
                });
        }
    }
})();