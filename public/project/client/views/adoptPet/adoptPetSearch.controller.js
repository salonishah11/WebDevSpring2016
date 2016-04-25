(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("AdoptPetSearchController", AdoptPetSearchController);

    function AdoptPetSearchController(PetService, $routeParams, $location){
        var vm = this;
        var location = $routeParams.location;
        var type = $routeParams.type;
        var breed = $routeParams.breed;
        var age = $routeParams.age;
        var size = $routeParams.size;
        var gender = $routeParams.gender;

        vm.searchPets = searchPets;
        vm.breedList = breedList;

        if(location){
            var param ="&location=" + location;
            if(type != 'undefined')param +="&animal=" + type;
            if(breed != 'undefined')param +="&breed=" + breed;
            if(age != 'undefined')param +="&age=" + age;
            if(size != 'undefined')param +="&size=" + size;
            if(gender != 'undefined')param +="&sex=" + gender;

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
            // console.log(pet);
            if(pet){
                if(pet.location){
                    var param ="&location=" + pet.location;
                    if(pet.type != null)param +="&animal=" + pet.type;
                    if(pet.breed != null)param +="&breed=" + pet.breed;
                    if(pet.age != null)param +="&age=" + pet.age;
                    if(pet.size != null)param +="&size=" + pet.size;
                    if(pet.gender != null)param +="&sex=" + pet.gender;

                    $location.url("/adoptPetSearch/" + pet.location + "/" + pet.type + "/" + pet.breed
                        + "/" + pet.age + "/" + pet.size + "/" + pet.gender);

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
            else{
                alert("Please enter Location!");
            }

        }
    }
})();