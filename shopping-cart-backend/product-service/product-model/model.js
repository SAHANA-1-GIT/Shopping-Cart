const mongoose=require("mongoose");
const productScheme=new mongoose.Schema({
    productimage:{
        type:String,
        required:true
    },
    productname:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('products',productScheme);