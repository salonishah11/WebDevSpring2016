(function (){
    $(init);

    var $moveTitleText, $searchBtn, $searchResults;
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE";
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID";
    var $plot, $actors, $title, $poster, $director;

    function init() {
        $moveTitleText = $("#moveTitleText");
        $searchBtn = $("#searchBtn");
        $searchResults = $("#searchResults tbody");

        $plot = $("#plot");
        $actors = $("#actors");
        $title = $("#title");
        $poster = $("#poster");
        $director = $("#director");

        $searchBtn.click(searchMovie);
    }

    function searchMovie() {
        var title = $moveTitleText.val();
        var url = SEARCH_URL.replace("TITLE", title);
        //alert(url);

        $.ajax({
            url: url,
            success: renderSearchResults
        });
    }

    function renderSearchResults(response){
        //console.log(response);

        var totalResults = response.totalResults;
        var movies = response.Search;

        $searchResults.empty();
        for(var m = 0; m < movies.length; m++){
            var movie = movies[m];
            //console.log(movie);

            var posterURL = movie.Poster;
            var title = movie.Title;
            var year = movie.Year;
            var imdbId = movie.imdbID;

            var $tr = $("<tr>")
                .attr("id", imdbId)
                .click(fetchMovieDetails);

            var $img = $("<img>")
                .attr("src", posterURL)
                .addClass("posterThumb");

            var $td = $("<td>").append($img).appendTo($tr);
            $td = $("<td>").append(title).appendTo($tr);
            $td = $("<td>").append(year).appendTo($tr);
            $td = $("<td>").append(imdbId).appendTo($tr);


            $searchResults.append($tr);
        }
    }

    function fetchMovieDetails(event){
        //alert("MovieDetails");
        //console.log(event);

        var $tr = $(event.currentTarget);
        var imdbId = $tr.attr("id");

        var url = DETAILS_URL.replace("IMDBID", imdbId);

        $.ajax({
            url: url,
            success: renderMovieDetails
        })
    }

    function renderMovieDetails(response){
        //console.log(response);

        var actors = response.Actors;
        var title = response.Title;
        var director = response.Director;
        var plot = response.Plot;
        var poster = response.Poster;

        $title.html(title);
        $plot.html(plot);
        $poster.attr("src", poster);
        $director.html(director);

        $actors.empty();
        var actorArray = actors.split(",");
        for(var a in actorArray){
            var actor = actorArray[a];
            $li = $("<li>").append(actor).appendTo($actors);
        }

    }
})();
