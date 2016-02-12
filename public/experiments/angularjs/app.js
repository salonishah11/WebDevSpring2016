(function (){
    angular
        .module("MovieAdminApp", [])
        .controller("MovieController", MovieController);

    function MovieController($scope) {
        $scope.movies =[
            {id: 123, title: "abc", director: "xyz"},
            {id: 234, title: "bcd", director: "xyz"},
            {id: 345, title: "cde", director: "xyz"}
        ];

        //event handler declarations
        $scope.addMovie = addMovie;
        $scope.deleteMovie = deleteMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;

        //event handler implementation
        function addMovie (movie) {
            //console.log("inside addMovie()");
            //console.log("Title:" + $scope.movie.title);
            //console.log("Title:" + movie.title);

            var newMovie = {
                id: movie.id,
                title: movie.title,
                director: movie.director
            };
            $scope.movies.push(newMovie);
            $scope.movie = {};
        };

        function deleteMovie (movie) {
            //console.log("inside deleteMovie()" + index);
            //$scope.movies.splice(index, 1);
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index, 1);
        };

        var selectedMovieIndex = null;
        function selectMovie (movie) {
            console.log(movie);
            //$scope.movie = movie;
            $scope.movie = {
                id: movie.id,
                title: movie.title,
                director: movie.director
            };
        };

        function updateMovie (movie) {
            $scope.movie
        };
    }
})();
