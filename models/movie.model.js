const mongoose = require('mongoose');

/**
 * Define the schema of the movie resource to be stored in the db
 */

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 2
    },
    description: {
        type: String,
        require: true,
        minLength: 5
    },
    casts: {
        type: [String],
        require: true
    },
    trailerUrl: {
        type: String,
        require: true
    },
    language: {
        type: String,
        require: true,
        default: "English"
    },
    releaseDate: {
        type: String,
        require: true
    },
    director: {
        type: String,
        require: true
    },
    releaseStatus: {
        type: String,
        require: true,
        default: "RELEASED"
    },
}, {timestamps: true});

const Movie = mongoose.model('Movie', movieSchema); //

module.exports = Movie; // returning the model