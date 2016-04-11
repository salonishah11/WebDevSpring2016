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
                controller: "AdoptPetSearchController",
                controllerAs: "model"
            })
            .when("/adoptPetDetails/:id",{
                templateUrl: "views/adoptPet/adoptPetDetails.view.html",
                controller: "AdoptPetDetailsController"
            })
            .when("/animalOrgSearch",{
                templateUrl: "views/animalOrg/animalOrgSearch.view.html",
                controller: "AnimalOrgSearchController",
                controllerAs: "model"
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
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/shareStoryForm",{
                templateUrl: "views/users/shareStoryForm.view.html",
                controller: "AddStoryController",
                controllerAs: "model"
            })
            .when("/viewStories",{
                templateUrl: "views/users/stories.view.html",
                controller: "StoriesController",
                controllerAs: "model"
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
                controllerAs: "model"
            })
            // .when("/adoptionRequests",{
            //     templateUrl: "views/users/adoptionRequests.view.html",
            //     controller: "AdoptionRequestsController"
            // })
            .when("/adoptionRequest/user/:userId/pet/:petId",{
                templateUrl: "views/users/adoptionRequestForm.view.html",
                controller: "AdoptionRequestFormController",
                controllerAs: "model"
            })
            .when("/viewUserAdoptionRequests",{
                templateUrl: "views/users/adoptionRequests.view.html",
                controller: "AdoptionRequestsController",
                controllerAs: "model"
            })
            .when("/viewUserAdoptionRequests/request/:requestId",{
                templateUrl: "views/users/adoptionRequestDetails.view.html",
                controller: "AdoptionRequestDetailsController",
                controllerAs: "model"
            })
            .when("/viewOrgAdoptionRequests",{
                templateUrl: "views/adoptionRequest/orgAdoptionRequests.view.html",
                controller: "OrgAdoptionRequestsController",
                controllerAs: "model"
            })
            .when("/viewOrgAdoptionRequests/request/:requestId",{
                templateUrl: "views/adoptionRequest/orgAdoptionRequestDetails.view.html",
                controller: "OrgAdoptionRequestDetailsController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
