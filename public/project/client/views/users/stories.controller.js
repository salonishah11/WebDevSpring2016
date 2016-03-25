(function() {
    angular
        .module("AdoptAPet")
        .controller("StoriesController", StoriesController);

    function StoriesController($location, StoryService, UserService){
        var vm = this;

        vm.deleteStory = deleteStory;
        vm.updateStory = updateStory;
        vm.selectStory = selectStory;

        //$scope.selectedIndex = -1;
        //
        function init(){
            if(UserService.getCurrentUser()){
                StoryService
                    .findAllStoriesByUserId(UserService.getCurrentUser()._id)
                    .then(function(response){
                        //console.log(response.data[0].pet);
                        vm.data = response.data;
                    });
            }
            else{
                $location.path('/login');
            }
        }
        init();
        
        
        function deleteStory(index){
            var selectedStory = vm.data[index];
            //console.log(selectedRequest)
            StoryService
                .deleteStoryById(selectedStory._id)
                .then(function(response){
                    if(response){
                        //console.log(response.data);
                        init();
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
        //
        // function renderUpdatedRequest(response){
        //     $scope.data[$scope.selectedIndex] = response;
        //     $scope.request = null;
        //     $scope.selectedIndex = -1;
        // }
    }
})();