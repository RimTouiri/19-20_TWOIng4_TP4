const axios = require('axios').default;

// Clé api
const API_KEY = "1a2a0c68";
// Url API
const API_URL = "http://www.omdbapi.com/";


class API_omdb{
    constructor(){
    }

    // Faire la requete à l'API omdb
    // Retourne une promise
    fetchMovieTitle(movieTitle){
        return axios
            .get(`${API_URL}?t=${movieTitle}&apikey=${API_KEY}`, {
                crossdomain: true
            })
    }
}

module.exports = API_omdb;