var source = $("#card-template").html();
var cardTemplate = Handlebars.compile(source);

    $('#cerca-film').change(function () {
        var carattereRicerca = $('#cerca-film').val().toLowerCase();
        $('#cerca-film').val('');
        var apiBaseUrl = 'https://api.themoviedb.org/3';

        $.ajax({
            // url: 'https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d&query=ritorno+al+futuro',
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
                for (var i = 0; i < films.length; i++) {
                    var film = films[i];
                    var filmTemplate = {
                        title: film.title,
                        originalTitle: film.original_title,
                        originalLanguage: film.original_language,
                        vote: film.vote_average
                    }
                    var cardFilm = cardTemplate(filmTemplate);
                    $('.container-card').append(cardFilm);
                }
            },
            error: function (err) {
                alert('BOOM');
            }
        });
    });
