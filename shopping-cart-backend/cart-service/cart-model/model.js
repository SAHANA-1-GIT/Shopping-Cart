const mongoose=require("mongoose");
const cartScheme= new mongoose.Schema({
    ProductId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    },
   
});


module.exports=mongoose.model('carts',cartScheme);