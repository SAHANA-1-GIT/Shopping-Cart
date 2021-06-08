const mongoose=require("mongoose");
const orderScheme= new mongoose.Schema({
    
    ProductId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    },
    
    
});


module.exports=mongoose.model('order',orderScheme);