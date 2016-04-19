(function(){
    "use strict";
    angular
        .module("AdoptAPet")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/adoptPetSearch",{
                templateUrl: "views/adoptPet/adoptPetSearch.view.html",
                controller: "AdoptPetSearchController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/adoptPetDetails/:id",{
                templateUrl: "views/adoptPet/adoptPetDetails.view.html",
                controller: "AdoptPetDetailsController",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/animalOrgSearch",{
                templateUrl: "views/animalOrg/animalOrgSearch.view.html",
                controller: "AnimalOrgSearchController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/animalOrgDetails/:id",{
                templateUrl: "views/animalOrg/animalOrgDetails.view.html",
                controller: "AnimalOrgDetailsController",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/contact",{
                templateUrl: "views/contact/contact.view.html"
            })
            .when("/login",{
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/register",{
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/shareStoryForm",{
                templateUrl: "views/users/shareStoryForm.view.html",
                controller: "AddStoryController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/viewStories",{
                templateUrl: "views/users/stories.view.html",
                controller: "StoriesController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/users",{
                templateUrl: "views/users/users.view.html",
                controller: "UsersController",
                controllerAs: "model"
            })
            .when("/animals",{
                templateUrl: "views/animal/animals.view.html",
                controller: "AnimalsController"
            })
            .when("/adoptionStories",{
                templateUrl: "views/users/adoptionStories.view.html",
                controller: "AdoptionStoriesController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            // .when("/adoptionRequests",{
            //     templateUrl: "views/users/adoptionRequests.view.html",
            //     controller: "AdoptionRequestsController"
            // })
            .when("/adoptionRequest/user/:userId/pet/:petId",{
                templateUrl: "views/users/adoptionRequestForm.view.html",
                controller: "AdoptionRequestFormController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/viewUserAdoptionRequests",{
                templateUrl: "views/users/adoptionRequests.view.html",
                controller: "AdoptionRequestsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/viewUserAdoptionRequests/request/:requestId",{
                templateUrl: "views/users/adoptionRequestDetails.view.html",
                controller: "AdoptionRequestDetailsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/viewOrgAdoptionRequests",{
                templateUrl: "views/adoptionRequest/orgAdoptionRequests.view.html",
                controller: "OrgAdoptionRequestsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/viewOrgAdoptionRequests/request/:requestId",{
                templateUrl: "views/adoptionRequest/orgAdoptionRequestDetails.view.html",
                controller: "OrgAdoptionRequestDetailsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }


    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }
})();
