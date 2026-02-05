const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');

env.config();
const app = express(); // express app object

//configuring body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/home', (req, res)=> {
    console.log("Hitting /home");
    return res.json({
        sucess: true,
        message:'Fetched /home',
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT} !!`);
});