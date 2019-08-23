require("dotenv").config();
const inquirer = require("inquirer");

//var spotify = new Spotify(keys.spotify);
const fs = require("fs");
class userRequest{
    constructor(f,q){
        this.field = f;
        this.query = q;
    }
}
function writeInputs(ur){
    fs.writeFile("input.txt", JSON.stringify(ur), function(err) {
        if (err) {
            return console.log(err);
          }
        const keys = require("./keys.js");
        
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
function promptUser(){
    inquirer.prompt([{
        type:'input',
        message:'what do you want to find?',
        default:'song',
        name:'menu'
    },
    {
        type:'input',
        meessage:'Sure what do you want to look up?:',
        default:'I want it that way',
        name:'title'

    }]).then((inq)=>{
        let ur = new userRequest(inq.menu,inq.title);
        writeInputs(ur);
    });
}
function main(){
    promptUser();
    
}
main();