(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .factory("AdoptionRequestService", AdoptionRequestService);

    function AdoptionRequestService($http){

        var requestAPI = {
            // Function Declarations
            findAllRequestsByUserId: findAllRequestsByUserId,
            findRequestById:findRequestById, 
            createRequest: createRequest,
            deleteRequestById: deleteRequestById,
            updateRequestById: updateRequestById
        };
        return requestAPI;

        function findAllRequestsByUserId(userId){
            //callback(requests);
            return $http.get("/api/project/adoptionRequest/user/" + userId);
        }
        
        
        function findRequestById(requestId){
            return $http.get("/api/project/adoptionRequest/request/" + requestId);
        }


        function createRequest(newRequest){
            // requests.push(newRequest);
            // callback(newRequest);
            return $http.post("/api/project/adoptionRequest", newRequest);
        }


        function deleteRequestById(requestId){
            return $http.delete("/api/project/adoptionRequest/request/" + requestId);
        }


        function updateRequestById(requestId, user){
            return $http.put("/api/project/adoptionRequest/request/" + requestId, user);
        }
    }
})();