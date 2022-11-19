const express = require("express"); 
const https = require("https"); 
const bodyParser = require("body-parser"); 

const app = express(); 

app.use(bodyParser.urlencoded({extended: true})); 

app.get("/", function(req, res) {

     res.sendFile(__dirname + "/index.html"); 

    // res.send("server is up and running"); 
})

app.post("/", function(req, res){
    console.log(req.body.cityName);

    console.log("Post request recieved");

    const query = req.body.cityName; 
    const apiKey = "f6e6130bbf867afbc138ed4657a16cd0"; 
    const unit = "metric"; 
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units="+ unit +"";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const temp = weatherData.main.temp; 
            console.log(temp);

            const description = weatherData.weather[0].description; 
            console.log(description);

            const maxTemp = weatherData.main.temp_max; 
            console.log("maximum temperature = " + maxTemp);

            const icon = weatherData.weather[0].icon; 
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 

            res.write("<h2>The weather is " + description + "</h2>");   
            res.write("<h1>The temperature in "+ query +" is " + temp + " degree celcius</h1>");
            res.write("maximum temperature = " + maxTemp);
            res.write("<img src="+ imgURL +">");
            res.send(); 
        })

    });
})






app.listen(3000, function() {
    console.log("Server is running on port 3000");
})