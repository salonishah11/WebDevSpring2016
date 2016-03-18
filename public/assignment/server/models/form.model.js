var mock = require("./form.mock.json");

module.exports = function() {
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormByID: findFormByID,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle
    };
    return api;

    function createForm(newForm){

    }

    function findAllForms(){

    }

    function findFormByID(formID){

    }

    function updateForm(updatedForm, formID){

    }

    function deleteForm(formID){

    }

    function findFormByTitle(title){

    }
}