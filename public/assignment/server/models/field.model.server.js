var q = require("q");

module.exports = function(db, FormModel) {

    var api = {
        getFieldsForForm: getFieldsForForm,
        getFieldForForm: getFieldForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        createFieldForForm: createFieldForForm,
        updateField: updateField,
        sortField: sortField
    };
    return api;


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
                            { $set: {
                                "fields": form.fields
                            }
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
                    { $set: {
                        "fields": form.fields
                    }
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
        // var deferred = q.defer();
        //
        // FormModel.findById(formId, function (err, doc) {
        //     if (err) {
        //         deferred.reject(err);
        //     } else {
        //         var form = doc;
        //         for(var i in form.fields){
        //             if(form.fields[i]._id == fieldId){
        //                 form.fields[i] = updatedField;
        //                 FormModel.update(
        //                     { _id : formId},
        //                     { $set: {
        //                         "fields": form.fields
        //                     }
        //                     }, function (err, doc) {
        //                         if (err) {
        //                             deferred.reject(err);
        //                         } else {
        //                             deferred.resolve(doc);
        //                         }
        //                     });
        //             }
        //         }
        //     }
        // });
        //
        // return deferred.promise;

        var deferred = q.defer();
        var form = null;

        FormModel.find({_id : formId}, function (err,results){
            if(!err) {
                form = results[0];
                for(var i in form.fields){
                    if(form.fields[i]._id == fieldId){
                        form.fields[i] = updatedField;
                        break;
                    }
                }

                FormModel.update(
                    {_id : formId},

                    {$set: {
                        "fields": form.fields
                    }},

                    function (err,results){
                        if(!err) {
                            deferred.resolve(results);
                        }
                        else {
                            deferred.resolve(null);
                        }
                    });
            }
            else{
                deferred.resolve(null);
            }
        });
        return deferred.promise;
    }

    function sortField(formId, startIndex, endIndex) {
        var deferred = q.defer();

        FormModel.findById(formId, function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                var form=doc;
                form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);

                FormModel.update(
                    {_id: formId},
                    {$set:{
                        "fields":form.fields
                    }},function (err,doc){
                        if(err){
                            deferred.reject(error);
                        }
                        else {
                            deferred.resolve(doc);
                        }
                    }
                );
            }
        });
        return deferred.promise;
    }
};