// api
// api.openweathermap.org/data/2.5/weather?q=Delaware&appid=02b1cc1079f9ef60f23fb2710da14b70;
//
const express = require("express");
const { readSync } = require("fs");
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
})

app.post("/", function(req, res){
    var query = req.body.cityName;
    const APIkey = "02b1cc1079f9ef60f23fb2710da14b70";
    var units = "metric";
    const wURL = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" +  APIkey + "&units=" + units;
    https.get(wURL, function(response){
        response.on('data', function(d){
        const weatherData = JSON.parse(d);
        var temp = weatherData.main.temp;
        var city = weatherData.name;
        var desc = weatherData.weather[0].description;
        var iconURL = `"http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"`;
        res.write("<h1>The temperature is currently " + temp + "C in " + city +". The weather is " + desc + ".</h1>");
        res.write("<img src=" + iconURL + ">");
        res.send(); 
        })
    });
});




app.listen(3000, function(){
    console.log("Server is running on port 3000.")
})