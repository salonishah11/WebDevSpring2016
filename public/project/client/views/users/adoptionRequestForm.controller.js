(function() {
    angular
        .module("AdoptAPet")
        .controller("AdoptionRequestFormController", AdoptionRequestFormController);

    function AdoptionRequestFormController($routeParams, $location, UserService, PetService) {
        var vm = this;

        var userId = $routeParams.userId;
        var petId = $routeParams.petId;
        
        // vm.userId = userId;
        // vm.petId = petId;
    }
})();