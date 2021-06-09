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


router.post('/order',async (req,res)=>{
    console.log('post req'); 
    console.log(req.body);
    var product=new Order(req.body);
    try{
       await product.save();
        res.send("Order placed");
    } catch(err){
        res.send('order cannot be placed');
    }

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
    console.log('get req');
    try{
       const products= await Order.find();
       res.send(products);
       console.log(products);
    } catch(err){
        res.send('oops..cannot get orders');
    }
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


router.delete('/orders/:id',async (req,res)=>{
    try{
        await  Order.findOneAndDelete(req.params.id);
         res.send('order cancelled');
      } catch(err){
            if(err){
                res.send('order cannot be cancelled');
            }
      }
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