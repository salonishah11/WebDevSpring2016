(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .factory("AdoptionRequestService", AdoptionRequestService);

    function AdoptionRequestService($http){
        var requests = {};
        requests = [
            {"_id":123, "name":"Alice",   "username":"alice",  "animal":"Dog",
             "animalName":"Noah" ,     "status": "Pending"},
            {"_id":234, "name":"Bob",   "username":"bob",  "animal":"Cat",
             "animalName":"Carlos" ,     "status": "Pending"},
            {"_id":345, "name":"Charlie",   "username":"charlie",  "animal":"Bird",
             "animalName":"Max" ,     "status": "Pending"},
            {"_id":456, "name":"Dan",   "username":"dan",  "animal":"Dog",
             "animalName":"Roger" ,     "status": "Approved"}
        ];

        var requestAPI = {
            // Function Declarations
            findAllRequestsByUserId: findAllRequestsByUserId,
            createRequest: createRequest,
            // deleteRequestById: deleteRequestById,
            // updateRequest: updateRequest
        };
        return requestAPI;

        function findAllRequestsByUserId(userId){
            //callback(requests);
            return $http.get("/api/project/adoptionRequest/user/" + userId);
        }


        function createRequest(newRequest){
            // requests.push(newRequest);
            // callback(newRequest);
            return $http.post("/api/project/adoptionRequest", newRequest);
        }


        function deleteRequestById(requestId, callback){
            for(var i = 0; i < requests.length; i++){
                if(requestId == requests[i]._id){
                    requests.splice(i, 1);
                    callback(requests);
                }
            }
        }


        function updateRequest(requestId, updatedRequest, callback){
            for(var i = 0; i < requests.length; i++){
                if(requestId == requests[i]._id){
                    requests[i] = updatedRequest;
                    callback(updatedRequest);
                }
            }
            //console.log(users);
        }
    }
})();