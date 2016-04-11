(function() {
    angular
        .module("AdoptAPet")
        .controller("OrgAdoptionRequestsController", OrgAdoptionRequestsController);

    function OrgAdoptionRequestsController($location, AdoptionRequestService, UserService){
        var vm = this;
        
        vm.viewDetails = viewDetails;

        //$scope.selectedIndex = -1;

        function init(){
            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    if (currentUser) {
                        AdoptionRequestService
                            .findAllRequestsByShelterId(currentUser.shelterId)
                            .then(function (response) {
                                //console.log(response.data[0].pet);
                                console.log(response.data);
                                vm.data = response.data;
                            });
                    }
                    else {
                        $location.path('/login');
                    }
                });
        }
        init();
        
        
        function viewDetails(index){
            var selectedRequest = vm.data[index];
            $location.path('/viewOrgAdoptionRequests/request/' + selectedRequest._id);
        }
    }
})();