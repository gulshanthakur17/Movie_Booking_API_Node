const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');


const MovieRoutes = require('./routes/movie.routes');
const TheatreRoutes = require('./routes/theatre.routes');
const AuthRoutes = require('./routes/auth.routes');
const UserRoutes = require('./routes/user.routes');

env.config();
const app = express(); // express app object

//configuring body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

<<<<<<< HEAD
mongoose.set('debug', true);

=======
>>>>>>> master
MovieRoutes(app); //invoking movie routes
TheatreRoutes(app);// invoking theatre routes
AuthRoutes(app); // invoking auth routes
UserRoutes(app); //invoking user routes


app.listen(process.env.PORT, async () => {
    console.log(`Server Started on Port ${process.env.PORT} !!`);

    try {
        await mongoose.connect(process.env.DB_URL); // connected to mongo server
        console.log("Successfully Connected to mongo");
    } catch (err) {
        console.log("Not able to connect mongo", err);    
    }
});