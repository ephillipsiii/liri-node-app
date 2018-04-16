// setting variables for global scope
//saving the dotenv
require("dotenv").config();
//requiring the keys.js file
var keys = require("./keys.js");
//dependency for fs
var fs = require('fs');
//dependecy for twitter npm
var Twitter = require('twitter');
//dependency for request npm
var request = require('request');
// dependecy for spotify npm
var Spotify = require('node-spotify-api');
//assigning twitter keys to a var via .env
var client = new Twitter(keys.Twitter);

//taking user inputs in an array for the command line so that user input would resemble: "node filename.js + input 2 + input 3"
var input = process.argv;
var action = input[2];
var inputs = input[3];

//switch case for recognizing which input refers to which function

switch (action) {
    case "my-tweets":
    Twitter(inputs);
    break;
    
    case "spotify-this-song":
    Spotify(inputs);
    break;

    case "movie-this":
    movie(inputs);
    break;

    case "do-what-it-says":
    doIt()
    break;
}

//twitter function
function Twitter(inputs) {
    //setting paramaters to return from twitter 
    var params = {screen_name: inputs, count: 20};
    //establishing permissions and getting timeline, paramters from twitter, passing the function with an error conditional, the tweets, and a respone from api
        client.get("statuses/user_timeline", params, function(error, tweets, response){
            if (!error){
                //if no error, loop through tweets and log
                for (i = 0, i < tweets.length; i ++;) {
                    console.log("Tweet: " + " " + tweets[i].text + "Time Created: " + tweets[i].created_at);
                }
            }//if an error, log the error
            else{
                console.log(error);
            }
        })
}
// //spotify function
function Spotify(inputs) {
    //establishes permissions with spotify keys
    var Spotify = new Spotify(keys.Spotify);
    // if no inputes, then return Ace of Base (thanks for getting this stuck in my head btw)
    if (!inputs){
        inputs = "The Sign";
    }
    //searches the spotify api and returns the function
    Spotify.search({ type: 'track', query: inputs }, function(err, data) {
        // if an error, log the error
        if(err){
            console.log(err);
            return;
        }
        //saves the song data returned from the api and logs the data
        var songData = data.tracks.items;
        console.log("Artist: " + songData[0].artists[0].name);
        console.log("Song Name: " + songData[0].name);
        console.log("Preview Link: " + songData[0].preview_url);
        console.log("Album: " + songData[0].album.name);;
    })
}
//omdb function
function movie(inputs){
    //saves the omdb api request with user input
    var queryURL = "http://ww.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";
    //request npm setting the url and a function that contains api error, response, and a body
    request(queryURL, function (error, response, body){
        // if no inputs, return data from Mr. Nobody
        if (!inputs) {
            inputs = "Mr. Nobody";
        }
        //if no error message and status code returns, log appropriate data with a json parse
        if(!error && response.statusCode === 200){
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    })
}
// doit function!
function doIt(){
    //appends named text file and runs function that returns either error or data
    fs.appendFile('random.txt', "utf8", function(error, data){
        //if an error is returned, log it
        if (error) {
            return console.log(error);
        }
        // puts the data into an array and splits each array object with a comma
        var dataArray = data.split(",");
        //if spotify is called, put the data into an array and run through the items in the array and vice versa for twitter and omdb
        if(dataArray[0] === "spotify-this-song"){
            var songcheck = dataArray[1].slice();
            spotify(songcheck);
        }else if (dataArray[0] === "my-tweets"){
            var tweet = dataArray[1].slice();
            twitter(tweet);
        }else if (dataArray[0] === "movie-this") {
            var movieName = dataArray[1].slice();
            movie(movieName);
        }
    })
}

