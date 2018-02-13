const auth_controller = require('../controllers/auth_controller.js');

module.exports = (app) => {

    app.post('/login', auth_controller.login);
    app.post('/register', auth_controller.register);
    
}