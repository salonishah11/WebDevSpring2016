(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var userAPI = {
            // Function Declarations
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            // findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            register: register,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            updateUserByAdmin: updateUserByAdmin,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout,
            login: login
        };
        return userAPI;


        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }


        function getCurrentUser() {
            // return $rootScope.currentUser;
            return $http.get("/api/assignment/loggedin");
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }


        // function login(user) {
        //     return $http.post("/api/assignment/login", user);
        // }


        // Function Implementations
        function findUserByUsername(username){
            return $http.get("/api/assignment/user/:" + username);
        }
        
        
        function findUserById(userId){
            return $http.get("/api/assignment/admin/user/" + userId);
        }


        // finds a user given a username and password
        // function findUserByCredentials(credentials){
        //     //console.log("inside service" + credentials.username + credentials.password);
        //     return $http.get("/api/assignment/user?username=" + credentials.username +
        //         "&password=" + credentials.password);
        // }

        // returns an array of all users
        function findAllUsers(){
            return $http.get("/api/assignment/admin/user");
        }

        // creates a new user
        function createUser(user){
            //console.log("inside client service");
            return $http.post("/api/assignment/admin/user", user);
        }

        function register(user){
            //console.log("inside client service");
            return $http.post("/api/assignment/register", user);
        }

        // deletes a user given userId
        function deleteUserById(userId){
            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        // updates the data of a user given a userId
        function updateUser(userId, updatedUser){
            return $http.put("/api/assignment/user/" + userId, updatedUser);
        }

        function updateUserByAdmin(userId, updatedUser) {
            return $http.put("/api/assignment/admin/user/" + userId, updatedUser);
        }
    }
})();