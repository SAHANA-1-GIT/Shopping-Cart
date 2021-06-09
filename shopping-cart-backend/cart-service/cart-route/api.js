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


router.post('/product',async (req,res)=>{
    console.log('post req'); 
    console.log(req.body);
    var product=new Cart(req.body);
    try{
       await product.save();
        res.send("product added to cart");
    } catch(err){
        res.send('product cannot be added to cart');
    }
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
    console.log('get req');
    try{
       const products= await Cart.find();
       res.send(products);
       console.log(products);
    } catch(err){
        res.send('oops..cannot get products');
    }
   
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

router.delete('/cart/:id',async (req,res)=>{
    try{
      await  Cart.findOneAndDelete(req.params.id);
       res.send('product deleted from cart');
    } catch(err){
          if(err){
              res.send('product cannot remove from cart');
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