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
            if(type != null)param +="&animal=" + type;
            if(breed != null)param +="&breed=" + breed;
            if(age != null)param +="&age=" + age;
            if(size != null)param +="&size=" + size;
            if(gender != null)param +="&sex=" + gender;

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
                    var url = "location=" + pet.location;
                    
                    if(pet.type != null){
                        param +="&animal=" + pet.type;
                        url += "&animal=" + pet.type;
                    }
                    if(pet.breed != null){
                        param +="&breed=" + pet.breed;
                        url += "&breed=" + pet.breed;
                    }
                    if(pet.age != null){
                        param +="&age=" + pet.age;
                        url += "&age=" + pet.age;
                    }
                    if(pet.size != null){
                        param +="&size=" + pet.size;
                        url += "&size=" + pet.size;
                    }
                    if(pet.gender != null){
                        param +="&sex=" + pet.gender;
                        url += "&gender=" + pet.gender;
                    }

                    $location.url("/adoptPetSearch?" + url);

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