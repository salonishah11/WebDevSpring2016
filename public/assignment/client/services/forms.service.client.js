(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);
    
    function FormService($http, $rootScope) {
        var formAPI = {
            // Function Declarations
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return formAPI;


        // Function Implementations

        // creates a new form for the given User
        function createFormForUser(userId, form){
            var newForm = {
                "_id": (new Date).getTime(),
                "title": form.title,
                "userId": userId
            };
            return $http.post("/api/assignment/user/" + userId + "/form", newForm);
        }

        // finds all the forms of a particular user
        function findAllFormsForUser(userId){
            return $http.get("/api/assignment/user/"+ userId + "/form");
        }

        // updates a form given a formId
        function updateFormById(formId, updatedForm){
            //console.log("inside client service");
            return $http.put("/api/assignment/form/" + formId, updatedForm);
        }

        // deletes a form given a formId
        function deleteFormById(formId){
            //console.log("inside client service");
            return $http.delete("/api/assignment/form/" + formId);
        }
    }
})();