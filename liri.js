
require("dotenv").config();
var request = require('request');
var Spotify = require('node-spotify-api');

var keys = require("./keys.js"); 
var fs = require('fs');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);


let userCommand = process.argv[2];
let userSearch = process.argv[3];

function runCommand() {
switch (userCommand) {
    case ('concert-this'):
        concertThis(userSearch);
    break;
    case ('spotify-this-song'):
        if (userSearch) {
            spotifyThisSong(userSearch);
        }
        else {
            spotifyThisSong("The Sign");
        }
    break;
    case ('movie-this'):
        if (userSearch) {
            movieThis(userSearch);
        }
        else {
            movieThis('Mr. Nobody')
        }
    break;
    case ('do-what-it-says'):
        doWhatItSays();
    break;
};
};

function concertThis(artist) {
    let bandsURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(bandsURL, function (error, data, body) {
        if (!error && data.statusCode === 200) {
            let results = JSON.parse(body);

            for (var i = 0; i < results.length; i++) {
                    //Venue Name
                let name = results[i].venue.name;
                    //Venue Location
                let city = results[i].venue.city;
                let state = results[i].venue.region;
                let country = results[i].venue.country;
                let location = city + ", " + state + ", " + country;

                    //Date of the Event (MM/DD/YYYY)
                let date = moment(results[i].datetime).format("MM/DD/YYYY");

                console.log("Concert Venue: " + name + 
                "\nVenue Location: " + location + 
                "\nConcert Date: " + date + "\n");   
            }

        }
        else {
            console.log(error);
        }
    })
}

function spotifyThisSong(song) {
spotify.search({ type: 'track', query: song, limit: 1 }, function(error, data){
    if (!error) {

        let results = data.tracks.items[0];
  //Artist(s)
        let artist = results.album.artists[0].name;
  
  //The Song's name
        let name = results.name

  //A preview link of the song from Spotify
        let previewLink = results.preview_url;

  //The album name
        let albumN = results.album.name;

  //If no song is provided then your program will default to "The Sign" by Ace of Base
     console.log("Song Title: " + name +
     "\nArtist Name: " + artist + 
     "\nAlbum: " + albumN + 
    "\nPreview Link: " + previewLink + "\n");

    } else {
        console.error(error);
    };
})
}

function movieThis(movie) {
    let movieURL = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy';
    request(movieURL, function (error, data, body) {
        if (!error) {
            let data = JSON.parse(body);
        
        //Title
            let title = data.Title;
        //Year Movie came out
           let year = data.Year;
        //IMDB Rating 
            let imdbRating = data.imdbRating;
        //Rotten Tomatoes Rating
            let rottenRating = data.Ratings[1].Value;
        //Production Country
            let country = data.Country;
        //Language
            let language = data.Language;
        //Plot
            let plot = data.Plot;
        //Actors
            let actors = data.Actors;

            console.log("Movie Title: " + title + 
                "\nYear: " + year + 
                "\nIMDB Rating: " + imdbRating + 
                "\nRotten Tomatoes Rating: " + rottenRating + 
                "\nProduction Country: " + country + 
                "\nLanguage: " + language + 
                "\nPlot: " + plot + 
                "\nActors: " + actors + "\n");
            
        }
        else {
            console.log(error);
        }
    });
};
function doWhatItSays() {

    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (!error) {
            
        // Gets data from txt file and uses .split to split the data by the commas 
        var dataArray = data.split(',');

        userCommand = dataArray[0];
        userSearch = dataArray.slice(1).join(" ");

        runCommand();

        }
        else {
            console.log(error);
        }
    })
}

runCommand();
