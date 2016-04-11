(function() {
    angular
        .module("AdoptAPet")
        .controller("AdoptionRequestsController", AdoptionRequestsController);

    function AdoptionRequestsController($location, AdoptionRequestService, UserService){
        var vm = this;
        var currentUser;
        
        vm.deleteRequest = deleteRequest;
        vm.viewDetails = viewDetails;

        //$scope.selectedIndex = -1;
        
        function init(){
            currentUser = UserService.getCurrentUser();
            if(currentUser){
                AdoptionRequestService
                    .findAllRequestsByUserId(currentUser._id)
                    .then(function(response){
                        //console.log(response.data[0].pet);
                        console.log(response.data);
                        vm.data = response.data;
                    });
            }
            else{
                $location.path('/login');
            }
        }
        init();


        function deleteRequest(index){
            var selectedRequest = vm.data[index];
            //console.log(selectedRequest)
            
            if(selectedRequest.status != "Accepted"){
                AdoptionRequestService
                    .deleteRequestById(selectedRequest._id)
                    .then(function(response){
                        if(response){
                            //console.log(response.data);
                            init();
                        }
                    });
            }
            else{
                alert("You can't deleted a request with Status:Accepted");
            }
        }


        function viewDetails(index){
            var selectedRequest = vm.data[index];
            $location.path('/viewUserAdoptionRequests/request/' + selectedRequest._id);
        }
        
    }
})();