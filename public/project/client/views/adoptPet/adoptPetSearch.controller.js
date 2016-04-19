(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("AdoptPetSearchController", AdoptPetSearchController);

    function AdoptPetSearchController(PetService){
        var vm = this;
        vm.searchPets = searchPets;

        function searchPets(pet){
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