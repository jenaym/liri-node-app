# LIRI-Bot

## Overview:
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and returns data based on one of the four commands:
   * `concert-this`
   * `spotify-this-song`
   * `movie-this`
   * `do-what-it-says`

## Technologies Used:
- Node.js
- JavaScript
- Bands In Town API: http://www.artists.bandsintown.com/bandsintown-api
- OMDB API: http://www.omdbapi.com
- Spotify API 
  
## Required npm Packages:
   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Request](https://www.npmjs.com/package/request)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)
  
## What Each Commands Does:
1.  concert-this
    * `node liri.js concert-this '<insert artist>'`
    * This command utilizes `request` to retrieve information about the user-inputed artist from the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id= + YOUR_APP_ID"`) and returns the following information about each event to the terminal:
      * Venue Name
      * Venue Location
      * Date of the Event (Using `moment` to format this as "MM/DD/YYYY")

    * Example: https://drive.google.com/file/d/1vfLueLOI6UHrl8jUtEohJtwXM0gVORjq/view

2. spotify-this-song
   * `node liri.js spotify-this-song '<song name here>'`
   * This command utilizes `node-spotify-api` to retrieve information about the user-inputed song from the Spotify API. The following information about the song is returned to the terminal:
       * Artist(s)
       * The name of the song
       * A preview of the song from Spotify
       * The album that the song is from
   * If no song is provided then your program will default to "The Sign" by Ace of Base.

   * Example: https://drive.google.com/file/d/1TZHNSX7CTfo471XW1KY4GkdU9FMQEK49/view 

3. movie-this
   * `node liri.js movie-this '<movie name here>'`
   * This command utilizes `request` to retrieve information about the user-inputed movie from the OMDB API, and returns the following information about the movie to the terminal:
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

   * Example: https://drive.google.com/file/d/13Hrm00N2SxcUiB_f1olhBzVgjZQ9VZc9/view

4. do-what-it-says
   * `node liri.js do-what-it-says`
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    
   * Example: https://drive.google.com/file/d/1hI_zWJI2FaLVYcSGZNsZ_y6XElz-Crd6/view


## Before Beginning:
  * Obtain a Spotify API **client id** and **client secret**
    1. Sign up as a developer to register a new application         <https://developer.spotify.com/my-applications/#!/applications/create>
    2. Create an .env file in your project's directory
    3. Paste your SPOTIFY_ID and SPOTIFY_SECRET into the .env file
  * Create a .gitignore file to prevent the following files from being committed to GitHub:
        node_modules
        .DS_Store
        .env

## Author:
  * Jenay McAuley