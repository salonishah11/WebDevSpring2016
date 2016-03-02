(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("AdoptPetSearchController", AdoptPetSearchController);

    function AdoptPetSearchController($scope, $http){
        $scope.searchPets = searchPets;

        function searchPets(pet){
            if(pet.location != null){
                var param ="&location=" + pet.location;
                if(pet.type != null)param +="&animal=" + pet.type;
                if(pet.breed != null)param +="&breed=" + pet.breed;
                if(pet.age != null)param +="&age=" + pet.age;
                if(pet.size != null)param +="&size=" + pet.size;
                if(pet.gender != null)param +="&sex=" + pet.gender;

                $.getJSON('http://api.petfinder.com/pet.find?key=5d4055c8fe1e814cd62a596ed4558ffc&format=json&callback=?'
                        + param)
                    .success(render)
                    .error(function(err) { alert('Error retrieving data!')});

                //$scope.pet = null;
            }
        }

        function render(response){
            console.log(response);
            $scope.data = response;
        }
    }
})();