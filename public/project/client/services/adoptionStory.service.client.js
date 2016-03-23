(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .factory("AdoptionStoryService", AdoptionStoryService);

    function AdoptionStoryService(){
        var stories = {};
        stories = [
            {"_id":123, "title":"Noah-Super Sweet Little Boy",
             "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt " +
             "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi " +
             "ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum " +
             "dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia " +
             "deserunt mollit anim id est laborum.",
             "username":"alice"},
            {"_id":234, "title":"Happy Tail",
             "description":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque " +
             "laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae " +
             "vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, " +
             "sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
             "username":"bob"},
            {"_id":345, "title":"Scrappy gets a home",
             "description":"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci " +
             "velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat " +
             "voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, " +
             "nisi ut aliquid ex ea commodi consequatur.",
             "username":"charlie"},
            {"_id":456, "title":"Max recovers and finds a new Home",
             "description":"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium " +
             "voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate " +
             "non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
             "username":"dan"}
        ];

        var storyAPI = {
            // Function Declarations
            //findUserByCredentials: findUserByCredentials,
            findAllStories: findAllStories,
            createStory: createStory,
            deleteStoryById: deleteStoryById,
            updateStory: updateStory
            //setCurrentUser: setCurrentUser,
            //getCurrentUser: getCurrentUser
        };
        return storyAPI;

        function findAllStories(callback){
            callback(stories);
        }


        function createStory(newStory, callback){
            stories.push(newStory);
            callback(newStory);
        }


        function deleteStoryById(storyId, callback){
            for(var i = 0; i < stories.length; i++){
                if(storyId == stories[i]._id){
                    stories.splice(i, 1);
                    callback(stories);
                }
            }
        }


        function updateStory(storyId, updatedStory, callback){
            for(var i = 0; i < stories.length; i++){
                if(storyId == stories[i]._id){
                    stories[i] = updatedStory;
                    callback(updatedStory);
                }
            }
            //console.log(users);
        }
    }
})();