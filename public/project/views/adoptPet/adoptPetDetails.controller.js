(function(){
    angular
        .module("AdoptAPet")
        .controller("AdoptPetDetailsController", AdoptPetDetailsController);

    function AdoptPetDetailsController($routeParams, $scope, $http){
        var id = $routeParams.id;

        $http.jsonp('http://api.petfinder.com/pet.get?key=5d4055c8fe1e814cd62a596ed4558ffc&format=json&callback=JSON_CALLBACK&id='
               + id)
            .success(renderDetails);

        //$.getJSON('http://api.petfinder.com/pet.get?key=5d4055c8fe1e814cd62a596ed4558ffc&format=json&callback=JSON_CALLBACK&id='
        //        + id)
        //    .success(renderDetails)
        //    .error(function(err) { alert('Error retrieving data!')});

        function renderDetails(response){
            console.log(response);
            $scope.petDet = response;
        }
    }
})();