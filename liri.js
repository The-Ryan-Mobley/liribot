require("dotenv").config();
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios');
const Spotify = require('node-spotify-api');
const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);


class userRequest {
    constructor(f, q) {
        this.field = f;
        this.query = q;
    }
}

function logInputs(ur) {
    fs.appendFileSync('log.txt', JSON.stringify(ur), (err) => {
        if (err) {
            return console.log(err);
        }

    });
}

function grabKeys() {
    console.log(keys);
}

function readQuery() {
    fs.readFile("querys.txt", "utf8", (err, data) => {
        if (err) {
            return console.log(err);
        }
        let output = data.split(',');
        output.forEach((index) => {
            console.log(index);

        });

    });

}

function promptUser() {
    inquirer.prompt([{
            type: 'input',
            message: 'what can I do for you?',
            name: 'menu'
        },
        {
            type: 'input',
            message: 'Sure what do you want to look up?:',
            name: 'title'

        }
    ]).then((inq) => {
        let ur = new userRequest(inq.menu, inq.title);
        
        takeActions(ur.field,ur.query);
        logInputs(ur);
    });

    function takeActions(field, query) {
        switch (field) {
            case "movie-this": {
                movieAPI(query);
                break;
            }
            case "concert-this": {
                concertAPI(query);
                break;
            }
            case "spotify-this": {
                spotifyAPI(query);
                break;
            }
            default: {
                ReadRandom();
                break;

            }
        }

    }
}

function spotifyAPI(input) {
    spotify.search({
        type: 'track',
        query: input,
        limit: 5
    }, (err, data) => {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].album.name);
    });

}

function movieAPI(input) {
    //let outArray = [];
    let movieName = input;
    axios({
            method: 'get',
            url: 'http://www.omdbapi.com/?t=' + movieName + '&apikey=8fcc4e9e',
        })
        .then((response) => {

            console.log(`Title: ${response.data.Title}`);
            console.log(`Release Date: ${response.data.Title}`);
            console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
            console.log(`Country: ${response.data.Country}`);
            console.log(`Language: ${response.data.Language}`);
            console.log(`Summary:\n ${response.data.Plot}`);
            console.log(`Cast:\n ${response.data.Actors}`);
        });
}

function concertAPI(input) {
    var artist = input;
    axios({
            method: 'get',
            url: 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp',
        })
        .then((response) => {
            let concertArr = [];
            for (let i = 0; i < 10; i++) {
                concertArr.push(response.data[i]);
            }
            concertArr.forEach((index) => {
                let date = grabDate(index.datetime);
                console.log("Concert date: " + date);
                console.log("Venue: " + index.venue.name);
                console.log('City: ' + index.venue.city + ", " + index.venue.region);
            });

        });

}
function grabDate(string){
    const moment = require('moment');
    let dateMod = string.substr(0,10);
    return(moment(dateMod,'YYYY-MM-DD').format('MM/DD/YYYY'));
}
function ReadRandom(){
    fs.readFile('random.txt','utf-8',(err,data)=>{
        if (err) {
            return console.log(err);
        }
        let arr = data.split(',');
        spotifyAPI(arr[1]);

    })
}

function main() {
    promptUser();

}
main();