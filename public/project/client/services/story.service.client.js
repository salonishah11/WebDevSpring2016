(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .factory("StoryService", StoryService);

    function StoryService($http){

        var storyAPI = {
            // Function Declarations
            findAllStoriesByUserId: findAllStoriesByUserId,
            createStory: createStory,
            deleteStoryById: deleteStoryById,
            updateStoryById: updateStoryById
        };
        return storyAPI;

        function findAllStoriesByUserId(userId){
            //callback(stories);
            return $http.get("/api/project/story/user/" + userId);
        }


        function createStory(newStory){
            return $http.post("/api/project/story", newStory);
        }
        
        
        function deleteStoryById(storyId){
            return $http.delete("/api/project/story/" + storyId);
        }
        
        
        function updateStoryById(storyId, updatedStory){
            return $http.put("/api/project/story/" + storyId, updatedStory);
        }
    }
})();