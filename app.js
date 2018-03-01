// importing modules

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const route = require('./routes/route');

//connect to mongodb
mongoose.connect('mongodb://localhost/contactlist');
// mongoose.connect('mongodb://localhost/nodekb');
let db=mongoose.connection; 

// check for connection
db.once('open',function(){
    console.log('Connected to MongoDB');
});     

// check for db error  
db.on('error',function(err){
    console.log(err);
});



//middleware - cors
app.use(cors());

//bodyparser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname,'public')));

//routes
app.use('/api',route);

app.get('/',function(req,res){
    res.send('Hello World!');
});


app.listen(3000,function(){
    console.log('Server started at port 3000');
});