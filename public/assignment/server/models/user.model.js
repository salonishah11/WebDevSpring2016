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
        return newUser;
    }

    function findAllUsers(){
        console.log("inside model");
        return mock;
    }

    function findUserByID(userId){
        for(var u in mock){
            if(mock[u]._id == userId){
                return mock[u];
            }
        }
        return null;
    }

    function updateUser(userId, updatedUser){
        for(var u in mock){
            if(mock[u]._id == userId){
                mock[u] = updatedUser;
            }
        }
        return null;
    }

    function deleteUser(userID){
        for(var i = 0; i < mock.length; i++){
            if(userId == mock[i]._id){
                mock.splice(i, 1);
                return mock;
            }
        }
        return null;
    }

    function findUserByUsername(username){
        for(var u in mock){
            if(mock[u].username === username){
                return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials){
        console.log(credentials);
        for(var u in mock){
            if(mock[u].username === credentials.username &&
                mock[u].password === credentials.password){
                return mock[u];
            }
        }
        return null;
    }
};