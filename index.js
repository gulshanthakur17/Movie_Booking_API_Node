const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');


const MovieRoutes = require('./routes/movie.routes');

env.config();
const app = express(); // express app object

//configuring body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

MovieRoutes(app); //invoking movie routes

app.get('/home', (req, res)=> {
    console.log("Hitting /home");
    return res.json({
        sucess: true,
        message:'Fetched /home',
    });
});

app.listen(process.env.PORT, async () => {
    console.log(`Server Started on Port ${process.env.PORT} !!`);

    try {
        await mongoose.connect(process.env.DB_URL); // connected to mongo server
        console.log("Successfully Connected to mongo");

        // await Movie.create({
        //     name: "Bacchan Pandey",
        //     description: "Comedy masala movie",
        //     casts:["Akshay Kumar", "Kriti Sanon"],
        //     director:"Farhad Samji",
        //     trailerUrl: "http://bacchanpandey/trailers/1",
        //     language: "Hindi",
        //     releaseDate: "01-01-2026",
        //     releaseStatus: "RELEASED"
        // });

    } catch (err) {
        console.log("Not able to connect mongo", err);    
    }


});