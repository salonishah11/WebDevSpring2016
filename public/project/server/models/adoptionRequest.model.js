var requestMock = require("./adoptionRequest.mock.json");
var q = require("q");

module.exports = function() {
    var api = {
        createRequest: createRequest,
        // findAllUsers: findAllUsers,
        findAllRequestsByUserId: findAllRequestsByUserId,
        // updateUser: updateUser,
        // deleteUserById: deleteUserById,
        // findUserByUsername: findUserByUsername,
        // findUserByCredentials: findUserByCredentials
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

    function findAllUsers(){
        //console.log("inside model");
        var deferred = q.defer();

        deferred.resolve(userMock);
        return deferred.promise;
    }

    function findAllRequestsByUserId(userId){
        var deferred = q.defer();
        var requests = [];

        for(var u in requestMock){
            //console.log(requestMock[u].user);
            if(requestMock[u].user._id == userId){
                 requests.push(requestMock[u].pet);
            }
        }
        // console.log("all requests");
        // console.log(requests);
        deferred.resolve(requests);
        return deferred.promise;
    }

    function updateUser(userId, updatedUser){
        var deferred = q.defer();
        var user = null;

        for(var u in userMock){
            if(userMock[u]._id == userId){
                userMock[u] = updatedUser;
                user = userMock[u];
            }
        }
        //return null;

        deferred.resolve(user);
        return deferred.promise;
    }

    function deleteUserById(userId){
        console.log("inside model " + userId);
        var deferred = q.defer();
        for(var u in userMock){
            if(userMock[u]._id == userId){
                console.log("inside if");
                userMock.splice(u, 1);
                break;
            }
        }
        deferred.resolve(userMock);
        return deferred.promise;
    }

    function findUserByUsername(username){
        var deferred = q.defer();
        var user = null;
        for(var u in userMock){
            if(userMock[u].username === username){
                user = userMock[u];
            }
        }
        deferred.resolve(user);
        return deferred.promise;
    }

    function findUserByCredentials(credentials){
        //console.log("inside model");
        var deferred = q.defer();
        //console.log(credentials);
        var user = null;
        for(var u in userMock){
            if(userMock[u].username === credentials.username &&
                userMock[u].password === credentials.password){
                user = userMock[u];
            }
        }
        //console.log(user);
        deferred.resolve(user);
        return deferred.promise;
    }
};