(function() {
    "use strict";
    angular
        .module("AdoptAPet")
        .factory("UserService", UserService);

    function UserService($rootScope, $http){

        var userAPI = {
            // Function Declarations
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            findUserByShelterId: findUserByShelterId,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout,
            login: login,

            findAvailableShelterId: findAvailableShelterId,
            addShelterId: addShelterId,
            updateShelterId: updateShelterId
        };
        return userAPI;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }


        function getCurrentUser () {
            // return $rootScope.currentUser;
            return $http.get("/api/project/loggedin");
        }


        function logout() {
            return $http.post("/api/project/logout");
        }

        function login(user) {
            return $http.post("/api/project/login", user);
        }


        function findUserByCredentials(user) {
            return $http.get("/api/project/user?username=" + user.username +
                "&password=" + user.password);
        }

        function findAllUsers(){
            return $http.get("/api/project/user");
        }

        function findUserById(userId){
            return $http.get("/api/project/user/" + userId);
        }


        function findUserByShelterId(shelterId) {
            return $http.get("/api/project/user/shelterId/" + shelterId);
        }


        function createUser(newUser){
            return $http.post("/api/project/user", newUser);
        }


        function deleteUserById(userId){
            return $http.delete("/api/project/user/:" + userId);
        }


        function updateUser(userId, updatedUser){
            return $http.put("/api/project/user/" + userId, updatedUser);
        }


        function findAvailableShelterId() {
            return $http.get("/api/project/shelterId");
        }


        function addShelterId(newShelterIdObj) {
            return $http.post("/api/project/shelterId/new", newShelterIdObj);
        }

        function updateShelterId(updatedShelterIdObj) {
            return $http.post("/api/project/shelterId/update", updatedShelterIdObj);
        }
    }
})();