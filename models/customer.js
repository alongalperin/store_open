let bookshelf = require("../config/bookshelf");
let Promise  = require('bluebird');

let customer_model = bookshelf.Model.extend({
  tableName: 'customers'
},
                                            
{ // methods
  getCustomerByEmail: Promise.method(function(email) {
    if (!email) throw new Error('Email is required');
        return new this({email: email.toLowerCase().trim()}).fetch({require: true});
  }),
    
  getAllCustomers: Promise.method(function() {
    return new this({}).fetchAll({require: false});
  }),
    
  create: Promise.method(function(_customer) {
    return new this(
      _customer
    )
    .save()
  }),
  
  deleteByEmail: Promise.method(function(_email) {
    let trimmedEmail = _email.toLowerCase().trim();
    return new this({email: trimmedEmail }).fetch({require: true})
      .then((customer) => {
        if (customer != null) {
          return new this().where('email', '=', trimmedEmail).destroy();
        }
      }
      ).catch((err) => { throw new Error('user not deleted'); });
  }),

  updateByMail: Promise.method(function(_updatedDetails) {
    let trimmedEmail = _updatedDetails.email.toLowerCase().trim();
    return new this({email: trimmedEmail }).fetch({require: true})
      .then((customer) => {
        if (customer != null) {
          new this().where('email', '=', trimmedEmail).set({
            first_name: _updatedDetails.firstname || this.first_name,
            last_name: _updatedDetails.lastname || this.last_name,
            password_hashed: _updatedDetails.password || this.password
          }).save({}, {
            method: 'update' // specify that the record need to be updated and not saved as new record
        })
        }
      }
      ).catch((err) => { throw new Error('user not updated'); });
  }),
})

module.exports = customer_model