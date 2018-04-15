// setting variables for global scope

require("dotenv").config();
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

