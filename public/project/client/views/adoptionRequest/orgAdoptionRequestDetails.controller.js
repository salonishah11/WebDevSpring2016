(function() {
    angular
        .module("AdoptAPet")
        .controller("OrgAdoptionRequestDetailsController", OrgAdoptionRequestDetailsController);

    function OrgAdoptionRequestDetailsController($routeParams, $location, UserService, AdoptionRequestService) {
        var vm = this;

        var requestId = $routeParams.requestId;

        vm.editRequest = editRequest;

        function init(){
            if(UserService.getCurrentUser()){
                AdoptionRequestService
                    .findRequestById(requestId)
                    .then(function(response){
                        vm.status = response.data.status;
                        vm.user = response.data.user;
                        vm.pet = response.data.pet;
                    });
            }
        }
        init();


        function editRequest(){
            var newStatus = vm.updatedStatus;

            if(newStatus){
                AdoptionRequestService
                    .findRequestById(requestId)
                    .then(function(response){
                        var updatedRequest = {
                            _id : response.data._id,
                            status : newStatus,
                            user : response.data.user,
                            pet : response.data.pet
                        };

                        AdoptionRequestService
                            .updateRequestById(requestId, updatedRequest)
                            .then(function(response){
                                if(response){
                                    console.log(response.data);
                                    alert("Request Updated Successfully");
                                    $location.path('/viewOrgAdoptionRequests');
                                }
                            });
                    });
            }
        }
    }
})();