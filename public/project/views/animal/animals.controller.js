(function() {
    angular
        .module("AdoptAPet")
        .controller("AnimalsController", AnimalsController);

    function AnimalsController($scope, AnimalService){
        $scope.addAnimal = addAnimal;
        $scope.updateAnimal = updateAnimal;
        $scope.deleteAnimal = deleteAnimal;
        $scope.selectAnimal = selectAnimal;

        $scope.selectedIndex = -1;

        AnimalService.findAllAnimals(renderAllAnimals);

        function renderAllAnimals(response){
            $scope.data = response;
        }


        function addAnimal(animal){
            if(animal!= null){
                if((animal.name != null) && (animal.type != null)
                    && (animal.breed != null) && (animal.gender != null)){
                    var newAnimal = {
                        "_id": (new Date).getTime(),
                        "name": animal.name,
                        "type": animal.type,
                        "breed": animal.breed,
                        "gender": animal.gender
                    };

                    AnimalService.createAnimal(newAnimal, renderAddAnimal);
                }
            }
        }

        function renderAddAnimal(response){
            //console.log(response);
            AnimalService.findAllAnimals(renderAllAnimals);
            $scope.animal = null;
        }


        function deleteAnimal(index){
            var selectedAnimal = $scope.data[index];
            AnimalService.deleteAnimalById(selectedAnimal._id, renderAllAnimals);
        }


        function selectAnimal(index){
            $scope.selectedIndex = index;
            var selectedAnimal = $scope.data[index];
            $scope.animal = {
                "_id": selectedAnimal._id,
                "name": selectedAnimal.name,
                "type": selectedAnimal.type,
                "breed": selectedAnimal.breed,
                "gender": selectedAnimal.gender};
        }


        function updateAnimal(updatedAnimal){
            if(updatedAnimal != null){
                if(($scope.selectedIndex != -1) && (updatedAnimal.name != null) &&
                    (updatedAnimal.type != null) && (updatedAnimal.breed != null) &&
                    (updatedAnimal.gender != null)){
                    console.log("inside if");
                    var selectedAnimal = $scope.data[$scope.selectedIndex];
                    var updatedAnimalObj = {
                        "_id": selectedAnimal._id,
                        "name": updatedAnimal.name,
                        "type": updatedAnimal.type,
                        "breed": updatedAnimal.breed,
                        "gender": updatedAnimal.gender
                    };

                    AnimalService.updateAnimal(selectedAnimal._id, updatedAnimalObj, renderUpdatedAnimal);
                }
            }
        }

        function renderUpdatedAnimal(response) {
            $scope.data[$scope.selectedIndex] = response;
            $scope.animal = null;
            $scope.selectedIndex = -1;
        }
    }
})();