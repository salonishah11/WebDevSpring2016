(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .factory("UserService", UserService);

    function UserService(){
        var users = {};
        users = [
            {"_id":123, "name":"Alice",   "username":"alice",  "password":"alice",
             "email": "alice@gmail.com",  "accountType": "Individual"},
            {"_id":234, "name":"Bob",     "username":"bob",    "password":"bob",
             "email":"bob@gmail.com",     "accountType":"Individual"},
            {"_id":345, "name":"Charlie Animal Organization", "username":"charlieOrg",    "password":"charlie",
             "email":"charlie_org@gmail.com",   "accountType":"Organization"},
            {"_id":456, "name":"Dan Animal Rescue League", "username":"danRescueLeague",  "password":"dan",
             "email":"dan_rl@gmail.com",   "accountType":"Organization"}
        ];

        var userAPI = {
            // Function Declarations
            //findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
            //setCurrentUser: setCurrentUser,
            //getCurrentUser: getCurrentUser
        };
        return userAPI;

        function findAllUsers(callback){
            callback(users);
        }


        function createUser(newUser, callback){
            users.push(newUser);
            callback(newUser);
        }


        function deleteUserById(userId, callback){
            for(var i = 0; i < users.length; i++){
                if(userId == users[i]._id){
                    users.splice(i, 1);
                    callback(users);
                }
            }
        }


        function updateUser(userId, updatedUser, callback){
            for(var i = 0; i < users.length; i++){
                if(userId == users[i]._id){
                    users[i] = updatedUser;
                    callback(updatedUser);
                }
            }
            //console.log(users);
        }
    }
})();