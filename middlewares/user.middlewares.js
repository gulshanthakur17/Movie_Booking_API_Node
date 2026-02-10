const { errorResponseBody } = require('../utils/responsebody');
const  { STATUS_CODES } = require('../utils/constants');

const validateUpdateUserRequest = (req, res, next) => {
    // validate presence of atleast one of the two i.e. userRole or userStatus
    if(!(req.body.userRole || req.body.userStatus)) {
        errorResponseBody.err = 'Malformed request, please send atleast one parameter';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    next();

}

module.exports = {
    validateUpdateUserRequest,
}