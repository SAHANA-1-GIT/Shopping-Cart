const mongoose=require("mongoose");
const userScheme= new mongoose.Schema({
    username:{
        type:String,
        required:false
    },
    emailid:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('users',userScheme);
