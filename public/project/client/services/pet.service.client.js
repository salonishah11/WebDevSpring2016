(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .factory("PetService", PetService);

    function PetService($http) {
        var petAPI = {
            findPetsByParam : findPetsByParam,
            findPetByID : findPetByID
        };
        return petAPI;

        function findPetsByParam(param, callback) {
            if(param != null){
                $http.jsonp('http://api.petfinder.com/pet.find?key=5d4055c8fe1e814cd62a596ed4558ffc&format=json&callback=JSON_CALLBACK'
                        + param)
                    .success(callback);
            }
        }

        function findPetByID(id){
            if(id != null){
                return $http.jsonp('http://api.petfinder.com/pet.get?key=5d4055c8fe1e814cd62a596ed4558ffc&format=json&callback=JSON_CALLBACK&id='
                        + id);
                    //.success(callback);
            }
        }
    }
})();