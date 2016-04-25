(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("AnimalOrgSearchController", AnimalOrgSearchController);

    function AnimalOrgSearchController(ShelterService, $location, $routeParams){
        var vm = this;
        var location = $routeParams.location;
        var name = $routeParams.name;

        vm.searchOrg = searchOrg;

        if(location){
            var param = "";
            if(location != null)param += "&location=" + location;
            if(name != 'undefined')param += "&name=" + name;

            ShelterService
                .findSheltersByParam(param)
                .then(function(response){
                    if(response.data){
                        vm.data = response.data;
                    }
                });
        }

        function searchOrg(org){
            if(org){
                if((org.location != null) || (org.location != undefined)){
                    var param = "";
                    if(org.location != null)param += "&location=" + org.location;
                    if(org.name != null)param += "&name=" + org.name;

                    $location.url("/animalOrgSearch/" + org.location + "/" + org.name);

                    ShelterService
                        .findSheltersByParam(param)
                        .then(function(response){
                            if(response.data){
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



