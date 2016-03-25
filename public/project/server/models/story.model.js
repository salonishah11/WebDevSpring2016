var storyMock = require("./story.mock.json");
var q = require("q");

module.exports = function() {
    var api = {
        createStory: createStory,
        findAllStoriesByUserId: findAllStoriesByUserId,
        updateStoryById: updateStoryById,
        deleteStoryById: deleteStoryById
    };
    return api;

    function createStory(newStory){
        var deferred = q.defer();
        //var user = null;

        newStory._id = (new Date()).getTime();
        storyMock.push(newStory);

        deferred.resolve(newStory);
        return deferred.promise;
        //return newUser;
    }


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
};