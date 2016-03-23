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
    //
    // function findAllUsers(){
    //     console.log("inside model");
    //     return mock;
    // }
    //
    // function findUserByID(userId){
    //     for(var u in mock){
    //         if(mock[u]._id == userId){
    //             return mock[u];
    //         }
    //     }
    //     return null;
    // }
    //
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

    // function deleteUser(userID){
    //     for(var i = 0; i < mock.length; i++){
    //         if(userId == mock[i]._id){
    //             mock.splice(i, 1);
    //             return mock;
    //         }
    //     }
    //     return null;
    // }
    //
    // function findUserByUsername(username){
    //     for(var u in mock){
    //         if(mock[u].username === username){
    //             return mock[u];
    //         }
    //     }
    //     return null;
    // }

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