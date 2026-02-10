const theatreController = require('../controllers/theatre.controllers');
const theatreMiddleware = require('../middlewares/theatre.middlewares');
const authMiddleware = require('../middlewares/auth.middlewares');


const routes = (app) => {
    // routes function takes express app object as parameters

    //CREATE
    app.post(
        '/mba/api/v1/theatre',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        theatreMiddleware.validateTheatreCreateRequest,
        theatreController.create
    );

    // DELETE
    app.delete(
        '/mba/api/v1/theatre/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        theatreController.destroy
    );

    //READ
    app.get(
        '/mba/api/v1/theatre/:id',
        theatreController.getTheatre
    );

    //READ
    app.get(
        '/mba/api/v1/theatre',
        theatreController.getAllTheatre
    );

    //UPDATE
    app.patch(
        '/mba/api/v1/theatre/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        theatreController.update
    );

    //UPDATE
    app.put(
        '/mba/api/v1/theatre/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        theatreController.update
    );
    

    //
    app.patch(
        '/mba/api/v1/theatre/:id/movies',
        theatreMiddleware.validateUpdateMoviesRequest,
        theatreController.updateMovies
    );

    //
    app.get(
        '/mba/api/v1/theatre/:id/movies',
        theatreController.getMovies
    );

    //
    app.get(
        '/mba/api/v1/theatre/:theatreId/movies/:movieId',
        theatreController.checkMovie
    );

}

module.exports = routes;