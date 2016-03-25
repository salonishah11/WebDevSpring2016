var storyMock = require("./story.mock.json");
var q = require("q");

module.exports = function() {
    var api = {
        // createUser: createUser,
        // findAllUsers: findAllUsers,
        findAllStoriesByUserId: findAllStoriesByUserId,
        updateStoryById: updateStoryById,
        deleteStoryById: deleteStoryById,
        // findUserByUsername: findUserByUsername,
        // findUserByCredentials: findUserByCredentials
    };
    return api;

    // function createUser(newUser){
    //     var deferred = q.defer();
    //     //var user = null;
    //
    //     newUser._id = (new Date()).getTime();
    //     userMock.push(newUser);
    //
    //     deferred.resolve(newUser);
    //     return deferred.promise;
    //     //return newUser;
    // }
    //
    // function findAllUsers(){
    //     //console.log("inside model");
    //     var deferred = q.defer();
    //
    //     deferred.resolve(userMock);
    //     return deferred.promise;
    // }

    function findAllStoriesByUserId(userId){
        var deferred = q.defer();
        var stories = [];

        for(var u in storyMock){
            if(storyMock[u].userId == userId){
                stories.push(storyMock[u]);
            }
        }
        //console.log(stories);
        deferred.resolve(stories);
        return deferred.promise;
    }

    function updateStoryById(storyId, updatedStory){
        var deferred = q.defer();
        var story = null;

        for(var u in storyMock){
            if(storyMock[u]._id == storyId){
                storyMock[u] = updatedStory;
                story = storyMock[u];
            }
        }
        //return null;

        deferred.resolve(story);
        return deferred.promise;
    }

    function deleteStoryById(storyId){
        //console.log("inside model " + userId);
        var deferred = q.defer();
        for(var u in storyMock){
            //console.log(u + "- " + userMock[u]._id);
            if(storyMock[u]._id == storyId){
                //console.log("inside if");
                storyMock.splice(u, 1);
                break;
            }
        }
        deferred.resolve(storyMock);
        return deferred.promise;
    }

    // function findUserByUsername(username){
    //     var deferred = q.defer();
    //     var user = null;
    //     for(var u in userMock){
    //         if(userMock[u].username === username){
    //             user = userMock[u];
    //         }
    //     }
    //     deferred.resolve(user);
    //     return deferred.promise;
    // }
    //
    // function findUserByCredentials(credentials){
    //     //console.log("inside model");
    //     var deferred = q.defer();
    //     //console.log(credentials);
    //     var user = null;
    //     for(var u in userMock){
    //         if(userMock[u].username === credentials.username &&
    //             userMock[u].password === credentials.password){
    //             user = userMock[u];
    //         }
    //     }
    //     //console.log(user);
    //     deferred.resolve(user);
    //     return deferred.promise;
    // }
};