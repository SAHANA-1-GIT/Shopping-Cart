const express = require('express');
const router=require('express').Router();
const axios= require('axios');    
const mongoose  = require('mongoose');
const Order=require('../order-model/model');

/**
 * @swagger
 * /orders:
 *  post:
 *   summary: It will add the product to order database and place the order.
 *   reponses:
 *   201:
 *     description: saves product id to order database
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          data:
 *            type: object
 *            properties:
 *              id: 
 *                type: integer
 *                description: The user id
 *                example: 0
 *              name:
 *                type: string
 *                description: The user name.
 *                example: marry
 * 
 *     
 */


router.post('/product/:id',async (req,res)=>{
    var newOrder={
        ProductId:mongoose.Types.ObjectId(req.body.ProductId)
    };
   var order= new Order(newOrder);
  await order.save()
   .then(()=>{
       console.log('order placed');
       res.send('order placed');
   }).catch((err)=>{
        if(err){
            console.log('cannot process the order');
            res.send('cannot place the order');
        }
   });
    res.send('POST req');

});


/**
 * @swagger
 * /orders:
 *  get:
 *   summary: It will fetch all the orders from order database.
 *   reponses:
 *   201:
 *     description: displays all the products from order database
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          data:
 *            type: object
 *            properties:
 *              id: 
 *                type: integer
 *                description: The user id
 *                example: 0
 *              name:
 *                type: string
 *                description: The user name.
 *                example: marry
 * 
 *     
 */

router.get('/orders', async (req,res)=>{
    var order=await Order.find();
    const response = [];
    for(let i in order){
        let p =order[i];
        var product = await axios.get("http://localhost:3000/product/"+ p.ProductId);
        order[i].product = product.data;
        response.push({...product.data});
    }
    res.json(reponse);
});

/**
 * @swagger
 * /orders:
 *  delete:
 *   summary: It will cancel the orders from order database.
 *   reponses:
 *   201:
 *     description: Cancels the orders
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          data:
 *            type: object
 *            properties:
 *              id: 
 *                type: integer
 *                description: The user id
 *                example: 0
 *              name:
 *                type: string
 *                description: The user name.
 *                example: marry
 * 
 *     
 */


router.delete('/orders/:id',(req,res)=>{
    Order.findOneAndDelete(req.params.id)
    .then(()=>{
        res.send('order cancelled');
    }).catch((err)=>{
          if(err){
              res.send('order cannot be cancelled');
          }
    });
    res.send('DELETE req');
});

/*
router.post('/product', async(req,res)=>{
    const product= new Product({
        productname:req.body.productname,
        productprice:req.body.productprice,
        productimg:req.body.productimg,
        catagory:req.body.catagory
    });
    try{
        const productSave= await product.save();
        return res.status(200),json(productSave);
    }catch(error){
        console.log('product cannot add to cart');
    }
}); 

router.get('product', async(req,res)=>{
    try{
        const product= await Cart.find();
        return res.status(200).json(product);
    } catch(error){
        console.log('cannot fetech the products')
    }
});


router.delete('product', async(req,res)=>{
    try{
        const product= await Cart.findOneAndDelete({product:req.params.product});
        return res.status(200).json(product,{message:'product deleted from the cart'});
    } catch(error){
        console.log('cannot remove the product');
    }
});
*/
module.exports=router;