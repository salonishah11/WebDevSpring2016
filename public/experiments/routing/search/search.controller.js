(function(){
    angular
        .module("MovieApp")
        .controller("SearchController", SearchController);

    function SearchController(MovieService, $location, $scope, $http, $routeParams){
        // here title after routeParams is the name provided in config.js
        var title = $routeParams.title;

        if(title){
            search(title);
        }

        $scope.search = search;

        function search(title){
            console.log(title);

            $location.url("/search/" + title);
            MovieService.findMoviesByTitle(title, render);
            //$http.get("http://www.omdbapi.com/?s="+title).success(render);
        }

        function render(response){
            //console.log(response);
            $scope.data = response;
        }
    }
})();