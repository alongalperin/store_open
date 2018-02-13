const bcryptjs = require('bcryptjs');
const Customer = require('../models/customer');

module.exports = {
    
    getAll: (req, res, next) => {
        Customer.getAllCustomers()
            .then((customers) =>{
                res.json({error: false, data: customers});
            });
    },
    
    create: (req, res, next) => {
        //let rawPassword = req.body.password;
        //let hasedPassword = hashPassword(rawPassword);
        
        Customer.create(
            req.body.email,
            hashPassword(req.body.password),
            req.body.firstname,
            req.body.lastname
        ).then((customerID) => res.json({error:false, data: customerID}))
        .catch(function (err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
    },
    
    // get customer with the email given in req.params  
    getCustomerByMail: (req, res, next) => {
        Customer.getCustomerByEmail(req.params.email)
            .then((customer) => res.json({error: false, data: customer.toJSON()}));
    },
    
    // delete customer with the email given in req.params
    delete: (req, res, next) => {
        Customer.deleteByEmail(req.params.email)
            .then(() => {res.status(200).json({error: false, data: {message: "deleted successfully"}})})
            .catch((err) => {res.status(500).json({error: true, data: {message: err.message}})});
    },
    
    // update customer with the email given in req.params 
    update: (req, res, next) => {
        let password_hashed;
        let updatedDetails = req.body;
        if (updatedDetails.password)
        {
            // if the password already hashed - hashPassword() wont hash the password again
            password_hashed = hashPassword(req.body.password);
            updatedDetails.password = password_hashed;
        }
        Customer.updateByMail(updatedDetails)
            .then(() => {res.status(200).json({error: false, data: {message: "updated successfully"}})})
            .catch((err) => {console.log(err);res.status(500).json({error: true, data: {message: err.message}})});
    },
}


function hashPassword(rawPassword){
    console.log(rawPassword);
    const prefix = "$2a";
    if (rawPassword.indexOf(prefix) >= 0) // password is already hashed and we got here from the update function
    {
        return rawPassword;
    } else {
        const salt = bcryptjs.genSaltSync(10);
        let hash = bcryptjs.hashSync(rawPassword, salt);
        console.log(hash);
        return hash;
    }
}