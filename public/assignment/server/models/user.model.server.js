var mock = require("./user.mock.json");
var q = require("q");

module.exports = function(db, mongoose) {
    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(newUser){
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.create(newUser, function (err, doc) {
        //console.log(newUser);
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

    function findAllUsers(){
        var deferred = q.defer();

        UserModel.find(function(err, doc){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId){
        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateUser(userId, updatedUser){
        var deferred = q.defer();

        UserModel.update(
            { _id : userId},
            {
                $set: {
                    "password": updatedUser.password,
                    "firstName": updatedUser.firstName,
                    "lastName": updatedUser.lastName,
                    "emails": updatedUser.emails
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

    function deleteUser(userId){
        var deferred = q.defer();

        UserModel.remove(
            { _id : userId}, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function findUserByUsername(username){
        var deferred = q.defer();

        UserModel.findOne(

            // first argument is predicate
            { username: username },

            // doc is unique instance matches predicate
            function(err, doc) {

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

    function findUserByCredentials(credentials){
        var deferred = q.defer();

        UserModel.findOne(
            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

            // doc is unique instance matches predicate
            function(err, doc) {

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
};