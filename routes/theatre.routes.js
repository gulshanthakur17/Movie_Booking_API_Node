const theatreController = require('../controllers/theatre.controllers');
const theatreMiddleware = require('../middlewares/theatre.middlewares');


const routes = (app) => {
    app.post(
        '/mba/api/v1/theatre',
        theatreMiddleware.validateTheatreCreateRequest,
        theatreController.create
    );

    app.delete(
        '/mba/api/v1/theatre/:id',
        theatreController.destroy
    );

    app.get(
        '/mba/api/v1/theatre/:id',
        theatreController.getTheatre
    );
    
}

module.exports = routes;