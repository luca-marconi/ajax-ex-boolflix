var source = $("#card-template").html();
var cardTemplate = Handlebars.compile(source);
var apiBaseUrl = 'https://api.themoviedb.org/3';

    $('#cerca-film').change(function () {
        var carattereRicerca = $('#cerca-film').val().toLowerCase();
        console.log(carattereRicerca);
        $('.container-card').html("");
        $.ajax({
            // url: 'https://api.themoviedb.org/3/search/movie?api_key=e50a20205b1bb8fb469327d3702d0bfd&query=aladin',
            // url: 'https://api.themoviedb.org/3/search/movie',
            url: apiBaseUrl + '/search/movie',
            data: {
                api_key: 'e50a20205b1bb8fb469327d3702d0bfd',
                query: carattereRicerca,
                language: 'it-IT'
            },
            method: 'GET',
            success: function (data) {
                var films = data.results;
                console.log(films);
                for (var i = 0; i < films.length; i++) {
                    var film = films[i];
                    var filmTemplate = {
                        title: film.title,
                        originalTitle: film.original_title,
                        originalLanguage: film.original_language,
                        vote: arrotondaVoto(film.vote_average)
                    }
                    var cardFilm = cardTemplate(filmTemplate);       // compilo cardFilm con filmTemplate popolata
                    $('.container-card').append(cardFilm);           // appendo cardFilm al container-card
                }
            },
            error: function (err) {
                alert('BOOM');
            }
        });
    });


function arrotondaVoto(vote) {                                      // funzione per trasformare il voto da 1 a 5
    var nuovoVoto = Math.ceil(vote / 2);
    return nuovoVoto;
}
