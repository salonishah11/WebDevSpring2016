(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .factory("UserService", UserService);

    function UserService($rootScope){
        var users = {};
        users = [
            {
                "_id":123,
                "name":"Alice",
                "username":"alice",
                "password":"alice",
                "email": "alice@gmail.com",
                "streetAddress": "Hydrogen Street",
                "city": "Boston",
                "state": "MA",
                "country": "USA",
                "zipcode": "01234",
                "accountType": "Individual"
            },
            {
                "_id":234,
                "name":"Bob",
                "username":"bob",
                "password":"bob",
                "email":"bob@gmail.com",
                "streetAddress": "Oxygen Street",
                "city": "San Jose",
                "state": "CA",
                "country": "USA",
                "zipcode": "02345",
                "accountType":"Individual"
            },
            {
                "_id":345,
                "name":"Charlie Animal Organization",
                "username":"charlieOrg",
                "password":"charlie",
                "email":"charlie_org@gmail.com",
                "streetAddress": "Carbon Street",
                "city": "Austin",
                "state": "TX",
                "country": "USA",
                "zipcode": "03456",
                "accountType":"Organization"
            },
            {
                "_id":456,
                "name":"Dan Animal Rescue League",
                "username":"danRescueLeague",
                "password":"dan",
                "email":"dan_rl@gmail.com",
                "streetAddress": "Nitrogen Street",
                "city": "New York",
                "state": "NY",
                "country": "USA",
                "zipcode": "04567",
                "accountType":"Organization"
            }
        ];

        var userAPI = {
            // Function Declarations
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
        return userAPI;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }


        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByCredentials(user) {
            for(var u in users){
                if((users[u].username == user.username) && (users[u].password == user.password)){
                    return users[u];
                }
            }
            return null;
        }

        function findAllUsers(callback){
            callback(users);
        }


        function createUser(newUser){
            newUser._id = (new Date).getTime();
            users.push(newUser);
            //callback(newUser);
            return newUser;
        }


        function deleteUserById(userId, callback){
            for(var i = 0; i < users.length; i++){
                if(userId == users[i]._id){
                    users.splice(i, 1);
                    callback(users);
                }
            }
        }


        function updateUser(userId, updatedUser){
            for(var i = 0; i < users.length; i++){
                if(userId == users[i]._id){
                    users[i] = updatedUser;
                    // callback(updatedUser);
                    //console.log(users[i]);
                    return users[i];
                }
            }
            //console.log(users);
            return null;
        }
    }
})();