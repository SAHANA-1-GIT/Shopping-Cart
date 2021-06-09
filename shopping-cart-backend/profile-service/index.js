const bodyParser = require('body-parser');
const express=require('express');
const mongoose=require('mongoose');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express'); 

//express app set up
const app=express();

//setting up route
const user=require('./profile-route/api');

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
    apis:['./profile-route/*.js'],
};



const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.all("/*", function(req, res,next){
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Methods', 'POST,OPTIONS');
     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
     next();
});


//connection to mongodb
mongoose.connect('mongodb+srv://sahanams:sahana.01@cluster0.mwut0.mongodb.net/Profile',{useNewUrlParser:true,
     useUnifiedTopology:true, useFindAndModify:false},
         console.log('connected to mongodb')
);
mongoose.Promise = global.Promise;

/*
//setting up route
const user=require('./profile-route/api');

*/
app.use(express.json());
app.use(user);

app.use(function(err,req,res,next){
    res.status(401).send({error:err.message}); 
}); 

/*
app.post('/api', function(req,res){
    console.log("post request");
    res.send("api");
    
});
*/


app.listen(process.env.port || 5000 , function(){
    console.log("listening to request at port 5000"); 
});