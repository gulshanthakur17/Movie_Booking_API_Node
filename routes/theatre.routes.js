const theatreController = require('../controllers/theatre.controllers');


const routes = (app) => {
    app.post(
        '/mba/api/v1/theatre',
        theatreController.create
    );
    
}

module.exports = routes