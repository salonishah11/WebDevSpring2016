(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("AnimalOrgSearchController", AnimalOrgSearchController);

    function AnimalOrgSearchController(ShelterService){
        var vm = this;
        
        vm.searchOrg = searchOrg;

        function searchOrg(org){
            if((org.location != null) || (org.name != null)){
                var param = "";
                if(org.location != null)param += "&location=" + org.location;
                if(org.name != null)param += "&name=" + org.name;

                ShelterService
                    .findSheltersByParam(param)
                    .then(function(response){
                        if(response){
                            vm.data = response.data;
                        }
                    });
            }
            else{
                alert("Please enter Location!");
            }
        }
    }
})();



