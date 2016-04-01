var q = require("q");

module.exports = function(app, db, mongoose) {
    // load user schema
    var FormSchema = require("./form.schema.server.js")(mongoose);

    // create user model from schema
    var FormModel = mongoose.model('Form', FormSchema);
    
    var FieldModel = require('./field.model.server.js')(db, FormModel);
    var fieldService = require("../services/field.service.server")(app, FieldModel);

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormByID: findFormByID,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormByUserId: findFormByUserId
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

        // var form = {
        //     "_id" : updatedForm._id,
        //     "userId": updatedForm.userId,
        //     "title": updatedForm.title,
        //     "fields": updatedForm.fields,
        //     "updated": new Date()
        // };

        FormModel.update(
            { _id : formId},
            { $set: {
                "title": updatedForm.title,
                "fields": updatedForm.fields,
                "updated": new Date()
            }
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
};