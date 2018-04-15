// setting variables for global scope

var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs');
var twitter = require('twitter');
var request = require('request');
var spotify = require('node-spotify-api');
var client = new twitter(keys.twitter);
var input = process.argv;
var action = input[2];
var inputs = input[3];

//switch case for recognizing which input refers to which function

switch (action) {
    case "my-tweets":
    twitter(inputs);
    break;
    
    case "spotify-this-song":
    spotify(inputs);
    break;

    case "movie-this":
    movie(inputs);
    break;

    case "do-what-it-says":
    doIt()
    break;
}

//twitter function
function twitter(inputs) {
    var params = {screen_name: inputs, count: 20};
        client.get("statuses/user_timeline", params, function(error, tweets, response){
            if (!error){
                for (i = 0, i < tweets.length; i ++;) {
                    console.log("Tweet: " + " " + tweets[i].text + "Time Created: " + tweets[i].created_at);
                }
            }
            else{
                console.log(error);
            }
        })
}
// //spotify function
function spotify(inputs) {
    var spotify = new Spotify(keys.spotify);
    if (!inputs){
        inputs = "The Sign";
    }
    spotify.search({ type: 'track', query: inputs }, function(err, data) {
        if(err){
            console.log(err);
            return;
        }
        var songData = data.tracks.items;
        console.log("Artist: " + songData[0].artists[0].name);
        console.log("Song Name: " + songData[0].name);
        console.log("Preview Link: " + songData[0].preview_url);
        console.log("Album: " + songData[0].album.name);;
    })
}
//omdb function
function movie(inputs){
    var queryURL = "http://ww.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";

    request(queryURL, function (error, response, body){
        if (!inputs) {
            inputs = "Mr. Nobody";
        }
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
    fs.appendFile('random.txt', utf8, function(error, data){
        if (error) {
            return console.log(error);
        }
        var dataArray = data.split(",");
        if(dataArray[0] === "spotify-this-song"){
            var songcheck = dataArray[1].slice(1, -1);
            spotify(songcheck);
        }else if (dataArray[0] === "my-tweets"){
            var tweet = dataArray[1].slice(1, -1);
            twitter(tweet);
        }else if (dataArray[0] === "movie-this") {
            var movieName = dataArray[1].slice(1, -1);
            movie(movieName);
        }
    })
}

