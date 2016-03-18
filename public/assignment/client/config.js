(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html"
            })
            .when("/register",{
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login",{
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/forms",{
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController"
            })
            .when("/fields",{
                templateUrl: "views/forms/fields.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();