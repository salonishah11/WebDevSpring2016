(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("AdoptPetSearchController", AdoptPetSearchController);

    function AdoptPetSearchController($scope, PetService){
        $scope.searchPets = searchPets;

        function searchPets(pet){
            if(pet.location != null){
                var param ="&location=" + pet.location;
                if(pet.type != null)param +="&animal=" + pet.type;
                if(pet.breed != null)param +="&breed=" + pet.breed;
                if(pet.age != null)param +="&age=" + pet.age;
                if(pet.size != null)param +="&size=" + pet.size;
                if(pet.gender != null)param +="&sex=" + pet.gender;

                PetService.findPetsByParam(param, renderPets);
            }
        }

        function renderPets(response){
            //console.log(response);
            if(response != null){
                $scope.data = response;
            }
        }
    }
})();