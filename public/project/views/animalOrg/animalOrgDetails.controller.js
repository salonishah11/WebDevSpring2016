(function(){
    angular
        .module("AdoptAPet")
        .controller("AnimalOrgDetailsController", AnimalOrgDetailsController);

    function AnimalOrgDetailsController($routeParams, $scope, ShelterService){
        var id = $routeParams.id;

        ShelterService.findShelterByID(id, renderDetails);

        function renderDetails(response){
            if(response != null){
                console.log(response);
                $scope.shelter = response;
            }
        }
    }
})();