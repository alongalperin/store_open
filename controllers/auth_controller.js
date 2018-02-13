const bcryptjs = require('bcryptjs');
const Customer = require('../models/customer.js');

module.exports = {
    
    login: (req, res, next) => {
        let _email = req.body.email;

        Customer.getCustomerByEmail(_email)
            .then((customer) => {
                if (bcryptjs.compareSync(req.body.password , customer.get("password_hashed"))) {
                    res.status(200).send(customer);
                } else {
                    res.status(201).send("wrong password");
                }
            })
            .catch((err) => { res.status(300).send("user not found") } );
    },

    register: (req, res, next) => {
        Customer.create(req.body)
        .then((customer) => { res.status(200).send(customer); })
        .catch((err) => { console.log(err); res.status(789).send("user not created") } );
    }
}