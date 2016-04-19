(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("AdoptPetSearchController", AdoptPetSearchController);

    function AdoptPetSearchController(PetService){
        var vm = this;
        vm.searchPets = searchPets;
        vm.breedList = breedList;
        
        function breedList(animal){
            if(animal){
                PetService
                    .findBreedForAnimal(vm.pet.type)
                    .then(function (response) {
                        if(response.data){
                            // console.log(response.data.petfinder.breeds);
                            vm.breeds = response.data.petfinder.breeds.breed;
                        }
                    });
            }
        }
        

        function searchPets(pet){
            console.log(pet);
            if(pet.location){
                var param ="&location=" + pet.location;
                if(pet.type != null)param +="&animal=" + pet.type;
                if(pet.breed != null)param +="&breed=" + pet.breed;
                if(pet.age != null)param +="&age=" + pet.age;
                if(pet.size != null)param +="&size=" + pet.size;
                if(pet.gender != null)param +="&sex=" + pet.gender;

                PetService
                    .findPetsByParam(param)
                    .then(function(response){
                       if(response){
                           // console.log("inside adoptPetSearch Controller");
                           // console.log(response.data);
                           vm.data = response.data;
                       } 
                    });
            }
            else{
                alert("Please enter Location!");
            }
        }
    }
})();