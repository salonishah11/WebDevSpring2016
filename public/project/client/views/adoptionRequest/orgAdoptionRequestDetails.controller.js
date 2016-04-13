(function() {
    angular
        .module("AdoptAPet")
        .controller("OrgAdoptionRequestDetailsController", OrgAdoptionRequestDetailsController);

    function OrgAdoptionRequestDetailsController($routeParams, $location, UserService, AdoptionRequestService) {
        var vm = this;

        var requestId = $routeParams.requestId;

        vm.editRequest = editRequest;

        function init(){
                AdoptionRequestService
                    .findRequestById(requestId)
                    .then(function(response){
                        vm.status = response.data.status;
                        vm.pet = response.data.pet;

                        UserService
                            .findUserById(response.data.userId)
                            .then(function (response) {
                                if(response.data){
                                    vm.user = response.data;
                                }
                            })
                    });
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
                            userId : response.data.userId,
                            userName : response.data.userName,
                            pet : response.data.pet
                        };

                        AdoptionRequestService
                            .updateRequestById(requestId, updatedRequest)
                            .then(function(response){
                                if(response){
                                    // console.log(response.data);
                                    alert("Request Updated Successfully");
                                    $location.path('/viewOrgAdoptionRequests');
                                }
                            });
                    });
            }
        }
    }
})();