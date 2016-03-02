(function(){
    "use strict";
    angular
        .module("AdoptAPet")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "../project/views/home/home.view.html"
            })
            .when("/adoptPet",{
                templateUrl: "../project/views/adoptPet/adoptPet.view.html"
            })
            .when("/animalOrg",{
                templateUrl: "../project/views/animalOrg/animalOrg.view.html"
            })
            .when("/contact",{
                templateUrl: "../project/views/contact/contact.view.html"
            })
            .when("/login",{
                templateUrl: "../project/views/users/login.view.html"
            })
            .when("/profile",{
                templateUrl: "../project/views/users/profile.view.html"
            })
            .when("/register",{
                templateUrl: "../project/views/users/register.view.html"
            })
            .when("/shareStory",{
                templateUrl: "../project/views/users/shareStory.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
