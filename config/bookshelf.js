let db_config = require('./db_config.js');

let knex = require('knex')(db_config);
let bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;