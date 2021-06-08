const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerDefinition= {
    openapi: '3.0.0',
    info: {
        title: 'Express api for json placeholder',
        version: '1.0.0',
        description:
           'this is a REST API application made with Express',
        license: {
            name: 'licensed uder MIT',
            url: 'https://spdx.org/license/MIT.html',
        },
        contact: {
            name: 'JSONPlaceholder',
            url: 'https://jsonplaceholder.typecode.com',
        },   
    },
    servers: [
        {
        url: 'http://localhost:3000',
        description: 'development server',
       },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./product-route/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//import route
const productRoute=require('./product-route/api');

//connection to mongodb
mongoose.connect('mongodb+srv://sahanams:sahana.01@cluster0.mwut0.mongodb.net/Product',{useNewUrlParser:true,
     useUnifiedTopology:true, useFindAndModify:false},
         console.log('connected to mongodb')
);
mongoose.Promise = global.Promise;

app.use(cors());

app.use(express.json());
//middleware route
app.use('/',productRoute);

app.get('/' ,(req,res)=>{
    res.send("backend server");
});


app.listen(process.env.PORT || 3000, function(){
    console.log("listening to request at port 3000");
});
