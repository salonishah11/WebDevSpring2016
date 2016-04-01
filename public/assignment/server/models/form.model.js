var mock = require("./form.mock.json");
var q = require("q");

module.exports = function(db, mongoose) {
    // load user schema
    var FormSchema = require("./form.schema.server.js")(mongoose);

    // create user model from schema
    var FormModel = mongoose.model('Form', FormSchema);

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

        var formObj = {
            "userId": userId,
            "title": newForm.title,
            "fields": [],
            "created": new Date(),
            "updated": new Date()
        };

        FormModel.create(formObj, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllForms(){
        var deferred = q.defer();

        FormModel.find(function(err, doc){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findFormByID(formId){
        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateForm(formId, updatedForm){
        var deferred = q.defer();

        var form = {
            "_id" : updatedForm._id,
            "userId": updatedForm.userId,
            "title": updatedForm.title,
            "fields": updatedForm.fields,
            "updated": new Date()
        };

        FormModel.update(
            { _id : formId},
            { $set: form
            }, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function deleteForm(formId){
        var deferred = q.defer();

        FormModel.remove(
            { _id : formId}, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function findFormByTitle(title){
        var deferred = q.defer();

        FormModel.find({title: title}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findFormByUserId(userId) {
        var deferred = q.defer();

        FormModel.find({userId: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }


    //Field Service
    function getFieldsForForm(formId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc.fields);
            }
        });

        return deferred.promise;
    }


    function getFieldForForm(formId, fieldId){
        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                // deferred.resolve(doc.fields);
                var fields = doc.fields;
                for(var i in fields){
                    if(fields[i]._id == fieldId){
                        deferred.resolve(fields[i]);
                    }
                }
            }
        });

        return deferred.promise;
    }

    function deleteFieldFromForm(formId, fieldId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                var form = doc;
                for(var i in form.fields){
                    if(form.fields[i]._id == fieldId){
                        form.fields.splice(i,1);
                        FormModel.update(
                            { _id : formId},
                            { $set: form
                            }, function (err, doc) {
                                if (err) {
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve(doc);
                                }
                            });
                    }
                }
            }
        });

        return deferred.promise;
    }

    function createFieldForForm(formId, newField) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                var form = doc;
                form.fields.push(newField);
                FormModel.update(
                    { _id : formId},
                    { $set: form
                    }, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });

            }
        });

        return deferred.promise;
    }

    function updateField(formId, fieldId, updatedField) {
        var deferred = q.defer();

        // LOOP:
        // for(var f in mock){
        //     if(mock[f]._id == formId){
        //         for(var i in mock[f].fields){
        //             if(mock[f].fields[i]._id == fieldId){
        //                 mock[f].fields[i] = updatedField;
        //                 break LOOP;
        //             }
        //         }
        //     }
        // }
        //
        // deferred.resolve(updatedField);

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                var form = doc;
                for(var i in form.fields){
                    if(form.fields[i]._id == fieldId){
                        form.fields[i] = updatedField;
                        FormModel.update(
                            { _id : formId},
                            { $set: form
                            }, function (err, doc) {
                                if (err) {
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve(doc);
                                }
                            });
                    }
                }
            }
        });
        
        return deferred.promise;
    }
};