//https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
//spoitfy key 42ce09f7e58c4f6991de213473890d68
//spotify secret 4652196a99b24dddbb4623b3eedcd418
const fs = require("fs");
const axios = require('axios');
const Spotify = require('node-spotify-api');

var obj = undefined;

function readInput(){
    fs.readFile("input.txt", "utf8", (err, data)=> {
        if (err) {
            return console.log(err);  
        }
        obj = JSON.parse(data);
        takeActions(obj.field,obj.query);
    });
}
function spotifyAPI(input){
    var spotify = new Spotify({
        id: "42ce09f7e58c4f6991de213473890d68",
        secret: "4652196a99b24dddbb4623b3eedcd418"
      });
      spotify.search({ type: 'track', query: input, limit: 5 }, (err, data)=> {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      });

}
function movieAPI(input) {
    //let outArray = [];
    let movieName = input;
    axios({
            method: 'get',
            url: 'http://www.omdbapi.com/?t=' + movieName + '&apikey=8fcc4e9e',
        })
        .then((response)=> {
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
function concertAPI(input){
    var artist = input;
    axios({
            method: 'get',
            url: 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp',
        })
        .then((response)=> {
            console.log("here we go");
            console.log(response);
        });
        //need to get: date name of venue and venue location/address

}
function takeActions(field, query){
    switch(field){
        case "movie":{
            movieAPI(query);
            break;
        }
        case "concert":{
            concertAPI(query);
            break;
        }
        case "song":{
            spotifyAPI(query);
            break;
        }
    }

}
function writeOutput(arr){
    let passArr =[];
    arr.forEach((index)=>{
        passArr.push(index);

    });
    module.exports = passArr;
    
}
function main(){
    readInput();
    module.exports = "sending......";
    

    
}
main();