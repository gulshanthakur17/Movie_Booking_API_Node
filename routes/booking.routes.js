const bookingController = require('../controllers/booking.controller');

const authmiddleware = require('../middlewares/auth.middlewares');
const bookingMiddleware = require('../middlewares/booking.middlewares');

const routes = (app) => {
    app.post(
        '/mba/api/v1/bookings',
        authmiddleware.isAuthenticated,
        bookingMiddleware.validateBookingCreateRequest,
        bookingController.create
    )
}

module.exports = routes;