(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .factory("AnimalService", AnimalService);

    function AnimalService($http){

        var animalAPI = {
            findAllAnimals: findAllAnimals,
            createAnimal: createAnimal,
            deleteAnimalById: deleteAnimalById,
            updateAnimal: updateAnimal
        };
        return animalAPI;

        function findAllAnimals(callback){
            callback(animals);
        }


        function createAnimal(newAnimal, callback){
            animals.push(newAnimal);
            callback(newAnimal);
        }


        function deleteAnimalById(animalId, callback){
            for(var i = 0; i < animals.length; i++){
                if(animalId == animals[i]._id){
                    animals.splice(i, 1);
                    callback(animals);
                }
            }
        }


        function updateAnimal(animalId, updatedAnimal, callback){
            for(var i = 0; i < animals.length; i++){
                if(animalId == animals[i]._id){
                    animals[i] = updatedAnimal;
                    callback(updatedAnimal);
                }
            }
        }
    }
})();