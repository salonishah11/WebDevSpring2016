(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .controller("AnimalOrgSearchController", AnimalOrgSearchController);

    function AnimalOrgSearchController($scope){
        $scope.searchOrg = searchOrg;

        function searchOrg(org){
            if((org.location != null) || (org.name != null)){
                var param = "";
                if(org.location != null)param += "&location=" + org.location;
                if(org.name != null)param += "&name=" + org.name;

                $.getJSON('http://api.petfinder.com/shelter.find?key=5d4055c8fe1e814cd62a596ed4558ffc&format=json&callback=?'
                        + param)
                    .success(renderSearch)
                    .error(function(err) { alert('Error retrieving data!')});
            }
        }

        function renderSearch(response){
            console.log(response);
            $scope.data = response;
        }
    }
})();



