(function() {
    angular
        .module("AdoptAPet")
        .controller("AdoptionRequestFormController", AdoptionRequestFormController);

    function AdoptionRequestFormController($routeParams, $location, UserService, PetService, AdoptionRequestService) {
        var vm = this;

        var userId = $routeParams.userId;
        var petId = $routeParams.petId;

        vm.submitRequest = submitRequest;

        function init(){
            UserService
                .findUserById(userId)
                .then(function(response){
                   if(response){
                       //console.log(response.data);
                       //vm.request.user = null;
                       //vm.request = response.data;
                       vm.user = response.data;
                   } 
                });

            PetService
                .findPetByID(petId)
                .then(function(response){
                    if(response){
                        //console.log(response.data);
                        //vm.request.user = null;
                        //vm.request = response.data;
                        vm.pet = response.data.petfinder.pet;
                    }
                });
        }
        init();


        function submitRequest(user, pet){
            // console.log(user);
            // console.log(pet);
            var request = {
                user : user,
                pet : pet
            };
            //console.log(request);

            AdoptionRequestService
                .createRequest(request)
                .then(function(response){
                    if(response){
                        //console.log(response.data);
                        alert("Request Submitted Successfully");
                        $location.path('/viewAdoptionRequests');
                    }
                });
        }
    }
})();