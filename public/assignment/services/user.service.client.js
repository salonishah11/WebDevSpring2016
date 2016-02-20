(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    var users = {};

    users = [{	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
        "username":"alice",  "password":"alice",   "roles": ["student"]		},
        {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
            "username":"bob",    "password":"bob",     "roles": ["admin"]		},
        {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
            "username":"charlie","password":"charlie", "roles": ["faculty"]		},
        {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
            "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
        {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
            "username":"ed",     "password":"ed",      "roles": ["student"]		}];

    function UserService() {
        var api = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;

        function findUserByUsernameAndPassword(username, password, callback){
            var flag = 0;
            for(var i = 0; i < users.length; i++){
                if(username == users[i].username && password == users[i].password){
                    callback(users[i]);
                    flag = 1;
                    break;
                }
            }
            if(flag == 0){
                callback(null);
            }
        }

        function findAllUsers(callback){
            callback(users);
        }

        function createUser(user, callback){
            users.push(user);
            callback(users[users.length - 1]);
        }

        function deleteUserById(userId, callback){
            for(i = 0; i < users.length; i++){
                if(userId == users[i]._id){
                    users.splice(i, 1);
                    callback(users);
                }
            }
        }

        function updateUser(userId, user, callback){
            for(i = 0; i < users.length; i++){
                if(userId == users[i]._id){
                    users[i] = user;
                    console.log(users);
                    callback(user);
                }
            }
        }
    }
})();