var q = require("q");

module.exports = function(db, mongoose) {
    // load user schema
    var StorySchema = require("./story.schema.js")(mongoose);

    // create user model from schema
    var StoryModel = mongoose.model('Story', StorySchema);

    var api = {
        createStory: createStory,
        findAllStoriesByUserId: findAllStoriesByUserId,
        updateStoryById: updateStoryById,
        deleteStoryById: deleteStoryById
    };
    return api;

    function createStory(newStory){
        var deferred = q.defer();

        StoryModel
            .create(newStory, function (err, doc) {
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


    function findAllStoriesByUserId(userId){
        var deferred = q.defer();

        StoryModel.find(
            { userId: userId },
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

    function updateStoryById(storyId, updatedStory){
        var deferred = q.defer();

        StoryModel.update(
            { _id : storyId},
            {
                $set: {
                    "title": updatedStory.title,
                    "description": updatedStory.description
                }
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function deleteStoryById(storyId){
        //console.log("inside model " + userId);
        var deferred = q.defer();

        StoryModel.remove(
            { _id : storyId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }
};