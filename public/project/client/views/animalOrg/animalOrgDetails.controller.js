(function(){
    angular
        .module("AdoptAPet")
        .controller("AnimalOrgDetailsController", AnimalOrgDetailsController);

    function AnimalOrgDetailsController($routeParams, ShelterService){
        var vm = this;
        
        var id = $routeParams.id;

        ShelterService
            .findShelterByID(id)
            .then(function(response){
                if(response){
                    vm.shelter = response.data;
                    // console.log(response.data);
                }
            });
    }
})();