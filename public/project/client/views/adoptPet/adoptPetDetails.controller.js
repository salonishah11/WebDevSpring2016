(function(){
    angular
        .module("AdoptAPet")
        .controller("AdoptPetDetailsController", AdoptPetDetailsController);

    function AdoptPetDetailsController($routeParams, $scope, PetService){
        var id = $routeParams.id;

        PetService.findPetByID(id, renderDetails);

        function renderDetails(response){
            if(response != null){
                console.log(response);
                $scope.petDet = response;
            }
        }
    }
})();