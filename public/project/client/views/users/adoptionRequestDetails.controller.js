(function() {
    angular
        .module("AdoptAPet")
        .controller("AdoptionRequestDetailsController", AdoptionRequestDetailsController);

    function AdoptionRequestDetailsController($routeParams, $location, UserService, PetService, AdoptionRequestService) {
        var vm = this;

        var requestId = $routeParams.requestId;

        vm.updateRequest = updateRequest;

        function init(){
            if(UserService.getCurrentUser()){
                AdoptionRequestService
                    .findRequestById(requestId)
                    .then(function(response){
                        vm.user = response.data.user;
                        vm.pet = response.data.pet;
                    });
            }
        }
        init();


        function updateRequest(user){
            // console.log(user);
            // console.log(pet);
            //console.log(request);

            AdoptionRequestService
                .findRequestById(requestId)
                .then(function(response){
                    var updatedRequest = {
                        _id : response.data._id,
                        status : response.data.status,
                        user : user,
                        pet : response.data.pet
                    };

                    AdoptionRequestService
                        .updateRequestById(requestId, updatedRequest)
                        .then(function(response){
                            if(response){
                                //console.log(response.data);
                                alert("Request Updated Successfully");
                                $location.path('/viewUserAdoptionRequests');
                            }
                        });
                });
        }
    }
})();