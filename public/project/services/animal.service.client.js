(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .factory("AnimalService", AnimalService);

    function AnimalService(){
        var animals = {};
        animals = [
            {"_id":123, "name":"Tyro",   "type":"Dog",  "breed":"Labrador",             "gender": "Male"},
            {"_id":234, "name":"Maria",  "type":"Cat",  "breed":"Birman",               "gender": "Female"},
            {"_id":345, "name":"Emmy",   "type":"Dog",  "breed":"Golden Retriever",     "gender": "Female"},
            {"_id":456, "name":"Roger",  "type":"Dog",  "breed":"Terrier",              "gender": "Male"},
            {"_id":567, "name":"Oscar",  "type":"Cat",  "breed":"Domestic Short Hair",  "gender": "Male"}
        ];

        var animalAPI = {
            // Function Declarations
            //findUserByCredentials: findUserByCredentials,
            findAllAnimals: findAllAnimals,
            createAnimal: createAnimal,
            deleteAnimalById: deleteAnimalById,
            updateAnimal: updateAnimal
            //setCurrentUser: setCurrentUser,
            //getCurrentUser: getCurrentUser
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