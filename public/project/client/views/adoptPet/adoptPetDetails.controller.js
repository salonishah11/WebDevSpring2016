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
            console.log(pet.petfinder.pet.id);
            var currentUser = UserService.getCurrentUser();
            if(currentUser){
                $location.path('/adoptionRequest/user/' + currentUser._id + '/pet/' + pet.petfinder.pet.id.$t);
            }
        }
    }
})();