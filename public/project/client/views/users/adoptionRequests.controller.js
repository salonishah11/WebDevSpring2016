(function() {
    angular
        .module("AdoptAPet")
        .controller("AdoptionRequestsController", AdoptionRequestsController);

    function AdoptionRequestsController($location, AdoptionRequestService, UserService){
        var vm = this;
        
        // $scope.addRequest = addRequest;
        vm.deleteRequest = deleteRequest;
        // $scope.updateRequest = updateRequest;
        // $scope.selectRequest = selectRequest;

        //$scope.selectedIndex = -1;
        
        function init(){
            if(UserService.getCurrentUser()){
                AdoptionRequestService
                    .findAllRequestsByUserId(UserService.getCurrentUser()._id)
                    .then(function(response){
                        //console.log(response.data);
                        vm.data = response.data;
                    });
            }
            else{
                $location.path('/login');
            }
        }
        init();



        // function addRequest(request){
        //     if(request!= null){
        //         if((request.name != null) && (request.username != null) && (request.animal != null) &&
        //             (request.animalName != null) && (request.status != null)){
        //             //console.log("inside if");
        //             var newRequest = {
        //                 "_id": (new Date).getTime(),
        //                 "name": request.name,
        //                 "username": request.username,
        //                 "animal": request.animal,
        //                 "animalName": request.animalName,
        //                 "status": request.status
        //             };
        //
        //             AdoptionRequestService.createRequest(newRequest, renderAddRequest);
        //         }
        //     }
        // }
        //
        // function renderAddRequest(response){
        //     //console.log(response);
        //     AdoptionRequestService.findAllRequests(renderAllRequests);
        //     $scope.request = null;
        // }


        function deleteRequest(index){
            var selectedRequest = $scope.data[index];
            AdoptionRequestService.deleteRequestById(selectedRequest._id, renderAllRequests);
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