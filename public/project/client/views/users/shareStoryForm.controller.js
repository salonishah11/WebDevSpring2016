(function() {
    angular
        .module("AdoptAPet")
        .controller("AddStoryController", AddStoryController);

    function AddStoryController($location, StoryService, UserService){
        var vm = this;

        vm.addStory = addStory;

        function init(){
            if(!UserService.getCurrentUser()){
                $location.path('/login');
            }
        }
        init();


        function addStory(story){
           UserService
               .getCurrentUser()
               .then(function (response) {
                   if(response.data){
                       var currentUser = response.data;

                       var storyObj = {
                           "userId": currentUser._id,
                           "username": currentUser.username,
                           "title": story.title,
                           "dateCreated": new Date(),
                           "description": story.description
                       };
                       StoryService
                           .createStory(storyObj)
                           .then(function(response){
                               if(response){
                                   alert("Story Shared Successfully!");
                                   $location.path('viewStories');
                               }
                           });
                   }
               });
        }


        function selectStory(index){
            vm.selectedIndex = index;
            var selectedStory = vm.data[index];
            //console.log(selectedStory);
            vm.story = {
                "_id": selectedStory._id,
                "title": selectedStory.title,
                "description": selectedStory.description,
                "dateCreated": selectedStory.dateCreated,
                "userId": selectedStory.userId,
                "username": selectedStory.username
            };
        }


        function updateStory(updatedStory){
            if(updatedStory != null){
                if(vm.selectedIndex != -1){
                    var selectedStory = vm.data[vm.selectedIndex];
                    var updatedStoryObj = {
                        "_id": selectedStory._id,
                        "userId": selectedStory.userId,
                        "username": selectedStory.username,
                        "title": updatedStory.title,
                        "dateCreated": selectedStory.dateCreated,
                        "description": updatedStory.description
                    };

                    StoryService
                        .updateStoryById(selectedStory._id, updatedStoryObj)
                        .then(function(response){
                            if(response){
                                vm.data[vm.selectedIndex] = response.data;
                                vm.story = null;
                                vm.selectedIndex = -1;
                            }
                        });
                }
            }
        }
    }
})();