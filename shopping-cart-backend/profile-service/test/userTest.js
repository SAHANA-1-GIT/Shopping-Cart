const assert = require('chai').assert;
const userApi= require('../profile-route/api');
const request = require('superset');

describe("testing for signup and login", ()=>{
    
    var userCredentials={
        username:"stefan",
        emailid:"stefan@gmail.com",
        password:"stefan123"
    }
    
    
    it("it should create the new user and the data to databse", function(){
       request(userApi)  
       .post('/signup')
       .send(userCredentials)
       .end(function(err,response){
           except(response.statusCode).to
           .equal(200);
       });
    });

});
