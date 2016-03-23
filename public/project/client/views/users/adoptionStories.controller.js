(function() {
    angular
        .module("AdoptAPet")
        .controller("AdoptionStoriesController", AdoptionStoriesController);

    function AdoptionStoriesController($scope, AdoptionStoryService){
        $scope.addStory = addStory;
        $scope.updateStory = updateStory;
        $scope.deleteStory = deleteStory;
        $scope.selectStory = selectStory;

        $scope.selectedIndex = -1;

        AdoptionStoryService.findAllStories(renderAllStories);

        function renderAllStories(response){
            $scope.data = response;
        }


        function addStory(story){
            if(story!= null){
                if((story.title != null) && (story.description != null) && (story.username != null)){
                    //console.log("inside if");
                    var newStory = {
                        "_id": (new Date).getTime(),
                        "title": story.title,
                        "description": story.description,
                        "username": story.username
                    };

                    AdoptionStoryService.createStory(newStory, renderAddStory);
                }
            }
        }

        function renderAddStory(response){
            //console.log(response);
            AdoptionStoryService.findAllStories(renderAllStories);
            $scope.story = null;
        }


        function deleteStory(index){
            var selectedStory = $scope.data[index];
            AdoptionStoryService.deleteStoryById(selectedStory._id, renderAllStories);
        }


        function selectStory(index){
            $scope.selectedIndex = index;
            var selectedStory = $scope.data[index];
            $scope.story = {
                "_id": selectedStory._id,
                "title": selectedStory.title,
                "description": selectedStory.description,
                "username": selectedStory.username
            };
        }


        function updateStory(updatedStory){
            if(updatedStory != null){
                if(($scope.selectedIndex != -1) && (updatedStory.title != null) &&
                    (updatedStory.username != null) && (updatedStory.description != null)){
                    var selectedStory = $scope.data[$scope.selectedIndex];
                    var updatedStoryObj = {
                        "_id": selectedStory._id,
                        "title": updatedStory.title,
                        "description": updatedStory.description,
                        "username": updatedStory.username
                    };

                    AdoptionStoryService.updateStory(selectedStory._id, updatedStoryObj, renderUpdatedStory);
                }
            }
        }

        function renderUpdatedStory(response){
            $scope.data[$scope.selectedIndex] = response;
            $scope.story = null;
            $scope.selectedIndex = -1;
        }
    }
})();