var config = require("./keys.js");
var nodeArg = process.argv;
var argArr = [];
var title = "";

var Twitter = require('twitter');
var spotify = require('spotify');
var fs = require("fs");


function initApp(){
    if (nodeArg[2]){
        if (nodeArg[2] === "my-tweets"){
            myTweeter();
            fs.appendFile("log.txt", nodeArg[2]+"\n", function(err) {});
            return;
        } else if (nodeArg[2] === "spotify-this-song"){
            console.log("");
            console.log("Welcome to Spotify!!");
            if(nodeArg[3]){
                for(i = 3; i<nodeArg.length; i++){
                    argArr.push(nodeArg[i]);
                };
                title = argArr.join(" ");
                console.log("Song name : "+title);
                mySpotify(0);
                fs.appendFile("log.txt", nodeArg[2]+", "+title+"\n", function(err) {});
                return;
            } else if(nodeArg[3] === undefined){
                title = "The Sign";
                console.log("Song name : "+title);
                mySpotify(4);
                fs.appendFile("log.txt", nodeArg[2]+"\n", function(err) {});
                return;
            };
            return;
        } else if (nodeArg[2] === "movie-this") {
            console.log("");
            console.log("");
            console.log("");
            console.log("Sorry this function is not available");
            console.log("");
            console.log("");
            console.log("");
            return;
        } else if (nodeArg[2] === "do-what-it-says") {
            random();
            fs.appendFile("log.txt", nodeArg[2]+"\n", function(err) {});
            return;
        };
    };
};

initApp();

function myTweeter(){

    var Twit = new Twitter(config.twitterKeys);

    Twit.get('statuses/user_timeline',{count: 10},function(err, tweets, res) {
        if(err) throw err;
        console.log("");
        console.log("Account name: "+tweets[0].user.name);
        console.log("**********************************");
        for(i = 0; i < tweets.length; i++){
            console.log("");
            console.log("Date: "+tweets[i].created_at);
            console.log("Tweet: "+tweets[i].text); 
            console.log("");
            console.log("----------------------------------------------------");
        };
        return;
    });
};

function mySpotify(x) {
    spotify.search({ type: 'track', query: title}, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        };
            console.log("***************************************************");
            console.log("");
            console.log("Artist: "+data.tracks.items[x].album.artists[0].name);
            console.log("Song name: "+data.tracks.items[x].name);
            console.log("Preview link: "+data.tracks.items[x].preview_url);
            console.log("album: "+data.tracks.items[x].album.name);
            console.log("");
            console.log("---------------------------------------------------");
        return;
    });
};

function random() {
  fs.readFile("random.txt", "utf8", function(error, data) {
  
  var dataArr = data.split(",");
  
  nodeArg[2] = dataArr[0];
  nodeArg[3] = dataArr[1].replace(/"/g, "");
  initApp();
  return;
  });
};
