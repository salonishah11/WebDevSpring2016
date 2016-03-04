(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .factory("ShelterService", ShelterService);

    function ShelterService($http) {
        var shelterAPI = {
            findSheltersByParam : findSheltersByParam,
            findShelterByID : findShelterByID
        };
        return shelterAPI;

        function findSheltersByParam(param, callback) {
            if(param != ""){
                $http.jsonp('http://api.petfinder.com/shelter.find?key=5d4055c8fe1e814cd62a596ed4558ffc&format=json&callback=JSON_CALLBACK'
                        + param)
                    .success(callback);
            }
        }

        function findShelterByID(id, callback){
            if(id != null){
                $http.jsonp('http://api.petfinder.com/shelter.get?key=5d4055c8fe1e814cd62a596ed4558ffc&format=json&callback=JSON_CALLBACK&id='
                        + id)
                    .success(callback);
            }
        }
    }
})();