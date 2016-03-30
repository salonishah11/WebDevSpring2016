var mock = require("./user.mock.json");
var q = require("q");

module.exports = function() {
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserByID: findUserByID,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(newUser){
        var deferred = q.defer();

        newUser._id = (new Date()).getTime();
        mock.push(newUser);

        deferred.resolve(newUser);
        return deferred.promise;
    }

    function findAllUsers(){
        var deferred = q.defer();

        deferred.resolve(mock);
        return deferred.promise;
    }

    function findUserByID(userId){
        var deferred = q.defer();
        var user = null;

        for(var u in mock){
            if(mock[u]._id == userId){
                user = mock[u];
            }
        }

        deferred.resolve(user);
        return deferred.promise;
    }

    function updateUser(userId, updatedUser){
        var deferred = q.defer();

        for(var u in mock){
            if(mock[u]._id == userId){
                mock[u] = updatedUser;
            }
        }

        deferred.resolve(updatedUser);
        return deferred.promise;
    }

    function deleteUser(userID){
        var deferred = q.defer();

        for(var i = 0; i < mock.length; i++){
            if(userId == mock[i]._id){
                mock.splice(i, 1);
                break;
            }
        }

        deferred.resolve(mock);
        return deferred.promise;
    }

    function findUserByUsername(username){
        var deferred = q.defer();
        var user = null;

        for(var u in mock){
            if(mock[u].username === username){
                user = mock[u];
            }
        }

        deferred.resolve(user);
        return deferred.promise;
    }

    function findUserByCredentials(credentials){
        var deferred = q.defer();
        var user = null;

        for(var u in mock){
            if(mock[u].username === credentials.username &&
                mock[u].password === credentials.password){
                user = mock[u];
            }
        }

        deferred.resolve(user);
        return deferred.promise;
    }
};