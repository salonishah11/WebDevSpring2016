var mock = require("./form.mock.json");
var q = require("q");

module.exports = function() {
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormByID: findFormByID,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormByUserId: findFormByUserId,

        getFieldsForForm: getFieldsForForm,
        getFieldForForm: getFieldForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        createFieldForForm: createFieldForForm,
        updateField: updateField
    };
    return api;

    function createForm(userId, newForm){
        var deferred = q.defer();

        newForm._id = (new Date()).getTime();
        newForm.userId = userId;
        mock.push(newForm);

        deferred.resolve(mock);
        return deferred.promise;
    }

    function findAllForms(){
        var deferred = q.defer();

        deferred.resolve(mock);
        return deferred.promise;
    }

    function findFormByID(formId){
        var deferred = q.defer();
        var form = null;

        for(var f in mock){
            if(mock[f]._id == formId){
                form = mock[f];
            }
        }

        deferred.resolve(form);
        return deferred.promise;
    }

    function updateForm(formId, updatedForm){
        var deferred = q.defer();
        var updatedFormObj = null;

        var form = {
            "_id" : updatedForm._id,
            "title": updatedForm.title,
            "userId": updatedForm.userId,
            "fields": findFormByID(formId).fields
        };
        for(var f in mock){
            if(mock[f]._id == formId){
                mock[f] = form;
                //console.log(mock[f]);
                updatedFormObj = mock[f];
            }
        }

        deferred.resolve(updatedFormObj);
        return deferred.promise;
    }

    function deleteForm(formID){
        var deferred = q.defer();

        for(var f in mock){
            if(formID == mock[f]._id){
                //console.log("inside if");
                mock.splice(f, 1);
                break;
            }
        }

        deferred.resolve(mock);
        return deferred.promise;
    }

    function findFormByTitle(title){
        var deferred = q.defer();
        var form = null;

        for(var f in mock){
            if(mock[f].title == title){
                form = mock[f];
            }
        }

        deferred.resolve(form);
        return deferred.promise;
    }

    function findFormByUserId(userId) {
        var deferred = q.defer();
        var userForms = [];

        for(var f in mock){
            if(mock[f].userId == userId){
                userForms.push(mock[f]);
            }
        }

        deferred.resolve(userForms);
        return deferred.promise;
    }


    //Field Service
    function getFieldsForForm(formId) {
        var deferred = q.defer();
        var fields = null;

        for(var f in mock){
            if(mock[f]._id == formId){
                fields = mock[f].fields;
            }
        }

        deferred.resolve(fields);
        return deferred.promise;
    }


    function getFieldForForm(formId, fieldId){
        var deferred = q.defer();
        var field = null;

        for(var f in mock){
            if(mock[f]._id == formId){
                for(var i in mock[f].fields){
                    if(mock[f].fields[i]._id == fieldId){
                        field = mock[f].fields[i];
                    }
                }
            }
        }

        deferred.resolve(field);
        return deferred.promise;
    }

    function deleteFieldFromForm(formId, fieldId) {
        var deferred = q.defer();

        LOOP:
        for(var f in mock){
            if(mock[f]._id == formId){
                for(var i in mock[f].fields){
                    if(mock[f].fields[i]._id == fieldId){
                        mock[f].fields.splice(i, 1);
                        break LOOP;
                    }
                }
            }
        }

        deferred.resolve(mock);
        return deferred.promise;
    }

    function createFieldForForm(formId, newField) {
        var deferred = q.defer();

        for(var f in mock) {
            if (mock[f]._id == formId) {
                mock[f].fields.push(newField);
                break;
            }
        }

        deferred.resolve(mock);
        return deferred.promise;
    }

    function updateField(formId, fieldId, updatedField) {
        var deferred = q.defer();

        LOOP:
        for(var f in mock){
            if(mock[f]._id == formId){
                for(var i in mock[f].fields){
                    if(mock[f].fields[i]._id == fieldId){
                        mock[f].fields[i] = updatedField;
                        break LOOP;
                    }
                }
            }
        }

        deferred.resolve(updatedField);
        return deferred.promise;
    }
};