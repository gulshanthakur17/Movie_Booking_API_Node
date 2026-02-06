const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');


const MovieRoutes = require('./routes/movie.routes');
const TheatreRoutes = require('./routes/theatre.routes');

env.config();
const app = express(); // express app object

//configuring body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

MovieRoutes(app); //invoking movie routes
TheatreRoutes(app);// invoking theatre routes

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
    } catch (err) {
        console.log("Not able to connect mongo", err);    
    }


});