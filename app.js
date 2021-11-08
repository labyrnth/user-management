const express = require('express');
const exphbs = require ('express-handlebars');
const bodyParser =require('body-parser');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.static('public'));
require('dotenv').config();
// parsing middleware
//parser appn/x-mw-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

//parse appn/json
app.use(bodyParser.json());
//static  files
//app.use(express.static('public'));

//Templating Engine
app.engine('hbs',exphbs({extname:'.hbs'}));//setting the file extension as .hbs in place of .handlebars
app.set('view engine','hbs');


//connection pool

const pool = mysql.createPool({
    connectionLimit: 100,
    host           : process.env.DB_HOST,
    user           : process.env.DB_USER,
    password       : process.env.DB_PASS,
    database       : process.env.DB_NAME
});
//connect to  DB
pool.getConnection((err,connection)=>{
    if(err) console.log(err);
    console.log('connected as ID '+ connection.threadId);

})

const routes = require('./server/routes/user');
app.use('/',routes);

app.listen(port,()=>console.log(`listening on port ${port}`));