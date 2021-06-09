const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express'); 

//import route
const cartRoute=require('./cart-route/api');


//swagger documentation for express api/node js/rest api
const swaggerDefinition ={
    openapi: '3.0.0',
    info: {
        title: 'Express server for User API',
        version: '1.0.0',
    },
};

const options = {
    swaggerDefinition,
    apis:['./cart-route/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



//connection to mongodb
mongoose.connect('mongodb+srv://sahanams:sahana.01@cluster0.mwut0.mongodb.net/Cart',{useNewUrlParser:true,
     useUnifiedTopology:true, useFindAndModify:false},
         console.log('connected to mongodb') 
);
mongoose.Promise = global.Promise;

app.use(cors());

app.use(express.json());
//middleware route
app.use('/',cartRoute);

app.get('/' ,(req,res)=>{
    res.send("backend server");
});


app.listen(process.env.PORT || 7000 , function(){
    console.log("listening to request at port 7000");
});
