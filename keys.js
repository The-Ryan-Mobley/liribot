//https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
const axios = require('axios');
const keys = require("./keys.js");

function movieAPI(input) {
    var movieName = input;
    axios({
            method: 'get',
            url: 'http://www.omdbapi.com/?t=' + movieName + '&apikey=8fcc4e9e',
        })
        .then(function (response) {
            console.log(response);
        });
        //need to get: title, release date, imdb rating, rotten tomatoes rating,COO, language,plot summary, and actors

}
function concertAPI(input){
    var artist = input;
    axios({
            method: 'get',
            url: 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp',
        })
        .then(function (response) {
            console.log(response);
        });
        //need to get: date name of venue and venue location/address

}
//will eventually be mobed to liri file, will need to export query fields then import api data
function main(){
    let field = process.argv[2].toString().toLowerCase();
    let input = process.argv[3].toString().toLowerCase();
    switch(field){
        case "concert":{
            concertAPI(input);
            break;
        }
        case "movie":{
            movieAPI(input);
            break;
        }
    }
}
main();