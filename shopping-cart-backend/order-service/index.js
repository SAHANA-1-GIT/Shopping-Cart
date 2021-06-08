const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');


const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express'); 

//import route
const orderRoute=require('./order-route/api');



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
    apis:['./order-route/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//connection to mongodb
mongoose.connect('mongodb+srv://sahanams:sahana.01@cluster0.mwut0.mongodb.net/Order',{useNewUrlParser:true,
     useUnifiedTopology:true, useFindAndModify:false},
         console.log('connected to mongodb')
);
mongoose.Promise = global.Promise;

app.use(cors());

app.use(express.json());
//middleware route
app.use('/',orderRoute);

app.get('/' ,(req,res)=>{
    res.send("backend server");
});


app.listen(process.env.PORT || 4000 , function(){
    console.log("listening to request at port 4000");
});

