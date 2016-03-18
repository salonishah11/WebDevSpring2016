(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    // stores data of all forms
    var forms = {};
    forms = [
        {"_id": "000", "title": "Contacts", "userId": 123},
        {"_id": "010", "title": "ToDo",     "userId": 123},
        {"_id": "020", "title": "CDs",      "userId": 234}
    ];


    function FormService() {
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
        function createFormForUser(userId, form, callback){
            var newForm = {
                "_id": (new Date).getTime(),
                "title": form.title,
                "userId": userId
            };
            forms.push(newForm);
            callback(newForm);
        }

        // finds all the forms of a particular user
        function findAllFormsForUser(userId, callback){
            var userForms = [];
            for(var i = 0; i < forms.length; i++){
                if(forms[i].userId == userId){
                    userForms.push(forms[i]);
                }
            }
            callback(userForms);
        }

        // updates a form given a formId
        function updateFormById(formId, newForm, callback){
            for(var i = 0; i < forms.length; i++){
                if(forms[i]._id == formId){
                    forms[i] = newForm;
                    break;
                }
            }
            //findAllFormsForUser($rootScope._id, callback);
            callback(newForm);
        }

        // deletes a form given a formId
        function deleteFormById(formId, callback){
            for(var i = 0; i < forms.length; i++){
                if(forms[i]._id == formId){
                    forms.splice(i, 1);
                    break;
                }
            }
            //findAllFormsForUser($rootScope._id, callback);
            callback(forms);
        }
    }
})();