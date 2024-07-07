function displayPopularMovies(movies) {

    var header = $(`<div id="header-style"></div>`)
    $(header).html("Top Rated: ")
    $( "#popular-movies" ).append(header);

    $.each(movies, function(index, item) {
        
        let id = item.id
        let title = item.title
        let img = item.image

        var newMovie = $(`<div class="top-movie-div" data-id="${id}"></div>`)

        var imageSection = $(`<div></div>`)
        var imageTag = $(`<img class="img-dimension img-fluid" src="${img}" alt="${title}">`);
        $(imageSection).append(imageTag);
        $(newMovie).append(imageSection);

        var titleSection = $(`<div class="title-custom"></div>`)
        $(titleSection).html(title)
        $(newMovie).append(titleSection)

        $( "#popular-movies" ).append(newMovie);
        
    })
}

$(document).ready(function() {

    displayPopularMovies(topMovies);

    $(document).ready(function() {

        $( ".top-movie-div" ).click(function() {
            let movieId = $( this ).data("id")
            var redirectTo = "/view/" + movieId
            $(location).attr('href',redirectTo)
        })
    
    })

})
 