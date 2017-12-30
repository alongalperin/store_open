const db_config = require('./config/db_config.js');
const knex = require('knex')(db_config);

/* First delete previous tables if exsists
We start from deleteing table with foreign keys to other tables */
knex.schema.dropTableIfExists('products_in_purchases')
        .dropTableIfExists('purchases')
        .dropTableIfExists('products')
        .dropTableIfExists('categories')
        .dropTableIfExists('customers')
        
// Create a Customers table
.createTable('customers', function(table) {
  table.increments('customer_id');
  table.string('email').unique().notNull();
  table.string('first_name').notNull();
  table.string('last_name').notNull();
  table.string('password_hashed').notNull();
})

// Create accounts table
.createTable('categories', function(table) {
  table.increments('cat_id').unsigned();
  table.string('category_name').unique().notNull();
})

// Create products table
.createTable('products', function(table) {
  table.increments('product_id').primary();
  table.string('product_name');
  table.integer('category_id').unsigned().references('cat_id').inTable('categories').onDelete("CASCADE");
})

// Create purchases table
.createTable('purchases', function(table) {
  table.increments('purchase_id').primary();
  table.integer('customer_id').unsigned().references('customer_id').inTable('customers').onDelete("CASCADE");
  table.timestamp('purchase_date').defaultTo(knex.fn.now());
})

// Create products in purchases table
.createTable('products_in_purchases', function(table) {
  table.integer('purchase_id').unsigned().references('purchase_id').inTable('purchases').onDelete("CASCADE");
  table.integer('product_id').unsigned().references('product_id').inTable('products').onDelete("CASCADE");
  table.integer('quantity').unsigned();
})

// enter 1 customer to db
.then(async function() {
    let customer = {
      email: 'time@a.com',
      first_name: 'Kobi',
      last_name: 'Baker',
      password_hashed: 'passhased'
    };
    await knex.insert(customer).into('customers').then(function(id) {})
    // insertRecordToTable('customers', customer);
})

// enter 1 category to db
.then(async function() {
    let category = {
      category_name: 'toys',
    };
    await knex.insert(category).into('categories').then(function(id) {})
})

// enter 1 product to db. category id is forgien key
.then(async function() {
    let product = {
      product_name: 'lego',
      category_id: 1
    };
    knex.insert(product).into('products').then(function(id) {});
    //insertRecordToTable('products', product);
})

// enter 1 purchase to db
.then(async function() {
    let purchase = {
          customer_id: 1
    };
    knex.insert(purchase).into('purchases').then(function(id) {});
    //insertRecordToTable('purchases', purchase);
})

// enter 1 product to purchase to db
.then(async function() {
    let product_in_purchase = {
      purchase_id: 1,
      product_id: 1,
      quantity: 7
    };
    await knex.insert(product_in_purchase).into('products_in_purchases').then(function(id) {})
})

// print customers table
.then(async function() {
   console.log();
   await printTable('customers', 'Customer in database customers'); 
})

// print categories table
.then(async function() {
   await printTable('categories', 'Category in database categories'); 
})

// print products table
.then(async function() {
   await printTable('products', 'Product in database products');
})

// print purchases table
.then(async function() {
   await printTable('purchases', 'Purchase in database purchases');
})

// print products in purchases table
.then(async function() {
   await printTable('products_in_purchases', 'Product in Purchase in database purchases');
})

// Finally, add a .catch handler for the promise chain
.catch(function(e) {
   console.error(e);
})
.finally(async function() {
   await knex.destroy();
   console.log("end of file");
});

/*
    helper function, input: table name and catption
    output: print the caption and the rows in table
*/
function printTable(tableName, caption) {
    knex(tableName)  // get rows from database
    .select()
    .then(function(rows) {
        console.log(caption + ":");
        // map over the rows
        console.log();
        rows.map(function(row) {
          console.log(row);
        })
        console.log();
        console.log("============================");
        console.log();
    })
    return;
}