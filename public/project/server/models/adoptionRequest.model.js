var requestMock = require("./adoptionRequest.mock.json");
var q = require("q");

module.exports = function(db, mongoose) {

    var AdoptionRequestSchema = require("./adoptionRequest.schema.js")(mongoose);
    
    var AdoptionRequestModel = mongoose.model('AdoptionRequest', AdoptionRequestSchema);
    
    
    var api = {
        createRequest: createRequest,
        findAllRequestsByUserId: findAllRequestsByUserId,
        findAllRequestsByShelterId: findAllRequestsByShelterId,
        findRequestById: findRequestById,
        deleteRequestById: deleteRequestById,
        updateRequestById: updateRequestById
    };
    return api;

    function createRequest(newRequest){
        var deferred = q.defer();

        AdoptionRequestModel
            .create(newRequest, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
        //return newUser;
    }


    function findAllRequestsByUserId(userId){
        var deferred = q.defer();

        AdoptionRequestModel.find(
            { userId: userId },
            // doc is unique instance matches predicate
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }


    function findAllRequestsByShelterId(shelterId){
        var deferred = q.defer();

        AdoptionRequestModel
            .find(function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    // deferred.resolve(doc);
                    var requests = [];
                    for(var u in doc){
                        if(doc[u].pet.shelterId == shelterId){
                            requests.push(doc[u]);
                        }
                    }
                    deferred.resolve(requests);
                }
            });

        // var requests = [];
        //
        // for(var u in requestMock){
        //     //console.log(requestMock[u].user);
        //     if(requestMock[u].pet.shelterId == shelterId){
        //         requests.push(requestMock[u]);
        //     }
        // }
        // // console.log("all requests");
        // // console.log(requests);
        // deferred.resolve(requests);
        return deferred.promise;
    }


    function findRequestById(requestId){
        //console.log("inside model");
        var deferred = q.defer();

        AdoptionRequestModel
            .findById(requestId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
    

    function deleteRequestById(requestId){
        //console.log("inside model " + userId);
        var deferred = q.defer();

        AdoptionRequestModel
            .remove(
            { _id : requestId}, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }


    function updateRequestById(requestId, updatedRequest){
        //console.log("inside model " + userId);
        var deferred = q.defer();

        AdoptionRequestModel
            .update(
            { _id : requestId},
            {
                $set: {
                    "status": updatedRequest.status
                }
            }, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }
};