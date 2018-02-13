const customers_controller = require('../controllers/customers_contoller.js');

module.exports = (app) => {
    
    app.get('/users', customers_controller.getAll);
    app.get('/users/:email', customers_controller.getCustomerByMail);
    app.post('/users', customers_controller.create);
    app.delete('/users/:email', customers_controller.delete);
    app.put('/users/', customers_controller.update);

}