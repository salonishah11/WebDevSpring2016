(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {
        var fieldAPI = {
            // Function Declarations
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };
        return fieldAPI;


        // Function Implementations
        // creates a new form for the given User
        function createFieldForForm(formId, field){
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        // finds all the forms of a particular user
        function getFieldsForForm(formId){
            return $http.get("/api/assignment/form/"+ formId + "/field");
        }

        // updates a form given a formId
        function getFieldForForm(formId, fieldId){
            //console.log("inside client service");
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        // deletes a form given a formId
        function deleteFieldFromForm(formId, fieldId){
            //console.log("inside client service");/
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }
        
        function updateField(formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }
    }
})();