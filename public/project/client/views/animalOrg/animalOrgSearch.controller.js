(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("AnimalOrgSearchController", AnimalOrgSearchController);

    function AnimalOrgSearchController($scope, ShelterService){
        $scope.searchOrg = searchOrg;

        function searchOrg(org){
            if((org.location != null) || (org.name != null)){
                var param = "";
                if(org.location != null)param += "&location=" + org.location;
                if(org.name != null)param += "&name=" + org.name;

                ShelterService.findSheltersByParam(param, renderSearch);
            }
        }

        function renderSearch(response){
            if(response != null){
                console.log(response);
                $scope.data = response;
            }
        }
    }
})();



