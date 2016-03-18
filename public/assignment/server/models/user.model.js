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
        newUser._id = (new Date()).getTime();
        mock.push(newUser);
        return mock;
    }

    function findAllUsers(){
        return mock;
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
        console.log(credentials);
        for(var u in mock){
            if(mock[u].username === credentials.username && mock[u].password === credentials.password){
                return mock[u];
            }
        }
        return null;
    }
}