const {errorResponseBody } = require('../utils/responsebody');
const { STATUS_CODES } = require('../utils/constants');


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
        errorResponseBody.err = "The name of the theatre is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody)
    }

    //validate for the presence of pincode
    if(!req.body.pincode){
        errorResponseBody.err = "The pincode of the theatre is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody)
    }

    //validate for the presence of city
    if(!req.body.city){
        errorResponseBody.err = "The city of the theatre is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody)
    }

    next();// everything is fine move to the next middleware
}

const validateUpdateMoviesRequest = async (req, res, next) => {
    //validation of insert parameter
    if(req.body.insert == undefined) {
        errorResponseBody.err = "The insert parameter is missing in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    // validate moviesIds presence
    if(!req.body.movieIds) {
        errorResponseBody.err = "No movies present in the request to be updated in theater";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    // validate if moviesIds is an array or not
    if(!(req.body.movieIds instanceof Array)) {
        errorResponseBody.err = "Expected array of movies but found something else";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    // validate if moviesIds is empty or not
    if(req.body.movieIds.length == 0) {
        errorResponseBody.err = "No movies present in the array provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    // everything is fine
    next();
}

module.exports = {
    validateTheatreCreateRequest,
    validateUpdateMoviesRequest
}