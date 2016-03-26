(function() {
    angular
        .module("AdoptAPet")
        .controller("AdoptionRequestsController", AdoptionRequestsController);

    function AdoptionRequestsController($location, AdoptionRequestService, UserService){
        var vm = this;
        
        vm.deleteRequest = deleteRequest;
        vm.viewDetails = viewDetails;

        //$scope.selectedIndex = -1;
        
        function init(){
            if(UserService.getCurrentUser()){
                AdoptionRequestService
                    .findAllRequestsByUserId(UserService.getCurrentUser()._id)
                    .then(function(response){
                        //console.log(response.data[0].pet);
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
            AdoptionRequestService
                .deleteRequestById(selectedRequest._id)
                .then(function(response){
                    if(response){
                        //console.log(response.data);
                        init();
                    }
                });
        }


        function viewDetails(index){
            var selectedRequest = vm.data[index];
            $location.path('/viewAdoptionRequests/request/' + selectedRequest._id);
        }


        // function selectRequest(index){
        //     $scope.selectedIndex = index;
        //     var selectedRequest = $scope.data[index];
        //     $scope.request = {
        //         "_id": selectedRequest._id,
        //         "name": selectedRequest.name,
        //         "username": selectedRequest.username,
        //         "animal": selectedRequest.animal,
        //         "animalName": selectedRequest.animalName,
        //         "status": selectedRequest.status
        //     };
        // }
        //
        //
        // function updateRequest(updatedRequest){
        //     if(updatedRequest != null){
        //         if(($scope.selectedIndex != -1) && (updatedRequest.name != null) &&
        //             (updatedRequest.username != null) && (updatedRequest.animal != null)
        //             && (updatedRequest.animalName != null) && (updatedRequest.status != null)){
        //             var selectedRequest = $scope.data[$scope.selectedIndex];
        //             var updatedRequestObj = {
        //                 "_id": selectedRequest._id,
        //                 "name": updatedRequest.name,
        //                 "username": updatedRequest.username,
        //                 "animal": updatedRequest.animal,
        //                 "animalName": updatedRequest.animalName,
        //                 "status": updatedRequest.status
        //             };
        //
        //             AdoptionRequestService.updateRequest(selectedRequest._id, updatedRequestObj, renderUpdatedRequest);
        //         }
        //     }
        // }
        //
        // function renderUpdatedRequest(response){
        //     $scope.data[$scope.selectedIndex] = response;
        //     $scope.request = null;
        //     $scope.selectedIndex = -1;
        // }
    }
})();