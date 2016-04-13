var q = require("q");

module.exports = function(db, mongoose) {
    // load user schema
    var UserSchema = require("./user.schema.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('projectUser', UserSchema);
    
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserByID: findUserByID,
        findUserByShelterId: findUserByShelterId,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(newUser){
        var deferred = q.defer();

        UserModel.create(newUser, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
        //return newUser;
    }

    function findAllUsers(){
        //console.log("inside model");
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

    function findUserByID(userId){
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

    function findUserByShelterId(shelterId) {
        // console.log(shelterId);
        var deferred = q.defer();

        UserModel.findOne(
            // first argument is predicate
            { shelterId: shelterId },
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

    function updateUser(userId, updatedUser){
        var deferred = q.defer();

        UserModel.update(
            { _id : userId},
            {
                $set: {
                    "name": updatedUser.name,
                    "email": updatedUser.email,
                    "password": updatedUser.password,
                    "streetAddress": updatedUser.streetAddress,
                    "city": updatedUser.city,
                    "state": updatedUser.state,
                    "country": updatedUser.country,
                    "zipcode": updatedUser.zipcode
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

    function deleteUserById(userId){
        //console.log("inside model " + userId);
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
            { username: username },
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
        //console.log("inside model");
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