

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
                        console.log('il titolo del Film è: ' + film.title);
                        console.log('Il titolo origiinale del film è: ' + film.original_title);
                        console.log('La lingua del film è: ' + film.original_language);
                        console.log('Il voto del film è: ' + film.vote_average);
                        console.log('---------------------------');
                }
            },
            error: function (err) {
                alert('BOOM');
            }
        });
    });
