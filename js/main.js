$(document).ready(function() {
    var source = $("#card-template").html();
    var cardTemplate = Handlebars.compile(source);

        $('.fa-search').click(cerca);                   // modo di richiamare funzione senza parametri
        // $('.fa-search').click(function() {           // modo di richiamare funzione se ho bisogno di inserire parametri
        //     cerca();
        // });
        $('#input-ricerca').keypress(function (event) {
            if (event.keyCode == 13) {
                cerca();
            }
        });

    function cerca() {
            var queryRicerca = $('#input-ricerca').val().toLowerCase();
            $('#input-ricerca').val('');                            // resetto l input
            $('.container-card').empty("");                         // pulisco il container dai risultati
            if (queryRicerca.length !== 0) {
                apiRicercaFilm(queryRicerca);
                apiRicercaSerie(queryRicerca);
            } else {
                alert('scrivi qualcosa')
            }
    }

    function apiRicercaFilm(queryRicerca) {
        var apiBaseUrlFilm = 'https://api.themoviedb.org/3';
        $.ajax({
            // url: 'https://api.themoviedb.org/3/search/movie?api_key=e50a20205b1bb8fb469327d3702d0bfd&query=aladin',
            // url: 'https://api.themoviedb.org/3/search/movie',
            url: apiBaseUrlFilm + '/search/movie',
            data: {
                api_key: 'e50a20205b1bb8fb469327d3702d0bfd',
                query: queryRicerca,
                language: 'it-IT'
            },
            method: 'GET',
            success: function (data) {
                var movies = data.results;
                stampaCardMovies(movies)
            },
            error: function (err) {
                alert('BOOM');
            }
        });
    }
    function apiRicercaSerie(queryRicerca) {
        var apiBaseUrlSerie = 'https://api.themoviedb.org/3';
        $.ajax({
            // url: 'https://api.themoviedb.org/3/search/movie?api_key=e50a20205b1bb8fb469327d3702d0bfd&query=aladin',
            // url: 'https://api.themoviedb.org/3/search/movie',
            url: apiBaseUrlSerie + '/search/tv',
            data: {
                api_key: 'e50a20205b1bb8fb469327d3702d0bfd',
                query: queryRicerca,
                language: 'it-IT'
            },
            method: 'GET',
            success: function (data) {
                var series = data.results;
                stampaCardSeries(series)
            },
            error: function (err) {
                alert('BOOM');
            }
        });
    }

    function stampaCardMovies(movies) {
        for (var i = 0; i < movies.length; i++) {
            var movie = movies[i];
            var infoMovie = {
                title: movie.title,
                originalTitle: movie.original_title,
                flag: flags(movie.original_language),
                vote: stars(movie.vote_average),
                cover: coverNoImage(movie.poster_path),
                overview: movie.overview
            }
            var movieCard = cardTemplate(infoMovie);       // compilo cardFilm con filmTemplate popolata
            $('.container-card').append(movieCard);           // appendo cardFilm al container-card
            visible();
        }
    };
    function stampaCardSeries(series) {
        for (var i = 0; i < series.length; i++) {
            var serie = series[i];
            var infoSerie = {
                title: serie.name,
                originalTitle: serie.original_name,
                flag: flags(serie.original_language),
                vote: stars(serie.vote_average),
                cover: coverNoImage(serie.poster_path),
                overview: serie.overview
            }
            var serieCard = cardTemplate(infoSerie);       // compilo cardFilm con filmTemplate popolata
            $('.container-card').append(serieCard);           // appendo cardFilm al container-card
        }
    };

    function stars(vote) {
        var stars = Math.ceil(vote / 2);
        var star;
        switch (stars) {
            case 0:
                star = '<i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i>';
                break;
            case 1:
            star = '<i class="fas fa-star checked"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i>';
                break;
            case 2:
            star = '<i class="fas fa-star checked"></i> <i class="fas fa-star checked"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i>';
                break;
            case 3:
            star = '<i class="fas fa-star checked"></i> <i class="fas fa-star checked"></i> <i class="fas fa-star checked"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i>';
                break;
            case 4:
            star = '<i class="fas fa-star checked"></i> <i class="fas fa-star checked"></i> <i class="fas fa-star checked"></i> <i class="fas fa-star checked"></i> <i class="fas fa-star"></i>';
                break;
            case 5:
            star = '<i class="fas fa-star checked"></i> <i class="fas fa-star checked"></i> <i class="fas fa-star checked"></i> <i class="fas fa-star checked"></i> <i class="fas fa-star checked"></i>';
                break;
            default:
                star = "nothing";
        }
        return star;};                              // funzione per trasformare il voto da 1 a 5 e convertire il numero in stelle
    //---soluzione alternativa star------
    // function stars(vote) {                          // ricevo il voto
    //     var stringaStelle = '';                     // creo una stringa vuota
    //     vote = Math.ceil(voto / 2);                 // trasformo il voto in un numero da 1 a 5 approssimato per eccesso
    //     for (var i = 1; i <= 5; i++) {              // ciclo da 1 al massimo di stelle (5)
    //         if (i <= vote) {
    //             stringaStelle += '<i class="fas fa-star"></i>';
    //         } else {
    //             stringaStelle += '<i class="far fa-star"></i>';
    //         }
    //     }
    //     return stringaStelle;
    // }

    function flags(originalLanguage) {
        var flag = originalLanguage;
        switch (flag) {
            case 'en':
                flag = '<img src="https://www.countryflags.io/gb/shiny/64.png">'
                break;
            case 'it':
                flag = '<img src="https://www.countryflags.io/it/shiny/64.png">'
                break;
            case 'es':
                flag = '<img src="https://www.countryflags.io/es/shiny/64.png">'
                break;
            case 'cs':
                flag = '<img src="https://www.countryflags.io/cz/shiny/64.png">'
                break;
            case 'pt':
                flag = '<img src="https://www.countryflags.io/pt/shiny/64.png">'
                break;
            case 'fr':
                flag = '<img src="https://www.countryflags.io/fr/shiny/64.png">'
                break;
            case 'id':
                flag = '<img src="https://www.countryflags.io/id/shiny/64.png">'
                break;
            case 'de':
                flag = '<img src="https://www.countryflags.io/de/shiny/64.png">'
                break;
            case 'ru':
                flag = '<img src="https://www.countryflags.io/ru/shiny/64.png">'
                break;
            case 'nl':
                flag = '<img src="https://www.countryflags.io/nl/shiny/64.png">'
                break;
            case 'th':
                flag = '<img src="https://www.countryflags.io/th/shiny/64.png">'
                break;
            default:
            flag = originalLanguage;
        }
        return flag;};                  // funzione per trasformare la stringa originalLanguage in bandiere
        //---soluzione alternativa flags------
    // function langToFlag(originalLanguage)   {
    //     var availableFlags = [
    //         'en',
    //         'it'
    //     ];
    //     if (availableFlags.includes(originalLanguage)) {
    //         var flag = 'sorgente immagine';
    //         return flag;
    //     }
    // }
    function coverNoImage(cover) {
            if (cover == null) {
            cover = 'https://www.rettificheresca.it/wp-content/uploads/img-placeholder.png'
            } else {
                cover = 'https://image.tmdb.org/t/p/w342' + cover;
            }
        return cover;
    };

    function visible() {
        $('.card').mouseenter(function() {
            $('.cover', this).hide();
            $('.info', this).css('visibility', 'visible');
            });
        $('.card').mouseleave(function() {
            $('.cover', this).show();
            $('.info', this).css('visibility', 'hidden');
            });
    }
});
