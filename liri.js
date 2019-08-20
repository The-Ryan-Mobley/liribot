require("dotenv").config();
const keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
const fs = require("fs");
class userRequest{
    constructor(f,q){
        this.field = process.argv[2].toString().toLowerCase();
        this.query = process.argv[3].toString().toLowerCase();
    }
}
function writeInputs(){
    let ur = new userRequest();
    fs.writeFile("input.txt", JSON.stringify(ur), function(err) {
        if (err) {
            return console.log(err);
          }
    });
   
 
}
function grabKeys(){
    console.log(keys);
}
function readQuery(){
    fs.readFile("querys.txt", "utf8", (err, data)=> {
        if (err) {
            return console.log(err);  
        }
        let output = data.split(',');
        output.forEach((index)=>{
            console.log(index);

        });

    });

}
function main(){
    writeInputs();
    grabKeys();
    //readQuery();
}
main();