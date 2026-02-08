const {errorResponseBody } = require('../utils/responsebody');


/**
 * 
 * @param req -> HTTP request object
 * @param  res -> HTTP response object
 * @param  next -> Next middleware function
 * @returns -> whether the request is valid or not
 */


const validateTheatreCreateRequest = async (req, res, next) => {
    
    //validate the presence of name
    if(!req.body.name){
        errorResponseBody.message = "The name of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody)
    }

    //validate for the presence of pincode
    if(!req.body.pincode){
        errorResponseBody.message = "The pincode of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody)
    }

    //validate for the presence of city
    if(!req.body.city){
        errorResponseBody.message = "The city of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody)
    }

    next();// everything is fine move to the next middleware
}

<<<<<<< HEAD
const validateUpdateMoviesRequest = async (req, res, next) => {
    //validation of insert parameter
    if(req.body.insert == undefined) {
        errorResponseBody.message = "The insert parameter is missing in the request";
        return res.status(400).json(errorResponseBody);
    }
    // validate moviesIds presence
    if(!req.body.movieIds) {
        errorResponseBody.message = "No movies present in the request to be updated in theater";
        return res.status(400).json(errorResponseBody);
    }
    // validate if moviesIds is an array or not
    if(!(req.body.movieIds instanceof Array)) {
        errorResponseBody.message = "Expected array of movies but found something else";
        return res.status(400).json(errorResponseBody);
    }
    // validate if moviesIds is empty or not
    if(req.body.movieIds.length == 0) {
        errorResponseBody.message = "No movies present in the array provided";
        return res.status(400).json(errorResponseBody);
    }
    // everything is fine
    next();
}

module.exports = {
    validateTheatreCreateRequest,
    validateUpdateMoviesRequest
=======

module.exports = {
    validateTheatreCreateRequest,
>>>>>>> master
}