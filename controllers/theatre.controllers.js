const theatreService = require('../services/theatre.service');
const { successResponseBody , errorResponseBody } = require('../utils/responsebody');

const create = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);
        if(response.err) {
            errorResponseBody.err = response.err;
            errorResponseBody.message = "Validation failed on few parameters of the request body";
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the theatre";
        return res.status(201).json(successResponseBody);

    } catch (error) {
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

const destroy = async (req , res) => {
    try {
        const response = await theatreService.deleteTheatre(req.params.id);
        if(response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully deleted the given theatre';
        return res.status(200).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

const getTheatre = async (req, res) => {
    try {
        const response = await theatreService.getTheatre(req.params.id);
        if(response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the data of the theatre";
        return res.status(200).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

const getAllTheatre = async (req , res) => {
    try {
<<<<<<< HEAD
        const response = await theatreService.getAllTheatre(req.query);
=======
        const response = await theatreService.getAllTheatre();
>>>>>>> master
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all the theatre";
        return res.status(200).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

const update = async (req, res) => {
    try {
        const response = await theatreService.updateTheatre(req.params.id, req.body);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the theatre";
        return res.status(200).json(successResponseBody);
    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}


<<<<<<< HEAD
const updateMovies = async (req, res) => {
    try {
        const response = await theatreService.updateMoviesInTheatres(
            req.params.id,
            req.body.movieIds,
            req.body.insert
        );
        if(response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated movies in the theatre";
        return res.status(200).json(successResponseBody);
    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

const getMovies = async (req, res) => {
    try {
        const response = await theatreService.getMoviesInTheatre(req.params.id);
        if(response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the movies for the theatre";
        return res.status(200).json(successResponseBody);
        
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

const checkMovie = async (req, res) => {
    try {
        const response = await theatreService.checkMovieInTheatre(req.params.theatreId, req.params.movieId);
        if(response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.status).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully checked if  the movie is present in the theatre";
        return res.status(200).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}


=======
>>>>>>> master
module.exports = {
    create,
    destroy,
    getTheatre,
    getAllTheatre,
<<<<<<< HEAD
    update,
    updateMovies,
    getMovies,
    checkMovie
=======
    update
>>>>>>> master
}