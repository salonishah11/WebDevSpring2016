var userMock = require("./user.mock.json");
var q = require("q");

module.exports = function() {
    var api = {
        createUser: createUser,
        // findAllUsers: findAllUsers,
        // findUserByID: findUserByID,
        updateUser: updateUser,
        // deleteUser: deleteUser,
        // findUserByUsername: findUserByUsername,
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

        for(var u in mock){
            if(userMock[u]._id == userId){
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

    function deleteUser(userID){
        var deferred = q.defer();
        for(var i = 0; i < userMock.length; i++){
            if(userId == userMock[i]._id){
                userMock.splice(i, 1);
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