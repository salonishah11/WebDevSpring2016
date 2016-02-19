(function (){
    angular
        .module("MovieApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl: "home/home.view.html"
            })
            .when("/search",{
                templateUrl: "search/search.view.html",
                controller: "SearchController"
            })
            .when("/search/:title",{
                templateUrl: "search/search.view.html",
                controller: "SearchController"
            })
            // /:--> var after colon is a placeholder; it means /details will be followed by something
            // imdbID is parsed by the url
            .when("/details/:imdbID",{
                templateUrl: "details/details.view.html",
                controller: "DetailsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();