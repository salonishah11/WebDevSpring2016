var userMock = require("./user.mock.json");
var q = require("q");

module.exports = function() {
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserByID: findUserByID,
        findUserByShelterId: findUserByShelterId,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(newUser){
        var deferred = q.defer();
        //var user = null;

        newUser._id = (new Date()).getTime();
        userMock.push(newUser);

        deferred.resolve(newUser);
        return deferred.promise;
        //return newUser;
    }

    function findAllUsers(){
        //console.log("inside model");
        var deferred = q.defer();

        deferred.resolve(userMock);
        return deferred.promise;
    }

    function findUserByID(userId){
        var deferred = q.defer();
        var user = null;

        for(var u in userMock){
            if(userMock[u]._id == userId){
                user =  userMock[u];
            }
        }
        deferred.resolve(user);
        return deferred.promise;
    }

    function findUserByShelterId(shelterId) {
        console.log(shelterId);
        var deferred = q.defer();
        var user = null;

        for(var u in userMock){
            if(userMock[u].shelterId == shelterId){
                user =  userMock[u];
            }
        }
        deferred.resolve(user);
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
            console.log(u + "- " + userMock[u]._id);
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