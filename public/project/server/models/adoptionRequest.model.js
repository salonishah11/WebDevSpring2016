var requestMock = require("./adoptionRequest.mock.json");
var q = require("q");

module.exports = function() {
    var api = {
        createRequest: createRequest,
        findAllRequestsByUserId: findAllRequestsByUserId,
        deleteRequestById: deleteRequestById
    };
    return api;

    function createRequest(newRequest){
        var deferred = q.defer();
        //var user = null;

        newRequest._id = (new Date()).getTime();
        requestMock.push(newRequest);

        deferred.resolve(newRequest);
        return deferred.promise;
        //return newUser;
    }


    function findAllRequestsByUserId(userId){
        var deferred = q.defer();
        var requests = [];

        for(var u in requestMock){
            //console.log(requestMock[u].user);
            if(requestMock[u].user._id == userId){
                 requests.push(requestMock[u]);
            }
        }
        // console.log("all requests");
        // console.log(requests);
        deferred.resolve(requests);
        return deferred.promise;
    }
    

    function deleteRequestById(requestId){
        //console.log("inside model " + userId);
        var deferred = q.defer();
        for(var u in requestMock){
            if(requestMock[u]._id == requestId){
                //console.log("inside if");
                requestMock.splice(u, 1);
                break;
            }
        }
        deferred.resolve(requestMock);
        return deferred.promise;
    }
};