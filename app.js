const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// const users = require('./routes/api/users');

var app = express();

// formdata middleware
app.use(bodyParser.urlencoded({
    extended:false
}));

// jsonbody middleware
app.use(bodyParser.json());
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Credentials", true);
    response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });

  
//cors middleware
app.use(cors);



app.use(express.static(path.join(__dirname,'public')));



const PORT = process.env.PORT || 5000;

app.get('/',(req,res) => {
    return res.send("<h2> Carnival </h2>");
});

const db = require('./config/keys').mongoURI;

mongoose.connect(db,{
    useNewUrlParser:true
}).then(()=>{
    console.log('Database Connected :'+  db)
}).catch(err => {
    console.log('Unable to connect')
});

const users = require('./routes/api/users');

app.use('/api/users',users);


// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT,()=> {
    console.log('Server Running');
})