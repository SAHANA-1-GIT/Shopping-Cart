const router=require('express').Router();
const jwt=require('jsonwebtoken');
const Product=require('../product-model/model');




/**
 * @swagger
 * /products:
 *  post:
 *    summary: saves  all the products to database
 *    description: it will add the products to database
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
router.post('/products',async (req,res)=>{
    console.log('post req'); 
    console.log(req.body);
    var product=new Product(req.body);
    try{
        product.save();
        console.log("product added");
        res.send("added");
    } catch(err){
        res.send('product cannot be added');
    }
    
});

/**
 * @swagger
 * /products:
 *  get:
 *    summary: Retrieves all the products from database
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

router.get('/products',async (req,res)=>{
    console.log('get req');
    try{
       const products= await Product.find();
       res.send(products);
       console.log(products);
    } catch(err){
        res.send('oops..cannot get products');
    }
    
});

/**
 * @swagger
 * /products:
 *  delete:
 *    summary: Deletes the products from database  
 *    description: Deletes the products from DB
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


router.delete('/product/:id',async (req,res)=>{
    console.log('delete req');
    try{
        Product.findOneAndRemove(req.params.id);
        console.log('product removed')
        res.send('product removed')
    } catch(err){
        res.send('product cannot be deleted');
    }
    res.send('DELETE REQ');
});

/**
 * @swagger
 * /products:
 *  put:
 *    summary: Updates products in database
 *    description: Updates the product with given parameter
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

router.put('/product/:price',(req,res)=>{
    console.log('update req');
    res.send('UPDATE REQ');
});









/*
router.post('/product', (req,res)=>{

    try{
         const products= await Product.find({catagory:req.params.catagory});
         return res.status(200).json(products);
    } catch(error){
           console.log('oops..cannot get products');
    }
    
   res.send('product added');
});


router.post('/product', async(req,res)=>{
    try{
        const products =await Product.insertOne({productname:pname,productimg:img,productprice:price,catagory:catagory});
        return res.status(200).json(products);
    } catch(error) {
       console.log('oops...cannot add the product');
    }
});


router.delete('/productname', async(req,res)=>{
    try{
        const product =await Product.findAndRemove({productname:req.params.productname});
        return res.status(200).json(product,{message:'product deleted'});
    } catch(error) {
       console.log('oops...cannot delete the product');
    }
});
*/
module.exports=router;