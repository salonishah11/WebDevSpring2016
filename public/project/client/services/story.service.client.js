(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .factory("StoryService", StoryService);

    function StoryService($http){

        var storyAPI = {
            // Function Declarations
            findAllStoriesByUserId: findAllStoriesByUserId,
            findAllStories: findAllStories,
            createStory: createStory,
            deleteStoryById: deleteStoryById,
            updateStoryById: updateStoryById
        };
        return storyAPI;

        function findAllStoriesByUserId(userId){
            return $http.get("/api/project/story/user/" + userId);
        }
        
        
        function findAllStories(){
            return $http.get("/api/project/story");
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