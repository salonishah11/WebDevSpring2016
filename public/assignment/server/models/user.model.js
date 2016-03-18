var mock = require("./user.mock.json");

module.exports = function() {
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserByID: findUserByID,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(newUser){

    }

    function findAllUsers(){

    }

    function findUserByID(userID){

    }

    function updateUser(updatedUser, userID){

    }

    function deleteUser(userID){

    }

    function findUserByUsername(username){

    }

    function findUserByCredentials(credentials){

    }
}