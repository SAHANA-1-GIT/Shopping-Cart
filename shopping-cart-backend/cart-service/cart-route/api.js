const express = require('express');
const router=require('express').Router();
const Cart=require('../cart-model/model');
const axios= require('axios');    
const mongoose  = require('mongoose');
const { response } = require('express');



/**
 * @swagger
 * /product/:id:
 *  post:
 *   summary: It will add the product to cart database when user clicks on add to cart button.
 *   reponses:
 *   201:
 *     description: saves
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


router.post('/product/:id',(req,res)=>{
    var newCart={
        ProductId:mongoose.Types.ObjectId(req.body.ProductId)
    };
   var cart= new Cart(newCart);
   cart.save()
   .then(()=>{
       console.log('product added to cart');
   }).catch((err)=>{
        if(err){
            console.log('product cannot add to cart');
        }
   });
    res.send('POST req');
});


/**
 * @swagger
 * /cart:
 *  get:
 *    summary: Retrieves all the products which are in  cart database
 *    description: Retrieve a list of products
 *    responses:
 *      200:
 *        description: A list of products.
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id: 
 *                       type: integer
 *                       description: id od the product.
 *                     productname:
 *                        type: String
 *                        description: name of the product.
 *                     productimage:
 *                        type: String
 *                        description: url of the product image.
 *                     price:
 *                        type: integer
 *                        description: price of the product.
 *                     category:
 *                         type: String
 *                         description: category of the product.         
 */

router.get('/cart',async (req,res)=>{
    var cart=await Cart.find();
    const response = [];
    for(let i in cart){
        let p =cart[i];
        var product = await axios.get("http://localhost:3000/product/"+ p.ProductId);
        cart[i].product = product.data;
        response.push({...product.data});
    }
    res.send(response);
    res.json(response);
});

router.put('/',(req,res)=>{
    res.send('UPDATE req');
});

/**
 * @swagger
 * /cart/:id:
 *  delete:
 *    summary: Deletes the products from cart database 
 *    description: Deletes the products from cart DB
 *    responses:
 *      200:
 *        description: A list of products.
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id: 
 *                       type: integer
 *                       description: id od the product.
 *                     productname:
 *                        type: String
 *                        description: name of the product.
 *                     productimage:
 *                        type: String
 *                        description: url of the product image.
 *                     price:
 *                        type: integer
 *                        description: price of the product.
 *                     category:
 *                         type: String
 *                         description: category of the product.         
 */

router.delete('/cart/:id',(req,res)=>{
    Cart.findOneAndDelete(req.params.id)
    .then(()=>{
        res.send('product removed from cart');
    }).catch((err)=>{
          if(err){
              res.send('product cannot remove from cart');
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