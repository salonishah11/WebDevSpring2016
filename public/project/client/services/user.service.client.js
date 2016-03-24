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
            return $http.get("/api/project/user?username=" + user.username +
                "&password=" + user.password);
        }

        function findAllUsers(){
            return $http.get("/api/project/user");
        }

        function findUserById(userId){
            return $http.get("/api/project/user/" + userId);
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
    }
})();