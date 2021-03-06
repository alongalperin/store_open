# Store Open Source  
### by Alon Galperin
  
Project that provide a system for managing online store.   
  
The project is containing only the servser side for now, the front end will be simulated using Google Postmman [Link to download Postmane](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)  
The project is programmed in NodeJS, and SQL as database. I am using MySQL.  
  
## Let's Get Started:  
  
__How to run the project?__
  
#### Requirments  
First make you have on your computer SQL environment: MySQL, SQLite or PostgreSQL.  
My code is using MySQL, so if you work with MySQL you don't have to do alot of changes in the code.  
Make use you have database named **store**.  

#### Download the Project  
Download or Clone the project  
```
git clone https://github.com/alongalperin/store_open.git
```
  
#### Edit db_config.js  
Open the file db_config.js in the folder config and change there the settings according to your environment.  
  
The project has package.json which we will help us install the dependencies.  
  
In the package.json file we have entry for installing MySQL client.  
**If you are using SQL environment that is not MySQL you can remove this line from package.json: "mysql": "^2.15.0".**  
  
#### Run the Project  
Open command line and navigate to the project path.  

Install dependecies:
```
npm install
```
If you use PostgreSQL or SQLite run one of the following:
```
npm install pg --save
npm install sqlite3 --save
```
### Create the tables:  
We have script that create the tables in "store" database, using the Knex.js (query builder).  
To run this script, type in the command line:
```
node create_tables.js
```

__The tables in the database:__  
  
__Customers:__  

| Column         | Type   |
| :------------- | :----- |
| cusetomer_id   | int    |
| email          | string |
| first_name     | string |
| last_name      | string |
| password hased | string |
  
__Categories:__  

| Column        | Type   |
| :------------ | :----- |
| cat_id        | int    |
| category_name | string |
  
__Products:__  

| Column       | Type   |
| :----------- | :----- |
| product_id   | int    |
| product_name | string |
| quantity     | int    |
| category_id  | int    |
  
__Purchases:__

| Column        | Type      |
| :------------ | :-------- |
| purchase_id   | int       |
| customer_id   | int       |
| purchase_date | timestamp |
  
__products_in_purchases:__  

| Column      | Type |
| :---------- | :--- |
| purchase_id | int  |
| product_id  | int  |
| quantity    | int  |

### To start the server:  
```
node app.js
```
The app will listen on port 3000
