(function(){
    "use strict";
    angular
        .module("AdoptAPet")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html"
            })
            .when("/adoptPetSearch",{
                templateUrl: "views/adoptPet/adoptPetSearch.view.html",
                controller: "AdoptPetSearchController"
            })
            .when("/adoptPetDetails/:id",{
                templateUrl: "views/adoptPet/adoptPetDetails.view.html",
                controller: "AdoptPetDetailsController"
            })
            .when("/animalOrgSearch",{
                templateUrl: "views/animalOrg/animalOrgSearch.view.html",
                controller: "AnimalOrgSearchController"
            })
            .when("/animalOrgDetails/:id",{
                templateUrl: "views/animalOrg/animalOrgDetails.view.html",
                controller: "AnimalOrgDetailsController"
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
                controllerAs: "model"
            })
            .when("/register",{
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/shareStory",{
                templateUrl: "views/users/shareStory.view.html"
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
                controller: "AdoptionStoriesController"
            })
            .when("/adoptionRequests",{
                templateUrl: "views/users/adoptionRequests.view.html",
                controller: "AdoptionRequestsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
