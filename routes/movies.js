var express = require('express');
var router = express.Router();
const _ = require('lodash');
const API = require('../routes/API_omdb');

let movies =[];
let newAPI = new API();

/* GET all movies */
router.get('/', function(req, res) {
    res.status(200).json({ movies: movies });
});


/* GET movie by ID */
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    const movieSelected = _.find(movies, ["id", id]);

    if(!movieSelected){
        res.status(200).json({
            message: 'Not found'});
    }
    else {
        res.status(200).json({
            movies: [
                {
                    message: 'Found',
                    id: id,
                    movie: movieSelected.movie,
                    yearOfRelease: movieSelected.yearOfRelease,
                    duration: movieSelected.duration,
                    actors: movieSelected.actors,
                    poster: movieSelected.poster,
                    boxOffice: movieSelected.boxOffice,
                    rottenTomatoesScore: movieSelected.rottenTomatoesScore
                }]
        });
    }
});

/* PUT new movie */
router.put('/', (req, res) => {
    const name = req.body.name;

    if (!name) {
        res.status(200).json({
            message: 'Not found'
        });
    }

    else{
        const movieSelected = _.find(movies, ["movie", name]);

        if (!movieSelected) {
            const add = newAPI
                .fetchMovieTitle(name)
                .then(function (response) {

                    const data = response.data;
                    const id = data.imdbID;
                    const movie = data.Title;
                    const yearOfRelease = parseInt(data.Year);
                    const duration = parseInt(data.Runtime);
                    const actors = data.Actors.split(", ");
                    const poster = data.Poster;
                    const boxOffice = data.BoxOffice;
                    const rottenTomatoesScore = parseInt(data.Ratings[1].Value);

                    movies.push({
                        id: id,
                        movie: movie,
                        yearOfRelease: yearOfRelease,
                        duration: duration,
                        actors: actors,
                        poster: poster,
                        boxOffice: boxOffice,
                        rottenTomatoesScore: rottenTomatoesScore
                    });

                    res.status(200).json({
                        movies: [
                            {
                                message: `${movie} added`,
                                id: id,
                                yearOfRelease: yearOfRelease,
                                duration: duration,
                                actors: actors,
                                poster: poster,
                                boxOffice: boxOffice,
                                rottenTomatoesScore: rottenTomatoesScore
                            }]
                    })
                })

                .catch(function(error) {
                    // Affiche une erreur
                    console.error(error);
                });
        }
    }
});


/* update movie */
router.post('/:id', (req, res) => {
    const id = req.params.id;
    const modifiedMovieYear = req.body.movieYear;

    const movieSelected = _.find(movies, ["id", id]);

    movieSelected.yearOfRelease = parseInt(modifiedMovieYear);

    res.status(200).json({
        message: `L'année du film #${movieSelected.movie} a été modifiée`
    })
});


/* DELETE movie. */
router.delete('/:id', (req, res) => {
	const {id} = req.params;
	_.remove(movies, ["id", id]);
	res.json({
		message : 'removed id',
		movie : {id}
	});
});

module.exports = router;
