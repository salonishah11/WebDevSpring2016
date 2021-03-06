(function (){
    angular
        .module("MovieApp")
        .factory("MovieService", MovieService);
    //by using factory, MovieService is made available to all to call its methods

    function MovieService($http){
        var api = {
            findMoviesByTitle: findMoviesByTitle,
            findMovieByImdbId: findMovieByImdbId
        };

        return api;

        function findMoviesByTitle(title, callback){
            $http.get("http://www.omdbapi.com/?s="+title)
                .success(callback);

        }

        function findMovieByImdbId(imdbId){

        }
    }
})();